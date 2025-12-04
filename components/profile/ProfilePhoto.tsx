import Image from "next/image";

interface ProfilePhotoProps {
  src: string | null;
}

export default function ProfilePhoto({ src }: ProfilePhotoProps) {
  if (!src) {
    return (
      <div className="h-64 w-64 rounded-full border-4 border-dashed border-primary/40 bg-muted flex items-center justify-center text-sm text-muted-foreground">
        Upload profile photo
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div className="relative h-64 w-64 rounded-full border-4 border-primary/60 p-1 shadow-2xl shadow-primary/20">
        <Image
          src={src}
          alt="Portrait of Mihael"
          fill
          className="rounded-full object-cover"
          sizes="256px"
          priority
        />
      </div>
    </div>
  );
}
