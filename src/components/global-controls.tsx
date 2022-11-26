import { useSearchParams, useSetSearchParam } from '../search-params';

export const defaultFontSize = 42;
export const defaultText = 'Sphinx of black quartz, judge my vow.';

export const GlobalControls = () => {
  const searchParams = useSearchParams();
  const setSearchParam = useSetSearchParam();

  const handleFontSizeChanged = (value: number) => {
    setSearchParam('size', value === defaultFontSize ? undefined : value);
  };

  return (
    <div className="col h-full items-stretch justify-evenly">
      <div>
        <label htmlFor="font-size" className="block text-sm font-medium text-muted">
          Font size
        </label>
        <input
          id="font-size"
          type="range"
          min={1}
          max={200}
          step={1}
          value={searchParams.get('size') ?? defaultFontSize}
          onChange={({ target }) => handleFontSizeChanged(target.valueAsNumber)}
          className="w-48 align-middle"
        />
        <input
          type="number"
          className="ml-2 w-16 align-middle"
          value={searchParams.get('size') ?? defaultFontSize}
          onChange={({ target }) => handleFontSizeChanged(target.valueAsNumber)}
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-muted">
          Text
        </label>
        <input
          id="text"
          type="text"
          className="w-full"
          defaultValue={searchParams.get('text') ?? defaultText}
          onChange={({ target }) => setSearchParam('text', target.value)}
        />
      </div>
    </div>
  );
};
