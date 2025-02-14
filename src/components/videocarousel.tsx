// components/VideoCarousel.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

export function VideoCarousel() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        <CarouselItem>
          <div className="flex justify-center items-center h-64 bg-zinc-800 rounded-lg">
            <video
              src="/videos/promo1.mp4"
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex justify-center items-center h-64 bg-zinc-800 rounded-lg">
            <video
              src="/videos/promo2.mp4"
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex justify-center items-center h-64 bg-zinc-800 rounded-lg">
            <video
              src="/videos/promo3.mp4"
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
