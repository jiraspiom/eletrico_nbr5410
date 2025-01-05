function calcularCaboEDisjuntor(potencia, tensao, temperatura, numCircuitos) {
  // Fator de potência (assumindo 0,8 para cargas típicas monofásicas)
  const fatorPotencia = 0.8

  // Cálculo da corrente (em amperes)
  const corrente = potencia / (tensao * fatorPotencia)

  // Fatores de correção baseados na NBR 5410
  let fatorTemperatura = 1
  if (temperatura > 30) fatorTemperatura = 1.1 // Aumento de 10% para temperaturas acima de 30°C

  let fatorCircuitos = 1
  if (numCircuitos > 3) fatorCircuitos = 1.2 // Aumento de 20% para mais de 3 circuitos

  // Corrente ajustada para temperatura e número de circuitos
  const correnteAjustada = corrente * fatorTemperatura * fatorCircuitos

  // Escolha do cabo conforme a corrente ajustada (com base na tabela de capacidade de condução de corrente)
  let cabo = '2,5mm²'
  if (correnteAjustada > 20) cabo = '4mm²'
  if (correnteAjustada > 25) cabo = '6mm²'
  if (correnteAjustada > 32) cabo = '10mm²'

  // Escolhendo o disjuntor (baseado em 1,25 vezes a corrente ajustada)
  const disjuntor = correnteAjustada * 1.25

  // A NBR 5410 especifica que a corrente do disjuntor deve ser arredondada para o próximo disjuntor padrão
  const disjuntorEscolhido = Math.ceil(disjuntor)

  // Exibindo os resultados
  return {
    corrente: correnteAjustada.toFixed(2),
    cabo: cabo,
    disjuntor: disjuntorEscolhido,
  }
}

// Exemplo de uso
const resultado = calcularCaboEDisjuntor(7500, 220, 40, 1)
console.log(`Corrente: ${resultado.corrente} A`)
console.log(`Cabo recomendado: ${resultado.cabo}`)
console.log(`Disjuntor recomendado: ${resultado.disjuntor} A`)
