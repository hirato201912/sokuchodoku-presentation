'use client';

import { useState, useEffect } from 'react';
import Slide from './Slide';
import Navigation from './Navigation';
import PresenterNotes from './PresenterNotes';
import { slides } from '@/data/slides';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(!showNotes);
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, showNotes]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* メインスライド */}
      <div className={`${showNotes ? 'w-2/3' : 'w-full'} h-full transition-all duration-300`}>
        <Slide slide={slides[currentSlide]} />
      </div>

      {/* プレゼンターノート（オプション） */}
      {showNotes && (
        <PresenterNotes
          notes={slides[currentSlide].notes}
          currentSlide={currentSlide + 1}
          totalSlides={slides.length}
        />
      )}

      {/* ナビゲーション */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
        showNotes={showNotes}
        onToggleNotes={() => setShowNotes(!showNotes)}
      />
    </div>
  );
}
