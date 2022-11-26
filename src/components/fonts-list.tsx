import { useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';

import { useSearchParams } from '../search-params';
import { Font } from '../types';

import { FontPreview } from './font-preview';
import { defaultFontSize } from './global-controls';

type FontsListProps = {
  fonts: Font[];
  width: number;
  height: number;
};

export const FontsList = ({ fonts, width, height }: FontsListProps) => {
  const searchParams = useSearchParams();

  const filter = useFilterFont(searchParams);
  const filteredList = fonts.filter(filter);
  const fontSize = Number(searchParams.get('size') ?? defaultFontSize);

  return (
    <FixedSizeList
      width={width}
      height={height}
      itemCount={filteredList.length}
      itemSize={40 + 1.5 * fontSize}
      itemData={filteredList}
    >
      {Row}
    </FixedSizeList>
  );
};

type RowProps = {
  index: number;
  data: Font[];
  style: React.CSSProperties;
};

const Row = ({ index, data, style }: RowProps) => (
  <div style={style} className="border-b py-2">
    <FontPreview font={data[index]} />
  </div>
);

export const useFilterFont = (searchParams: URLSearchParams) => {
  const search = searchParams.get('search');
  const variable = searchParams.get('variable') === 'true';
  const categories = searchParams.getAll('categories');
  const types = searchParams.getAll('types');

  const re = useMemo(() => (search ? new RegExp(search, 'i') : null), [search]);
  const matchSearch = useCallback(
    (font: Font) => {
      return !re || font.fontName.match(re);
    },
    [re]
  );

  const matchVariable = useCallback(
    (font: Font) => {
      return variable === false || font.variable !== false;
    },
    [variable]
  );

  const matchCategory = useCallback(
    (font: Font) => {
      return categories.length === 0 || categories.includes(font.category);
    },
    [categories]
  );

  const matchType = useCallback(
    (font: Font) => {
      return types.length === 0 || types.includes(font.type);
    },
    [types]
  );

  return useCallback(
    (font: Font) => {
      return [matchSearch(font), matchVariable(font), matchCategory(font), matchType(font)].every(Boolean);
    },
    [matchCategory, matchVariable, matchType, matchSearch]
  );
};
