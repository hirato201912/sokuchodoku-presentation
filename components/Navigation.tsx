'use client';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  showNotes: boolean;
  onToggleNotes: () => void;
}

export default function Navigation({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoTo,
  showNotes,
  onToggleNotes,
}: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-3 md:p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 md:gap-3">
        {/* 前へボタン */}
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <span className="hidden md:inline">← 前へ</span>
          <span className="md:hidden">←</span>
        </button>

        {/* スライド番号と進捗バー */}
        <div className="flex-1 mx-2 md:mx-4">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-1 md:mb-2">
            <span className="text-xs md:text-sm font-medium whitespace-nowrap">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={onToggleNotes}
              className="px-2 md:px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors whitespace-nowrap"
            >
              {showNotes ? 'ノート非表示' : 'ノート表示'}
            </button>
          </div>

          {/* 進捗バー */}
          <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>

          {/* スライドサムネイル */}
          <div className="flex gap-1 mt-1 md:mt-2 justify-center overflow-x-auto max-w-lg mx-auto">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-blue-600 w-6 md:w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`スライド ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 次へボタン */}
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <span className="hidden md:inline">次へ →</span>
          <span className="md:hidden">→</span>
        </button>
      </div>
    </div>
  );
}
