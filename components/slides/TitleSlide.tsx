'use client';

import { SlideData } from '@/types/slide';

interface TitleSlideProps {
  slide: SlideData;
}

export default function TitleSlide({ slide }: TitleSlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-10 lg:p-12 pb-40 md:pb-44">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 lg:mb-6 text-gray-900 animate-fade-in">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-2xl md:text-3xl lg:text-3xl text-gray-600 mb-6 md:mb-7 lg:mb-8 animate-fade-in animation-delay-200">
            {slide.subtitle}
          </p>
        )}
        {slide.author && (
          <p className="text-lg md:text-xl lg:text-xl text-gray-500 animate-fade-in animation-delay-400">
            {slide.author}
          </p>
        )}
      </div>
    </div>
  );
}
