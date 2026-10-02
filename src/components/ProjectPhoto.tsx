import { projectPhotos } from "@/data/projectPhotos";

type PhotoId = (typeof projectPhotos)[number]["id"];

export default function ProjectPhoto({ id, className = "", priority = false, sizes = "(min-width: 1024px) 50vw, 100vw", decorative = false }: {
  id: PhotoId;
  className?: string;
  priority?: boolean;
  sizes?: string;
  decorative?: boolean;
}) {
  const photo = projectPhotos.find((item) => item.id === id)!;
  return <img
    src={`/images/projects/${id}.webp`}
    srcSet={`/images/projects/${id}-480.webp 480w, /images/projects/${id}.webp ${photo.width}w`}
    sizes={sizes}
    alt={decorative ? "" : photo.alt}
    aria-hidden={decorative || undefined}
    width={photo.width}
    height={photo.height}
    loading={priority ? "eager" : "lazy"}
    {...(priority ? { fetchpriority: "high" } : {})}
    decoding="async"
    className={className}
  />;
}
