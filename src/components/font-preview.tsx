import { useCallback, useState } from 'react';

import { useFontsContext } from '../fonts-context';
import { Font, FontStyle } from '../types';

import { FontControls } from './font-controls';

type FontPreviewProps = {
  font: Font;
};

export const FontPreview = ({ font }: FontPreviewProps) => {
  const { fontSize, text } = useFontsContext();
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
