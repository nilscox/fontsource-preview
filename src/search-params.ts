import { useCallback, useEffect, useState } from 'react';

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));

  useEffect(() => {
    window.addEventListener('replacestate', () => {
      setSearchParams(new URLSearchParams(location.search));
    });
  }, []);

  return searchParams;
};

export const useSetSearchParam = () => {
  return useCallback((field: string, value: undefined | boolean | number | string | string[]) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (value === undefined || value === false || value === 0 || value === '' || isEmptyArray(value)) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, String(value));
    }

    window.history.replaceState(null, '', `?${searchParams}`);
  }, []);
};

(function () {
  const replaceState = history.replaceState.bind(history);

  history.replaceState = function (...args: Parameters<typeof replaceState>) {
    replaceState(...args);
    window.dispatchEvent(new Event('replacestate'));
  };
})();

const isEmptyArray = (value: unknown) => {
  return Array.isArray(value) && value.length === 0;
};
