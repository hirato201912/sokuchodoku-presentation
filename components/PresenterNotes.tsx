'use client';

interface PresenterNotesProps {
  notes: string[];
  currentSlide: number;
  totalSlides: number;
}

export default function PresenterNotes({
  notes,
  currentSlide,
  totalSlides,
}: PresenterNotesProps) {
  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-gray-900 text-white p-6 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">
          発表者ノート ({currentSlide}/{totalSlides})
        </h3>
        <div className="text-sm text-gray-400">
          このパネルは聴衆には見えません
        </div>
      </div>

      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">💡</span>
              <p className="text-sm leading-relaxed">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
