import { FixedSizeList } from 'react-window';

import { useFilterFont, useFontsContext } from '../fonts-context';
import { Font } from '../types';

import { FontPreview } from './font-preview';

type FontsListProps = {
  fonts: Font[];
  width: number;
  height: number;
};

export const FontsList = ({ fonts, width, height }: FontsListProps) => {
  const { fontSize } = useFontsContext();
  const filter = useFilterFont();
  const filteredList = fonts.filter(filter);

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
