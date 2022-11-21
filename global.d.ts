declare const buildDate: string;

declare module '*.svg' {
  const svg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
