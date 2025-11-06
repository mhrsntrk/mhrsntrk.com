/**
 * Secure Strapi Client - Production Ready
 * 
 * Security Features:
 * - Input validation and sanitization
 * - Rate limiting protection
 * - Request timeout handling
 * - Error boundary protection
 * - Secure headers
 * 
 * Performance Features:
 * - Request deduplication
 * - Intelligent caching
 * - Connection pooling
 * - Optimized queries
 */

const STRAPI_BASE_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Configuration constants
const CONFIG = {
  REQUEST_TIMEOUT: 10000, // 10 seconds for runtime
  BUILD_REQUEST_TIMEOUT: 30000, // 30 seconds for build time (Strapi wake-up)
  MAX_RETRIES: 3, // Runtime retries
  BUILD_MAX_RETRIES: 10, // Build time retries (wait for Strapi to wake up)
  RETRY_DELAY: 1000, // 1 second base delay
  BUILD_RETRY_DELAY: 2000, // 2 seconds base delay for build
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  MAX_PAGE_SIZE: 100,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 100,
  WAKE_UP_MAX_ATTEMPTS: 15, // Max attempts to wake up Strapi
  WAKE_UP_INITIAL_DELAY: 2000, // Initial delay before first wake-up attempt
};

// In-memory cache for request deduplication and caching
const cache = new Map();
const requestQueue = new Map();

// Rate limiting
const rateLimitTracker = new Map();

/**
 * Validates and sanitizes input parameters
 */
function validateInput(input, type = 'string') {
  if (input === null || input === undefined) return null;
  
  switch (type) {
    case 'string':
      return typeof input === 'string' ? input.trim() : String(input).trim();
    case 'number':
      const num = Number(input);
      return isNaN(num) ? null : Math.max(0, Math.min(num, CONFIG.MAX_PAGE_SIZE));
    case 'slug':
      return typeof input === 'string' ? 
        input.replace(/[^a-zA-Z0-9\-_]/g, '').slice(0, 100) : null;
    default:
      return input;
  }
}

/**
 * Creates secure headers with proper content type and security measures
 */
function getSecureHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'mhrsntrk.com/1.0',
    'X-Requested-With': 'XMLHttpRequest',
  };

  // Add authentication if token is available
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
}

/**
 * Rate limiting implementation
 */
function checkRateLimit(identifier) {
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW;
  
  if (!rateLimitTracker.has(identifier)) {
    rateLimitTracker.set(identifier, []);
  }
  
  const requests = rateLimitTracker.get(identifier);
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= CONFIG.RATE_LIMIT_MAX_REQUESTS) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  recentRequests.push(now);
  rateLimitTracker.set(identifier, recentRequests);
}

/**
 * Request deduplication to prevent duplicate requests
 */
async function deduplicateRequest(key, requestFn) {
  if (requestQueue.has(key)) {
    return requestQueue.get(key);
  }
  
  const promise = requestFn();
  requestQueue.set(key, promise);
  
  try {
    const result = await promise;
    return result;
  } finally {
    requestQueue.delete(key);
  }
}

/**
 * Wake up Strapi by making a health check request
 * Uses exponential backoff to wait for the service to wake up
 * @param {boolean} isBuildTime - Whether this is a build-time request
 * @returns {Promise<boolean>} - Returns true if Strapi is awake
 */
