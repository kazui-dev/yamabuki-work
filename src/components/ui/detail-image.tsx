import { IMAGE_DIMENSIONS } from '@/constants/imageDimensions';

interface DetailImageProps {
  src: string;
  alt: string;
}

/**
 * Drawer detail image: reserves layout space from the generated dimension
 * manifest so nothing jumps when the file arrives.
 */
export function DetailImage({ src, alt }: DetailImageProps) {
  const dims = IMAGE_DIMENSIONS[src];

  return (
    <div
      className="rounded-md overflow-hidden border border-border bg-muted/30"
      style={dims ? { aspectRatio: `${dims.width} / ${dims.height}` } : undefined}
    >
      <img
        src={src}
        alt={alt}
        width={dims?.width}
        height={dims?.height}
        decoding="async"
        className="w-full h-auto"
      />
    </div>
  );
}
