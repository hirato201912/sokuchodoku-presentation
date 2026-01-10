export interface SlideData {
  type: 'title' | 'content';
  title: string;
  subtitle?: string;
  author?: string;
  content?: SlideContent[];
  notes: string[];
}

export interface SlideContent {
  type: 'text' | 'list' | 'heading' | 'quote' | 'image' | 'comparison';
  text?: string;
  items?: string[];
  level?: number;
  cite?: number[];
  citeStart?: boolean;
  src?: string;
  imageUrl?: string;
  imageAlt?: string;
  left?: SlideContent[];
  right?: SlideContent[];
  highlight?: boolean;
}
