import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

import { useSetSearchParam } from '../search-params';
import { FontCategory, FontType } from '../types';

export const Filters = () => {
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

  const searchParams = new URLSearchParams(window.location.search);
  const setSearchParam = useSetSearchParam();

  return (
    <div className="row items-center gap-4">
      <MagnifyingGlassIcon className="h-6 w-6 stroke-2 text-muted" />

      <input
        ref={searchInputRef}
        type="search"
        placeholder="Search..."
        className="w-full border-b py-1 px-2 text-xl"
        defaultValue={searchParams.get('search') ?? ''}
        onChange={({ target }) => setSearchParam('search', target.value)}
      />

      <div className="row gap-2">
        <input
          type="checkbox"
          id="variable"
          defaultChecked={searchParams.get('variable') === 'true'}
          onChange={({ target }) => setSearchParam('variable', target.checked)}
        />
        <label htmlFor="variable">Variable</label>
      </div>

      <select
        defaultValue={searchParams.get('categories') ?? undefined}
        onChange={({ target }) =>
          setSearchParam('categories', [target.value as FontCategory].filter(Boolean))
        }
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
        defaultValue={searchParams.get('types') ?? undefined}
        onChange={({ target }) => setSearchParam('types', [target.value as FontType].filter(Boolean))}
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
