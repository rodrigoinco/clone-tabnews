import orchestration from "tests/orchestration.js";

beforeAll(async () => {
  await orchestration.waitForAllServices();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonimous user", () => {
    test("Retrieving the current status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toBe(parsedUpdatedAt);

      const resultDatabase = responseBody.dependencies.database;
      expect(resultDatabase.version).toEqual("16.0");
      expect(resultDatabase.max_connections).toBe(100);
      expect(resultDatabase.opened_connections).toEqual(1);
    });
  });
});
