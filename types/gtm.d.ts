declare global {
  interface Window {
    dataLayer: any[];
    gtm: (...args: any[]) => void;
  }
}

export {};
