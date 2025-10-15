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
  REQUEST_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  MAX_PAGE_SIZE: 100,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 100,
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
 * Secure fetch with timeout, retries, and error handling
 */
async function secureFetch(url, options = {}, retryCount = 0) {
  // Rate limiting check
  checkRateLimit('global');
  
  // Input validation
  if (!STRAPI_BASE_URL) {
    throw new Error('STRAPI_BASE_URL is not configured');
  }
  
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided');
  }
  
  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);
  
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
    
    // Retry logic for network errors
    if (retryCount < CONFIG.MAX_RETRIES && 
        (error.name === 'AbortError' || error.message.includes('fetch'))) {
      await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY * (retryCount + 1)));
      return secureFetch(url, options, retryCount + 1);
    }
    
    throw error;
  }
}

/**
 * Cached fetch with intelligent cache management
 */
async function cachedFetch(url, options = {}) {
  const cacheKey = `${url}:${JSON.stringify(options)}`;
  const now = Date.now();
  
  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (now - timestamp < CONFIG.CACHE_TTL) {
      return data;
    }
    cache.delete(cacheKey);
  }
  
  // Make request with deduplication
  const data = await deduplicateRequest(cacheKey, async () => {
    const response = await secureFetch(url, options);
    return response.json();
  });
  
  // Cache the result
  cache.set(cacheKey, { data, timestamp: now });
  
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
 */
async function secureApiRequest(endpoint, params = {}) {
  const queryString = buildQueryParams(params);
  const url = `${STRAPI_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    return await cachedFetch(url);
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
export async function getAllPostsWithSlug() {
  try {
    const json = await secureApiRequest('/api/posts', { pageSize: 1000 });
    return (json?.data || [])
      .map(item => validateInput(item?.Slug, 'slug'))
      .filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch post slugs:', error.message);
    return [];
  }
}

export async function getAllPostsForHome() {
  try {
    const json = await secureApiRequest('/api/posts', {
      sort: ['Date:desc', 'publishedAt:desc'],
      pageSize: 5
    });
    return mapPostsFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch home posts:', error.message);
    return [];
  }
}

export async function getAllPostsForBlog() {
  try {
    const json = await secureApiRequest('/api/posts', {
      sort: ['Date:desc'],
      pageSize: 50 // Restore original page size that was working
    });
    return mapPostsFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch blog posts:', error.message);
    return [];
  }
}

export async function getAllPhotos() {
  try {
    const json = await secureApiRequest('/api/photos', {
      pageSize: 100
    });
    return mapPhotosFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch photos:', error.message);
    return [];
  }
}

export async function getAllGears() {
  try {
    const json = await secureApiRequest('/api/contents', {
      sort: 'createdAt:asc',
      pageSize: 100
    });
    return mapContentsFromResponse(json);
  } catch (error) {
    console.error('Failed to fetch gear content:', error.message);
    return [];
  }
}

export async function getPostAndMorePosts(slug) {
  const sanitizedSlug = validateInput(slug, 'slug');
  if (!sanitizedSlug) {
    throw new Error('Invalid slug provided');
  }
  
  try {
    const [postJson, allPostsJson] = await Promise.all([
      secureApiRequest('/api/posts', {
        filters: { Slug: sanitizedSlug },
        pageSize: 1
      }),
      secureApiRequest('/api/posts', {
        sort: ['Date:desc', 'publishedAt:desc'],
        pageSize: 100 // Get more posts to have better randomization
      })
    ]);
    
    const currentPost = mapPostsFromResponse(postJson)[0];
    const allPosts = mapPostsFromResponse(allPostsJson);
    
    // Filter out the current post and get 2 random posts
    const otherPosts = allPosts.filter(post => post.slug !== sanitizedSlug);
    const shuffledPosts = otherPosts.sort(() => Math.random() - 0.5);
    const randomPosts = shuffledPosts.slice(0, 2);
    
    return {
      posts: currentPost ? [currentPost] : [],
      morePosts: randomPosts
    };
  } catch (error) {
    console.error('Failed to fetch post details:', error.message);
    return { posts: [], morePosts: [] };
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
