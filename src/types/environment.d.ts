
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL?: string;
      SUPABASE_SECRET_KEY?: string;
      [key: string]: string | undefined;
    }
  }
}

// This makes it a module file
export {};
