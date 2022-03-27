// this file is used in the lib/sidenav wrapper, to allow for the sticky fix/hack

const screen: any = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1366,
  xl2: 1584,
  xl3: 1920,
  xl4: 2560,
  xl5: 3840
};

// within your component:
/*
    window.addEventListener(
      "resize",
      debounce(() => this.handleResize())
    );
*/

// calculate size
export const handleResize = (): string => {
  // get window width
  const iw = window.innerWidth;

  // determine named size
  let size: string = ``;
  for (let s in screen) {
    if (iw >= screen[s]) size = s;
  }
  return size;
};
