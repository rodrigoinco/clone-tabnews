const Calculadora = require("../models/calculadora.js");

test("Somar 2 + 2 deveria retornar 4", () => {
  const resultado = Calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar casa + 2 deveria retornar Erro", () => {
  const resultado = Calculadora.somar("Casa", 2);
  expect(resultado).toBe("Erro");
});

test("Somar vazio deveria retornar Erro", () => {
  const resultado = Calculadora.somar();
  expect(resultado).toBe("Erro");
});
