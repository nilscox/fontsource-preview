import { useFontsContext } from '../fonts-context';

export const GlobalControls = () => {
  const { fontSize, text, setValue } = useFontsContext();

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
          value={fontSize}
          onChange={({ target }) => setValue('fontSize', target.valueAsNumber)}
          className="w-48 align-middle"
        />
        <input
          type="number"
          className="ml-2 w-16 align-middle"
          value={fontSize}
          onChange={({ target }) => setValue('fontSize', target.valueAsNumber)}
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-muted">
          Text
        </label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={({ target }) => setValue('text', target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};
