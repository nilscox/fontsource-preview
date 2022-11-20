import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import GithubIcon from '../icons/github.svg';
import NpmIcon from '../icons/npm.svg';
import { Font, FontStyle } from '../types';

type FontControlsProps = {
  font: Font;
  fontWeight?: number;
  toggleWeight: (weight: number) => () => void;
  fontStyle: FontStyle;
  setFontStyle: (style: FontStyle) => void;
};

export const FontControls = ({
  font,
  fontWeight,
  toggleWeight,
  fontStyle,
  setFontStyle,
}: FontControlsProps) => (
  <div className="row mr-2 items-center gap-2">
    <div className="whitespace-nowrap">
      <span className="font-medium">{font.fontName}</span>{' '}
      <span className="text-sm">({font.version ?? 'unknown version'})</span>
    </div>

    <Separator />

    <div className="row gap-2 text-sm font-medium text-muted">
      <a href={font.source}>Source</a>
      <a href={font.license}>License</a>
    </div>

    <div className="flex-1" />

    <div className="chip">{font.category}</div>
    {font.variable && <div className="chip">variable</div>}

    <Separator />

    {font.weights.map((weight) => (
      <button
        key={weight}
        className={clsx(weight === fontWeight && 'font-semibold')}
        onClick={toggleWeight(weight)}
      >
        {weight}
      </button>
    ))}

    <Separator />

    {Object.values(FontStyle).map((style) => (
      <button
        key={style}
        className={clsx(style === fontStyle && 'font-semibold')}
        onClick={() => setFontStyle(style)}
      >
        {style}
      </button>
    ))}

    <Separator />

    <div className="row gap-4">
      <a href={`https://api.fontsource.org/v1/fonts/${font.fontId}/download`}>
        <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />
      </a>

      <a href={`https://www.npmjs.com/package/@fontsource/${font.fontId}`}>
        <NpmIcon className="h-4 w-4 text-muted" />
      </a>

      <a href={`https://github.com/fontsource/fontsource/tree/main/fonts/${font.type}/${font.fontId}#readme`}>
        <GithubIcon className="h-4 w-4 text-muted" />
      </a>
    </div>
  </div>
);

const Separator = () => {
  return <div className="text-[#999]">|</div>;
};
