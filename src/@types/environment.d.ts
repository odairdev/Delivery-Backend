export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string,
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}