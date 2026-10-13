import "server-only";
import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;

export function getNeonSql() {
  if (!_sql) {
    const url = process.env.NEON_DATABASE_URL;
    if (!url) return null;
    _sql = neon(url);
  }
  return _sql;
}
