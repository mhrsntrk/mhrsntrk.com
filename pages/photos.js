import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import StructuredData from '@/components/StructuredData';
import { getAllPhotos } from '@/lib/strapi';

export default function Photos({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
                >
                  <Image
                    src={photo.image.url}
                    alt={photo.title || 'Photo'}
                    width={1200}
                    height={800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    className="object-cover w-full h-auto"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    priority={index < 3}
                  />
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
          onClick={(e) => {
            // Close on any click that's not the image or controls
            const target = e.target;
            const clickedInsideInteractive = target.closest && (
              target.closest('.lightbox-image') ||
              target.closest('[data-lightbox-control="true"]')
            );
            if (!clickedInsideInteractive) {
              close();
            }
          }}
          onTouchStart={(e) => {
            const target = e.target;
            const clickedInsideInteractive = target.closest && (
              target.closest('.lightbox-image') ||
              target.closest('[data-lightbox-control="true"]')
            );
            if (!clickedInsideInteractive) {
              close();
            }
          }}
        >
          {/* Keep gallery visible in the background via backdrop; allow outside clicks to pass through */}
          <div className="relative z-50 flex flex-col items-center w-full mx-auto pointer-events-none max-w-none">
            <div className="pointer-events-auto lightbox-container">
              <Image
                src={photos[currentIndex].image.url}
                alt={photos[currentIndex].title || 'Photo'}
                fill
                sizes="100vw"
                className="object-contain pointer-events-auto lightbox-image no-save"
                onTouchStart={(e) => e.stopPropagation()}
                priority
              />
            </div>

            <div className="flex flex-col items-center justify-center mt-4 text-black pointer-events-auto dark:text-white" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
              {photos[currentIndex].title && (
                <div className="max-w-3xl mb-2 text-sm text-center opacity-90">{photos[currentIndex].title}</div>
              )}
              {/* metadata removed */}
              <div className="flex items-center gap-3 px-4">
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


