import { Filters } from './filters';
import { GlobalControls } from './global-controls';

export const Header = () => (
  <div>
    <div className="row h-32">
      <h1 className="self-center text-4xl">
        <code>@fontsource/*</code>
      </h1>
      <div className="ml-auto w-full max-w-md">
        <GlobalControls />
      </div>
    </div>
    <Filters />
  </div>
);
