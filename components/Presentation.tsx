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

      {/* ヘルプオーバーレイ（初回のみ表示） */}
      {currentSlide === 0 && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-lg text-xs max-w-[200px] md:max-w-none">
          <h4 className="font-bold mb-1.5 md:mb-2 text-xs md:text-sm">キーボード操作</h4>
          <ul className="space-y-0.5 md:space-y-1 text-[10px] md:text-xs">
            <li>→ / Space: 次のスライド</li>
            <li>←: 前のスライド</li>
            <li>N: ノート表示切替</li>
            <li>Home: 最初のスライド</li>
            <li>End: 最後のスライド</li>
          </ul>
        </div>
      )}
    </div>
  );
}
