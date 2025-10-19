"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface MultimediaImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const MultimediaImage = memo(function MultimediaImage({ 
  src, 
  alt, 
  className = "", 
  priority = false 
}: MultimediaImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={`relative bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
          <div className="text-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-pulse" />
            <p className="text-xs text-muted-foreground">Cargando...</p>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
});
