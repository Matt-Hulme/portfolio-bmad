import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectResponse } from '@/lib/api';

interface ImageCarouselProps {
  images: ProjectResponse['images'];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  if (!images || images.length === 0) return null;

  const isVideo = (url: string) => /\.(mp4|webm|mov)$/i.test(url);

  return (
    <div className="relative" data-testid="image-carousel">
      {/* Carousel viewport */}
      <div
        className="overflow-hidden rounded-lg border border-gray-800"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((image) => (
            <div
              key={image.id}
              className="embla__slide flex min-w-0 flex-[0_0_100%] items-center justify-center"
            >
              <div className="flex h-[600px] w-full items-center justify-center bg-black">
                {isVideo(image.url) ? (
                  <video
                    src={image.url}
                    controls
                    className="h-full w-full object-contain"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="hover:ring-primary/50 absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-gray-900/90 p-3 ring-1 ring-gray-700 backdrop-blur-sm transition-all hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-900/90 disabled:hover:ring-gray-700"
            aria-label="Previous image"
          >
            <ChevronLeft className="text-primary h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="hover:ring-primary/50 absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-gray-900/90 p-3 ring-1 ring-gray-700 backdrop-blur-sm transition-all hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-900/90 disabled:hover:ring-gray-700"
            aria-label="Next image"
          >
            <ChevronRight className="text-primary h-6 w-6" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
