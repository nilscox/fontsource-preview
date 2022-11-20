export enum FontCategory {
  display = 'display',
  handwriting = 'handwriting',
  monospace = 'monospace',
  other = 'other',
  sansSerif = 'sans-serif',
  serif = 'serif',
}

export enum FontStyle {
  normal = 'normal',
  italic = 'italic',
}

export enum FontType {
  google = 'google',
  icons = 'icons',
  league = 'league',
  other = 'other',
}

export type Font = {
  fontId: string;
  fontName: string;
  weights: number[];
  styles: FontStyle[];
  variable: boolean;
  version: string;
  category: FontCategory;
  source: string;
  license: string;
  type: FontType;
};
