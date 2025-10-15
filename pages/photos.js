import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import NextImage from 'next/image';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import StructuredData from '@/components/StructuredData';
import PhotoMetadata from '@/components/PhotoMetadata';
import { getAllPhotos } from '@/lib/strapi';

export default function Photos({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [progressiveImages, setProgressiveImages] = useState(new Set());

  // Helper function to get optimal image URL based on screen size
  const getOptimalImageUrl = useCallback((photo, isHighRes = false) => {
    if (!photo?.image?.formats) return photo.image.url;
    
    // For high resolution (lightbox), prefer large format
    if (isHighRes) {
      return photo.image.formats.large?.url || 
             photo.image.formats.medium?.url || 
             photo.image.url;
    }
    
    // For gallery view, prioritize small format for faster loading with Cloudflare CDN
    return photo.image.formats.small?.url || 
           photo.image.formats.medium?.url || 
           photo.image.url;
  }, []);

  const openAt = useCallback((index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  // Preload all images immediately for gallery view
  useEffect(() => {
    const preloadAllImages = () => {
      photos.forEach((photo, index) => {
        if (!loadedImages.has(index)) {
          // Use Next.js Image preload for better optimization
          const img = typeof window !== 'undefined' ? new window.Image() : null;
          if (!img) return;
          
          // Use optimal format for preloading (small for faster loading)
          const preloadUrl = getOptimalImageUrl(photo, false);
          
          img.src = preloadUrl;
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
          };
        }
      });
    };

    if (photos.length > 0) {
      preloadAllImages();
    }
  }, [photos, loadedImages]);

  // No lazy loading - all images load immediately

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close, showPrev, showNext, currentIndex, photos]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevPosition = document.body.style.position;
      const prevWidth = document.body.style.width;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.position = prevPosition;
        document.body.style.width = prevWidth;
      };
    }
  }, [isOpen]);

  const seoImages = useMemo(() => {
    if (!photos || photos.length === 0) return undefined;
    return photos.slice(0, 3).map((p) => ({ url: p.image.url }));
  }, [photos]);

  const gallerySchema = useMemo(() => {
    if (!photos || photos.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Photos – mhrsntrk',
      url: 'https://mhrsntrk.com/photos',
      hasPart: photos.slice(0, 12).map((p) => ({
        '@type': 'ImageObject',
        contentUrl: p?.image?.url,
        name: p?.title || 'Photo'
      }))
    };
  }, [photos]);

  const preconnectOrigin = useMemo(() => {
    try {
      const firstUrl = photos?.[0]?.image?.url;
      if (!firstUrl) return null;
      const u = new URL(firstUrl);
      return `${u.protocol}//${u.host}`;
    } catch {
      return null;
    }
  }, [photos]);

  return (
    <>
      <NextSeo
        title="Photos – mhrsntrk"
        description="A full-width photo gallery with a masonry layout."
        canonical="https://mhrsntrk.com/photos"
        openGraph={{
          url: 'https://mhrsntrk.com/photos',
          title: 'Photos – mhrsntrk',
          type: 'website',
          images: seoImages
        }}
        additionalMetaTags={[
          { name: 'robots', content: 'index,follow,max-image-preview:large' }
        ]}
      />
      {gallerySchema && <StructuredData data={gallerySchema} />}
      {preconnectOrigin && (
        <Head>
          <link rel="preconnect" href={preconnectOrigin} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={preconnectOrigin} />
        </Head>
      )}

      <Container>
        <div className="w-full px-2 md:px-4 lg:px-6">
          <h1 className="sr-only">Photos</h1>
          <div className="w-full mx-auto max-w-none">
            <div className="masonry">{/* masonry container */}
              {photos.map((photo, index) => (
                <button
                  key={`${photo.image.url}-${index}`}
                  type="button"
                  className="w-full overflow-hidden border border-gray-200 rounded masonry-item cursor-zoom-in dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => openAt(index)}
                  aria-label={`Open ${photo.title || 'photo'} in lightbox`}
                  data-index={index}
                >
                  <div className="relative w-full h-auto">
                  {loadedImages.has(index) ? (
                      <NextImage
                        src={getOptimalImageUrl(photo, false)}
                        alt={photo.title || 'Photo'}
                        width={photo.image.width || 1200}
                        height={photo.image.height || 800}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                        className="object-cover w-full h-auto transition-opacity duration-300"
                        loading="eager"
                        priority={index < 6}
                        quality={85} // Optimized quality for Cloudflare CDN
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    ) : (
                      <div className="relative w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-sm text-gray-400 dark:text-gray-500">Loading...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {isOpen && photos[currentIndex] && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 lightbox-backdrop md:pt-24 md:pb-6 lg:pt-28"
          aria-modal="true"
          role="dialog"
        >
          {/* Keep gallery visible in the background via backdrop; allow outside clicks to pass through */}
          <div className="relative z-50 flex flex-col items-center w-full mx-auto pointer-events-none max-w-none">
            <div className={`relative pointer-events-auto lightbox-container ${((photos[currentIndex]?.image?.height || 0) > (photos[currentIndex]?.image?.width || 0)) ? 'portrait' : 'landscape'}`}>
              <NextImage
                src={getOptimalImageUrl(photos[currentIndex], true)}
                alt={photos[currentIndex].title || 'Photo'}
                width={photos[currentIndex].image.width || 1920}
                height={photos[currentIndex].image.height || 1080}
                sizes="100vw"
                className="object-contain pointer-events-auto lightbox-image no-save"
                onTouchStart={(e) => e.stopPropagation()}
                priority
                quality={95} // Higher quality for lightbox with Cloudflare CDN
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            <PhotoMetadata 
              metadata={photos[currentIndex].metadata} 
              photoTitle={photos[currentIndex].title} 
              isFixed
            />

            {/* Controls: fixed at bottom on all screens */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center text-black pointer-events-auto dark:text-white lightbox-controls" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
              {photos[currentIndex].title && (
                <div className="max-w-3xl mb-4 text-sm text-center opacity-90">{photos[currentIndex].title}</div>
              )}
              <div className="flex items-center gap-3 px-4 pb-8">
                <button data-lightbox-control="true"
                  type="button"
                  onClick={showPrev}
                  className="px-4 py-2 text-sm border rounded bg-white/10 hover:bg-white/20 border-white/30"
                  aria-label="Previous photo"
                >
                  Prev
                </button>
                <button data-lightbox-control="true"
                  type="button"
                  onClick={close}
                  className="flex items-center justify-center p-2 mx-10 text-sm border rounded bg-white/10 hover:bg-white/20 border-white/30"
                  aria-label="Close lightbox"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <button data-lightbox-control="true"
                  type="button"
                  onClick={showNext}
                  className="px-4 py-2 text-sm border rounded bg-white/10 hover:bg-white/20 border-white/30"
                  aria-label="Next photo"
                >
                  Next
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  try {
    const allPhotos = await getAllPhotos();
    return {
      props: { photos: allPhotos || [] }
    };
  } catch (error) {
    console.warn('Failed to fetch photos:', error.message);
    return {
      props: { photos: [] }
    };
  }
}


