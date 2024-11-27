declare global {
    var _mongoose: { conn: any; promise: any } | undefined;
  }
  
  // This is required for TypeScript to recognize this file as a module.
  export {};
  