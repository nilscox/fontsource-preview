import { useCallback, useEffect, useState } from 'react';

import { FontsList } from './components/fonts-list';
import { Header } from './components/header';
import { Font } from './types';

export const App = () => {
  const [fonts, setFonts] = useState<Font[]>();

  useEffect(() => {
    void fetch('/fonts.json')
      .then((res) => res.json())
      .then(setFonts);
  }, []);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const recomputeSize = useCallback(() => {
    setWidth(ref?.clientWidth);
    setHeight(ref?.clientHeight);
  }, [ref]);

  useEffect(recomputeSize, [recomputeSize]);

  useEffect(() => {
    window.addEventListener('resize', recomputeSize);
    return () => window.removeEventListener('resize', recomputeSize);
  }, [recomputeSize]);

  return (
    <div className="col container mx-auto h-screen px-6">
      <Header />
      <div className="flex-1" ref={setRef}>
        {fonts && width && height && <FontsList fonts={fonts} width={width} height={height} />}
      </div>
    </div>
  );
};
