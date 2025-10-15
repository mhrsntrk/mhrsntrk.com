// Image optimization utility for better performance
export function optimizeImageUrl(url, width = 800, quality = 85) {
  if (!url) return url;
  
  // If it's already a Next.js optimized image, return as is
  if (url.includes('_next/image')) return url;
  
  // For local Strapi images, we'll let Next.js handle optimization
  // This function can be extended for other image sources
  return url;
}

// Preload critical images
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Batch preload images
export async function preloadImages(urls, maxConcurrent = 3) {
  const results = [];
  
  for (let i = 0; i < urls.length; i += maxConcurrent) {
    const batch = urls.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(url => preloadImage(url).catch(() => null));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results.filter(Boolean);
}