export async function wakeUpStrapi(isBuildTime = false) {
  if (!STRAPI_BASE_URL) {
    throw new Error('STRAPI_BASE_URL is not configured');
  }

  const maxAttempts = isBuildTime ? CONFIG.WAKE_UP_MAX_ATTEMPTS : 3;
  const initialDelay = isBuildTime ? CONFIG.WAKE_UP_INITIAL_DELAY : 1000;
  const timeout = isBuildTime ? CONFIG.BUILD_REQUEST_TIMEOUT : CONFIG.REQUEST_TIMEOUT;

  console.log(`[wakeUpStrapi] Attempting to wake up Strapi (build time: ${isBuildTime})`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(`${STRAPI_BASE_URL}/api/posts?pagination[pageSize]=1`, {
          signal: controller.signal,
          headers: getSecureHeaders(),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          console.log(`[wakeUpStrapi] Strapi is awake after ${attempt} attempt(s)`);
          return true;
        }

        // If we get a non-200 but successful connection, Strapi is awake
        if (response.status < 500) {
          console.log(`[wakeUpStrapi] Strapi is responding (status: ${response.status})`);
          return true;
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // If it's the last attempt, throw the error
        if (attempt === maxAttempts) {
          throw fetchError;
        }

        // Calculate exponential backoff delay
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.log(`[wakeUpStrapi] Attempt ${attempt}/${maxAttempts} failed, waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      if (attempt === maxAttempts) {
        console.error(`[wakeUpStrapi] Failed to wake up Strapi after ${maxAttempts} attempts:`, error.message);
        throw new Error(`Strapi wake-up failed after ${maxAttempts} attempts: ${error.message}`);
      }
      
      // Exponential backoff for next attempt
      const delay = initialDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return false;
}

/**
 * Secure fetch with timeout, retries, and error handling
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @param {number} retryCount - Current retry count
 * @param {boolean} isBuildTime - Whether this is a build-time request (needs wake-up)
 */
async function secureFetch(url, options = {}, retryCount = 0, isBuildTime = false) {
  // Rate limiting check
  checkRateLimit('global');
  
  // Input validation
  if (!STRAPI_BASE_URL) {
    throw new Error('STRAPI_BASE_URL is not configured');
  }
  
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided');
  }
  
  // Use longer timeout for build time
  const timeout = isBuildTime ? CONFIG.BUILD_REQUEST_TIMEOUT : CONFIG.REQUEST_TIMEOUT;
  const maxRetries = isBuildTime ? CONFIG.BUILD_MAX_RETRIES : CONFIG.MAX_RETRIES;
  const retryDelay = isBuildTime ? CONFIG.BUILD_RETRY_DELAY : CONFIG.RETRY_DELAY;
  
  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...getSecureHeaders(),
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Authentication failed. Invalid API token.');
      }
      if (response.status === 403) {
        throw new Error('Access forbidden. Check API permissions.');
      }
      if (response.status === 404) {
        throw new Error('Resource not found.');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded by server.');
      }
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    // For build time, try to wake up Strapi on first failure
    if (isBuildTime && retryCount === 0 && 
        (error.name === 'AbortError' || error.message.includes('fetch') || error.message.includes('network'))) {
      console.log(`[secureFetch] First failure detected during build, attempting to wake up Strapi...`);
      try {
        await wakeUpStrapi(true);
        // Retry the original request after wake-up
        return secureFetch(url, options, retryCount + 1, isBuildTime);
      } catch (wakeError) {
        // If wake-up fails, continue with normal retry logic
        console.error(`[secureFetch] Wake-up failed, continuing with retry logic:`, wakeError.message);
      }
    }
    
    // Retry logic with exponential backoff
    if (retryCount < maxRetries && 
        (error.name === 'AbortError' || error.message.includes('fetch') || error.message.includes('network'))) {
      const delay = retryDelay * Math.pow(2, retryCount); // Exponential backoff
      console.log(`[secureFetch] Retry ${retryCount + 1}/${maxRetries} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return secureFetch(url, options, retryCount + 1, isBuildTime);
    }
    
    throw error;
  }
}

/**
 * Cached fetch with intelligent cache management
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @param {boolean} isBuildTime - Whether this is a build-time request
 */
async function cachedFetch(url, options = {}, isBuildTime = false) {
  const cacheKey = `${url}:${JSON.stringify(options)}:${isBuildTime}`;
  const now = Date.now();
  
  // During build time, don't use cache (we want fresh data)
  // Cache is only useful for runtime requests
  if (!isBuildTime && cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (now - timestamp < CONFIG.CACHE_TTL) {
      return data;
    }
    cache.delete(cacheKey);
  }
  
  // Make request with deduplication
  const data = await deduplicateRequest(cacheKey, async () => {
    const response = await secureFetch(url, options, 0, isBuildTime);
    return response.json();
  });
  
  // Only cache runtime requests
  if (!isBuildTime) {
    cache.set(cacheKey, { data, timestamp: now });
  }
  
  return data;
}

/**
 * Builds secure query parameters with validation
 */
function buildQueryParams(params = {}) {
  const query = new URLSearchParams();
  
  // Pagination
  if (params.pageSize) {
    const pageSize = validateInput(params.pageSize, 'number');
    if (pageSize) query.set('pagination[pageSize]', pageSize);
  }
  
  // Sorting
  if (params.sort) {
    const sortFields = Array.isArray(params.sort) ? params.sort : [params.sort];
    sortFields.forEach((field, index) => {
      if (typeof field === 'string' && field.trim()) {
        query.set(`sort[${index}]`, field.trim());
      }
    });
  }
  
  // Filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const sanitizedKey = validateInput(key, 'string');
        const sanitizedValue = validateInput(value, 'string');
        if (sanitizedKey && sanitizedValue) {
          query.set(`filters[${sanitizedKey}][$eq]`, sanitizedValue);
        }
      }
    });
  }
  
  // Populate
  if (params.populate) {
    const populateFields = Array.isArray(params.populate) ? params.populate : [params.populate];
    populateFields.forEach(field => {
      if (typeof field === 'string' && field.trim()) {
        query.set('populate', field.trim());
      }
    });
  }
  
  return query.toString();
}

