import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Font, FontCategory, FontType } from './types';

type FontsContext = {
  filter: string;
  variable: boolean;
  categories: FontCategory[];
  types: FontType[];
  fontSize: number;
  text: string;
};

type SetValue = <Key extends keyof FontsContext>(key: Key, value: FontsContext[Key]) => void;

const fontsContext = createContext({} as FontsContext & { setValue: SetValue });

type FontsContextProviderProps = {
  children: React.ReactNode;
};

export const FontsContextProvider = ({ children }: FontsContextProviderProps) => {
  const [filter, setFilter] = useState('');
  const [variable, setVariable] = useState<boolean>(false);
  const [categories, setCategories] = useState<FontCategory[]>([]);
  const [types, setTypes] = useState<FontType[]>([]);
  const [fontSize, setFontSize] = useState(42);
  const [text, setText] = useState('Sphinx of black quartz, judge my vow.');

  const setValue = useCallback<SetValue>((key, value) => {
    if (key === 'fontSize') {
      setFontSize(value as number);
    } else if (key === 'variable') {
      setVariable(value as boolean);
    } else if (key === 'categories') {
      setCategories(value as FontCategory[]);
    } else if (key === 'types') {
      setTypes(value as FontType[]);
    } else if (key === 'text') {
      setText(value as string);
    } else if (key === 'filter') {
      setFilter(value as string);
    }
  }, []);

  return (
    <fontsContext.Provider value={{ filter, variable, categories, types, fontSize, text, setValue }}>
      {children}
    </fontsContext.Provider>
  );
};

export const useFontsContext = () => {
  return useContext(fontsContext);
};

export const useFilterFont = () => {
  const { filter, variable, categories, types } = useFontsContext();

  const re = useMemo(() => new RegExp(filter, 'i'), [filter]);
  const matchSearch = useCallback(
    (font: Font) => {
      return filter === '' || font.fontName.match(re);
    },
    [filter, re]
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
