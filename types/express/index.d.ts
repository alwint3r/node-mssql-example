import sql from 'sql';

export {};

declare global {
  namespace Express {
    interface Application {
      sql: sql;
    }
  }
}
