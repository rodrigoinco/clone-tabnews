import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  if (request.method != "GET" && request.method != "POST") {
    return response.status(405).end();
  }

  const dbClient = await database.getNewClient();
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
    dbClient.end();
    return response.status(200).json(pendentMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOption,
      dryRun: false,
    });

    dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
