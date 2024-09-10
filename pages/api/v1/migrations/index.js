import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOption = await {
      dbClient: dbClient,
      dryRun: true,
      verbose: true,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendentMigrations = await migrationRunner(defaultMigrationsOption);
      return response.status(200).json(pendentMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOption,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dbClient.end();
  }
}
