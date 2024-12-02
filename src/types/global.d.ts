import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: any;
  }
}

declare global {
    var _mongoose: { conn: any; promise: any } | undefined;
  }
  export {};
  