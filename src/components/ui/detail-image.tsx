import { useEffect, useRef, useState } from 'react';
import { IMAGE_DIMENSIONS } from '@/constants/imageDimensions';

interface DetailImageProps {
  src: string;
  alt: string;
}

/**
 * Drawer detail image: reserves layout space from the generated dimension
 * manifest (no jump when the file arrives) and fades in on load.
 */
export function DetailImage({ src, alt }: DetailImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const dims = IMAGE_DIMENSIONS[src];

  // cached images can complete before onLoad is attached
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className="rounded-md overflow-hidden border border-border bg-muted/30"
      style={dims && !loaded ? { aspectRatio: `${dims.width} / ${dims.height}` } : undefined}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={dims?.width}
        height={dims?.height}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
