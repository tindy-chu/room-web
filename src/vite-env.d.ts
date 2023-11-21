/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}