/**
 * Secure API request wrapper
 * @param {string} endpoint - The API endpoint
 * @param {object} params - Query parameters
 * @param {boolean} isBuildTime - Whether this is a build-time request
 */
async function secureApiRequest(endpoint, params = {}, isBuildTime = false) {
  const queryString = buildQueryParams(params);
  const url = `${STRAPI_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    return await cachedFetch(url, {}, isBuildTime);
  } catch (error) {
    console.error(`Strapi API Error (${endpoint}):`, error.message);
    throw error;
  }
}

/**
 * Data mapping functions with validation
 */
function mapPostsFromResponse(json) {
  if (!json || !Array.isArray(json.data)) return [];
  
  return json.data
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      
      return {
        title: validateInput(item.Title, 'string') || '',
        slug: validateInput(item.Slug, 'slug'),
        excerpt: validateInput(item.Excerpt, 'string') || '',
        date: item.Date || item.publishedAt || null,
        content: validateInput(item.Content, 'string') || '',
        author: {
          name: 'mhrsntrk',
          avatar: {
            url: '/mhrsntrk-PP.jpg'
          }
        }
      };
    })
    .filter(post => post && post.slug); // Only return posts with valid slugs
}

function mapContentsFromResponse(json) {
  if (!json || !Array.isArray(json.data)) return [];
  
  return json.data.map((item) => ({
    page: validateInput(item?.Page, 'string'),
    content: validateInput(item?.Content, 'string') || ''
  }));
}

function mapPhotosFromResponse(json) {
  if (!json || !Array.isArray(json.data)) return [];
  
  return json.data
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      
      const photo = item?.Photo?.data?.attributes || item?.Photo;
      if (!photo) return null;
      
      // Get the original image URL
      const originalUrl = photo.url;
      if (!originalUrl || typeof originalUrl !== 'string') return null;
      
      // Construct absolute URL for local storage images
      const absoluteImageUrl = originalUrl.startsWith('http') 
        ? originalUrl 
        : `${STRAPI_BASE_URL}${originalUrl}`;
      
      // Extract multiple image formats if available
      const formats = photo.formats || {};
      const imageFormats = {};
      
      // Map each format to absolute URLs
      Object.keys(formats).forEach(format => {
        const formatData = formats[format];
        if (formatData && formatData.url) {
          imageFormats[format] = {
            url: formatData.url.startsWith('http') 
              ? formatData.url 
              : `${STRAPI_BASE_URL}${formatData.url}`,
            width: formatData.width,
            height: formatData.height,
            size: formatData.sizeInBytes
          };
        }
      });
      
      return {
        title: validateInput(item.Title, 'string'),
        slug: validateInput(item.Slug, 'string'),
        metadata: validateInput(item.Metadata, 'string') || '',
        image: { 
          url: absoluteImageUrl,
          width: photo.width,
          height: photo.height,
          formats: imageFormats
        }
      };
    })
    .filter(Boolean);
}

// Public API functions
export async function getAllPostsWithSlug(isBuildTime = false) {
  try {
    const json = await secureApiRequest('/api/posts', { pageSize: 1000 }, isBuildTime);
    return (json?.data || [])
      .map(item => validateInput(item?.Slug, 'slug'))
      .filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch post slugs:', error.message);
    return [];
  }
}

export async function getAllPostsForHome(isBuildTime = false) {
  try {
    const json = await secureApiRequest('/api/posts', {
      sort: ['Date:desc', 'publishedAt:desc'],
      pageSize: 5
    }, isBuildTime);
    return mapPostsFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch home posts:', error.message);
    return [];
  }
}

export async function getAllPostsForBlog(isBuildTime = false) {
  try {
    const json = await secureApiRequest('/api/posts', {
      sort: ['Date:desc'],
      pageSize: 50 // Restore original page size that was working
    }, isBuildTime);
    return mapPostsFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch blog posts:', error.message);
    return [];
  }
}

export async function getAllPhotos(isBuildTime = false) {
  try {
    const json = await secureApiRequest('/api/photos', {
      pageSize: 100
    }, isBuildTime);
    return mapPhotosFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch photos:', error.message);
    return [];
  }
}

export async function getAllGears(isBuildTime = false) {
  try {
    const json = await secureApiRequest('/api/contents', {
      sort: 'createdAt:asc',
      pageSize: 100
    }, isBuildTime);
    return mapContentsFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch gear content:', error.message);
    return [];
  }
}

export async function getPostAndMorePosts(slug, isBuildTime = false) {
  const sanitizedSlug = validateInput(slug, 'slug');
  if (!sanitizedSlug) {
    throw new Error('Invalid slug provided');
  }
  
  try {
    const [postJson, allPostsJson] = await Promise.all([
      secureApiRequest('/api/posts', {
        filters: { Slug: sanitizedSlug },
        pageSize: 1
      }, isBuildTime),
      secureApiRequest('/api/posts', {
        sort: ['Date:desc', 'publishedAt:desc'],
        pageSize: 100 // Get more posts to have better randomization
      }, isBuildTime)
    ]);
    
    const currentPost = mapPostsFromResponse(postJson)[0];
    const allPosts = mapPostsFromResponse(allPostsJson);
    
    // If post doesn't exist, throw a specific error
    if (!currentPost || !currentPost.slug) {
      throw new Error(`Post with slug "${sanitizedSlug}" not found`);
    }
    
    // Filter out the current post and get 2 random posts
    const otherPosts = allPosts.filter(post => post.slug !== sanitizedSlug);
    const shuffledPosts = otherPosts.sort(() => Math.random() - 0.5);
    const randomPosts = shuffledPosts.slice(0, 2);
    
    return {
      posts: [currentPost],
      morePosts: randomPosts
    };
  } catch (error) {
    // Re-throw the error so caller can distinguish between "not found" vs "API error"
    // This allows getStaticProps to handle 404s vs retries differently
    if (error.message?.includes('not found')) {
      throw error; // Re-throw so getStaticProps can return notFound: true
    }
    console.error(`[getPostAndMorePosts] Failed to fetch post "${sanitizedSlug}":`, error.message);
    throw error; // Re-throw other errors too
  }
}

// Cleanup function for cache management
export function clearCache() {
  cache.clear();
  requestQueue.clear();
}

// Health check function
export async function healthCheck() {
  try {
    const response = await secureFetch(`${STRAPI_BASE_URL}/api/posts?pagination[pageSize]=1`);
    return response.ok;
  } catch (error) {
    return false;
  }
}
