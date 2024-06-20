test("GET to /api/v1/status should return 200", async () => {
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
