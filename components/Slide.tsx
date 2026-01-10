'use client';

import { SlideData } from '@/types/slide';
import TitleSlide from './slides/TitleSlide';
import ContentSlide from './slides/ContentSlide';

interface SlideProps {
  slide: SlideData;
}

export default function Slide({ slide }: SlideProps) {
  if (slide.type === 'title') {
    return <TitleSlide slide={slide} />;
  }

  return <ContentSlide slide={slide} />;
}
