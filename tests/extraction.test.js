const assert = require('assert');
const {
  extrairGanhos,
  extrairPerdas,
  extrairDiurese,
  extrairHemodialise,
  extrairBalanco,
  extrairHGT,
  extrairTemperatura,
} = require('../extraction');

// Texto de exemplo para os testes
const texto = `
Paciente X
Total de Ganhos (mL) 100 200
Total de Perdas (mL) 50
Diurese (Volume/ml) 300
Hemodialise 20
Evolução (Ganhos-Perdas) 30
Glicemia - MG/DL 80 150 120
Temperatura - °C 36.5 37 37.5
`;

assert.strictEqual(extrairGanhos(texto), 200, 'extrairGanhos deve pegar o ultimo numero');
assert.strictEqual(extrairPerdas(texto), -50, 'extrairPerdas deve retornar negativo');
assert.strictEqual(extrairDiurese(texto), -300, 'extrairDiurese deve retornar valor negativo');
assert.strictEqual(extrairHemodialise(texto), 20, 'extrairHemodialise deve retornar numero');
assert.strictEqual(extrairBalanco(texto), 30, 'extrairBalanco deve pegar ultimo numero');
assert.strictEqual(extrairHGT(texto), '80/150', 'extrairHGT deve pegar menor e maior');
assert.strictEqual(extrairTemperatura(texto), '36.5/37.5', 'extrairTemperatura deve pegar min/max');

console.log('Todos os testes passaram!');
