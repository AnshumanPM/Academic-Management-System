import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/auth-schema";
import { env } from "cloudflare:workers";
import { Pool } from "pg";

function getConnectionString() {
  return (
    env?.HYPERDRIVE?.connectionString ??
    env?.DATABASE_URL ??
    process.env.DATABASE_URL!
  );
}

function createPool() {
  const pool = new Pool({
    connectionString: getConnectionString(),
    max: 1,
    maxUses: 1,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 5000,
    keepAlive: false,
  });

  pool.on("error", (err) => {
    console.error("PG pool background error:", err);
  });

  return pool;
}

export function getDb() {
  const pool = createPool();
  return drizzle(pool, { schema });
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
