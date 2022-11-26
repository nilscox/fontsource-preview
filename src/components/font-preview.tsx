import { useCallback, useState } from 'react';

import { useSearchParams } from '../search-params';
import { Font, FontStyle } from '../types';

import { FontControls } from './font-controls';
import { defaultFontSize, defaultText } from './global-controls';

type FontPreviewProps = {
  font: Font;
};

export const FontPreview = ({ font }: FontPreviewProps) => {
  const searchParams = useSearchParams();
  const fontSize = Number(searchParams.get('size') ?? defaultFontSize);
  const text = searchParams.get('text') ?? defaultText;

  const [fontWeight, setFontWeight] = useState<number>();
  const [fontStyle, setFontStyle] = useState<FontStyle>(FontStyle.normal);

  const toggleWeight = useCallback((weight: number) => {
    return () => {
      setFontWeight((fontWeight) => {
        if (weight === fontWeight) {
          return undefined;
        }

        return weight;
      });
    };
  }, []);

  return (
    <>
      <FontLinks font={font} />

      <FontControls
        font={font}
        fontWeight={fontWeight}
        toggleWeight={toggleWeight}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
      />

      <div
        style={{ fontFamily: font.fontName, fontSize, fontWeight, fontStyle }}
        className="overflow-hidden whitespace-nowrap"
      >
        {font.type === 'icons' ? icons : text}
      </div>
    </>
  );
};

const icons =
  'photo_camera thumb_up assignment create_new_folder insert_invitation drafts credit_card timer check_box close';

type FondLinksProps = {
  font: Font;
};

const FontLinks = ({ font }: FondLinksProps) => (
  <>
    {getFontFiles(font).map((file, index) => (
      <link key={index} rel="stylesheet" type="text/css" href={file} />
    ))}
  </>
);

const getFontFiles = (font: Font) => {
  return font.weights.flatMap((weight) => {
    return font.styles.map((style) => {
      return `@fontsource/${font.fontId}/${weight}${style === FontStyle.italic ? '-italic' : ''}.css`;
    });
  });
};
