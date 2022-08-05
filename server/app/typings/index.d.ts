interface Link {
  title: string;
  href: string;
  index: string;
}

declare module 'egg' {
  export interface Application {
    [key: string]: any;
  }
}