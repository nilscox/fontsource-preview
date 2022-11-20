import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

import { useFontsContext } from '../fonts-context';
import { FontCategory, FontType } from '../types';

export const Filters = () => {
  const { filter, setValue } = useFontsContext();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchKeyListener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', searchKeyListener);
    return () => window.removeEventListener('keydown', searchKeyListener);
  }, []);

  return (
    <div className="row items-center gap-4">
      <MagnifyingGlassIcon className="h-6 w-6 stroke-2 text-muted" />

      <input
        ref={searchInputRef}
        type="search"
        placeholder="Search..."
        className="w-full border-b py-1 text-xl"
        value={filter}
        onChange={({ target }) => setValue('filter', target.value)}
      />

      <div className="row gap-2">
        <input
          type="checkbox"
          id="variable"
          onChange={({ target }) => setValue('variable', target.checked)}
        />
        <label htmlFor="variable">Variable</label>
      </div>

      <select
        onChange={({ target }) => setValue('categories', [target.value as FontCategory].filter(Boolean))}
        className="w-48 rounded border bg-transparent py-1 px-2"
      >
        <option value="">Category</option>
        {Object.values(FontCategory).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        onChange={({ target }) => setValue('types', [target.value as FontType].filter(Boolean))}
        className="w-48 rounded border bg-transparent py-1 px-2"
      >
        <option value="">Type</option>
        {Object.values(FontType).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
