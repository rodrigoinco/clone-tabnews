import orchestration from "tests/orchestration.js";

beforeAll(async () => {
  await orchestration.waitForAllServices();
  await orchestration.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonimous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
