'use client'
import { useEffect, useState } from "react"
// import Button from "../button/button"
// import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { Iflashcard } from "@/interface/note";


export default function Slider({ images }: { images: Iflashcard[] }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragEndX, setDragEndX] = useState<number | null>(null);

    // Slider transition classes for three states
    const [states, setStates] = useState(images.length > 2 ? [
        "w-[4%] left-[94%] scale-[0.9] z-[1]",
        "w-[82%] left-[8%] scale-100 z-[2]",
        "w-[4%] left-[0%] scale-[0.9] z-[-1]",
    ] : [
      "w-[82%] left-[9%] scale-100 z-[2]",
      "w-[4%] left-[0%] scale-[0.9] z-[-1]",
    ])

    const prevSlide = (): void => {
        setStates(images.length > 2 ? [
            "w-[4%] left-[0%] scale-[0.9] z-[1]",
            "w-[82%] left-[8%] scale-100 z-[2]",
            "w-[4%] left-[94%] scale-[0.9] z-[-1]",
        ] : [
            "w-[82%] left-[9%] scale-100 z-[2]",
            "w-[4%] left-[0%] scale-[0.9] z-[-1]",
        ])
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1 + images.length) % images.length
        );
    };

    const nextSlide = (): void => {
        setStates(images.length > 2 ? [
            "w-[4%] left-[94%] scale-[0.9] z-[1] bg-left",
            "w-[82%] left-[8%] scale-100 z-[2]",
            "w-[4%] left-[0%] scale-[0.9] z-[-1] bg-left",
        ] : [
            "w-[82%] left-[9%] scale-100 z-[2]",
            "w-[4%] left-[0%] scale-[0.9] z-[-1]",
        ])
        
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if(images.length > 1) {
                nextSlide();
            }
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
        const clientX =
          e.type === "touchstart"
            ? (e as React.TouchEvent).touches[0].clientX
            : (e as React.MouseEvent).clientX;
        setDragStartX(clientX);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent): void => {
        if (!dragStartX) return;
        const clientX =
          e.type === "touchmove"
            ? (e as React.TouchEvent).touches[0].clientX
            : (e as React.MouseEvent).clientX;
        setDragEndX(clientX);
    };

    const handleDragEnd = (): void => {
        if (dragStartX !== null && dragEndX !== null) {
          const dragDistance = dragEndX - dragStartX;
          if (dragDistance > 50) {
              nextSlide();
          } else if (dragDistance < -50) {
              prevSlide();
          }
        }
        setDragStartX(null);
        setDragEndX(null);
    };

    // Dynamically render slides based on the number of images
    const getSlideIndex = (offset: number) => {
        const newIndex = (currentIndex + offset + images.length) % images.length;
        return newIndex;
    };

    return (
        <div className="relative flex items-center justify-center md:w-[98%] w-[100%] mx-auto overflow-hidden">
            <div
                className="flex gap-[3%] md:h-[140px] h-[140px]"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {
                images.length === 1 ?
                  <div
                      key={images[0]?.id}
                      className={`absolute top-0 md:h-[140px] h-[140px] ${states[0]} duration-700 rounded-[20px] bg-cover bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                      >
                        <div key={0} className={`absolute top-0 left-0 w-full flex flex-col gap-2 md:p-6 p-4 rounded-lg w-full bg-primary text-white cursor-pointer`}>
                                <div className="flex justify-between items-center w-full text-[10px] absolute top-4 left-6">
                                    <p>{1}/{images.length}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <p>{images[0]?.text}</p>
                                </div>
                            </div>
                    </div>
                  :
                images.map((_, offset) => {
                    const slideIndex = getSlideIndex(offset - 1);
                    return (
                        <div
                            key={images[slideIndex]?.id}
                            className={`absolute top-0 overflow-hidden md:h-[140px] h-[140px] ${states[offset]} duration-700 rounded-[20px] bg-cover bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                        >
                            <div key={_.id} className={`absolute top-0 left-0 min-w-[250px] w-full flex flex-col h-[140px] gap-2 md:p-6 p-4 rounded-lg w-full bg-primary text-white cursor-pointer`}>
                                <div className="flex justify-between items-center w-full text-[10px] absolute top-4 left-6">
                                    <p>{slideIndex + 1}/{images.length}</p>
                                </div>
                                <div className="flex-1 flex gap-2 items-center">
                                    <p>{images[slideIndex]?.text}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-0 flex items-center p-2 gap-1 bg-white/[0.9] dark:bg-black/[0.8] backdrop-blur-sm border border-gray-500/[0.05] rounded-full">
                {/* <Button
                    variant="tetiary"
                    onClick={prevSlide}
                    className="px-0 border-none text-dark/[0.4] dark:text-white/[0.7] bg-transparent hover:bg-transparent"
                >
                    <CaretLeft />
                </Button>
                <div className="flex justify-center">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 mx-1 ${
                                index === currentIndex
                                    ? "bg-primary rounded-[20px]"
                                    : "bg-gray-300 rounded-[20px]"
                            } transition-all duration-500 ease-in-out`}
                        />
                    ))}
                </div>
                <Button
                    variant="tetiary"
                    onClick={nextSlide}
                    className="px-0 border-none text-dark/[0.4] dark:text-white/[0.7] bg-transparent hover:bg-transparent"
                >
                    <CaretRight />
                </Button> */}
            </div>
        </div>
    );
}
