export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string,
      JWT_SECRET_DELIVERYMAN: string,
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}