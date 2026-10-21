import type { Photo } from '../photos'

type PictureProps = {
  photo: Photo
  /** How wide the image displays, e.g. "(min-width: 64rem) 40vw, 100vw". */
  sizes: string
  /** Above-the-fold images load immediately at high priority. */
  priority?: boolean
  className?: string
}

export default function Picture({ photo, sizes, priority = false, className = '' }: PictureProps) {
  const srcSet = (format: string) =>
    photo.widths.map((w) => `/images/${photo.name}-${w}.${format} ${w}w`).join(', ')
  const largest = photo.widths[photo.widths.length - 1]

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/images/${photo.name}-${largest}.webp`}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
