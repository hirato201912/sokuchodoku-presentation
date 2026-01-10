'use client';

import React from 'react';
import { SlideData, SlideContent } from '@/types/slide';
import { parseMarkdown } from '@/utils/markdown';

interface ContentSlideProps {
  slide: SlideData;
}

export default function ContentSlide({ slide }: ContentSlideProps) {
  const renderContent = (content: SlideContent, index: number) => {
    const baseClass = 'animate-fade-in';
    const delay = `animation-delay-${index * 100}`;

    switch (content.type) {
      case 'heading':
        const HeadingTag = `h${content.level || 2}` as React.ElementType;
        const headingSize = content.level === 2 ? 'text-base md:text-lg lg:text-xl' : 'text-sm md:text-base lg:text-lg';
        return (
          <HeadingTag
            key={index}
            className={`${headingSize} font-bold mb-0.5 md:mb-1 text-blue-700 flex-shrink-0 ${baseClass} ${delay}`}
          >
            {parseMarkdown(content.text || '')}
          </HeadingTag>
        );

      case 'text':
        return (
          <p
            key={index}
            className={`text-[10px] md:text-xs lg:text-sm text-gray-800 leading-tight flex-shrink-0 w-full text-center ${baseClass} ${delay}`}
          >
            {parseMarkdown(content.text || '')}
          </p>
        );

      case 'list':
        return (
          <ul key={index} className={`space-y-1 md:space-y-1.5 flex-shrink-0 ${baseClass} ${delay}`}>
            {content.items?.map((item, i) => (
              <li
                key={i}
                className={`flex items-start gap-1.5 md:gap-2 text-xs md:text-sm ${
                  content.highlight
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 p-1.5 md:p-2 rounded-lg shadow-sm border-l-3 border-yellow-400'
                    : 'pl-1'
                }`}
              >
                <span className="text-blue-600 font-bold text-sm md:text-base mt-0.5">●</span>
                <span className="text-gray-800 flex-1 leading-tight">
                  {parseMarkdown(item)}
                </span>
              </li>
            ))}
          </ul>
        );

      case 'quote':
        return (
          <blockquote
            key={index}
            className={`border-l-3 border-blue-600 pl-2 md:pl-3 py-1 md:py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-r-lg shadow-sm flex-shrink-0 w-full ${baseClass} ${delay}`}
          >
            <p className="text-xs md:text-sm lg:text-base font-bold text-blue-900 leading-tight whitespace-pre-line">
              {parseMarkdown(content.text || '')}
            </p>
          </blockquote>
        );

      case 'image':
        return (
          <div key={index} className={`flex-1 flex items-center justify-center w-full ${baseClass} ${delay} min-h-0`}>
            {content.src ? (
              <img
                src={content.src}
                alt={content.imageAlt || '説明画像'}
                className="w-full h-full object-contain"
                style={{ maxHeight: 'calc(100vh - 300px)' }}
              />
            ) : (
              <div className="bg-gray-200 rounded-lg p-6 md:p-8 max-w-xl md:max-w-2xl w-full">
                <div className="text-center text-gray-500">
                  <svg
                    className="mx-auto h-24 w-24 md:h-32 md:w-32 mb-3 md:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm md:text-base">{content.imageAlt || '[画像]'}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'comparison':
        return (
          <div key={index} className={`grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2 flex-shrink-0 ${baseClass} ${delay}`}>
            <div className="bg-gradient-to-br from-gray-50 to-white p-2 md:p-3 rounded-md shadow-lg border border-gray-300">
              {content.left?.map((item, i) => renderContent(item, i))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-2 md:p-3 rounded-md shadow-lg border border-blue-400">
              {content.right?.map((item, i) => renderContent(item, i))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2 md:p-3 pb-40 md:pb-44 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl w-full h-full flex flex-col bg-white rounded-lg md:rounded-xl shadow-2xl p-2 md:p-3 overflow-hidden">
        <h1 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 border-b-2 md:border-b-3 border-blue-600 pb-1 flex-shrink-0">
          {slide.title}
        </h1>
        <div className="flex-1 flex flex-col items-center justify-center gap-1 md:gap-1.5 overflow-hidden min-h-0">
          {slide.content?.map((content, index) => renderContent(content, index))}
        </div>
      </div>
    </div>
  );
}
