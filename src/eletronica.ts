//video=fCBuxNpuptk

import { getFatorCorrecaoAgrupamentoByCircuito } from './getFatorCorrecaoAgrupamento'
import { getFatorCorrecaoTemperaturaByTemperaturaAmbiente } from './getFatorCorrecaoTemperatura'
import { getSessaoNominalbyAperes } from './getSessaoNominalbyAperes'
import { calcularAmperagem } from './lib/calculaAmperagem'
import { calculaCapacidadeAjustada } from './lib/calculaCapacidadeAjustada'
import { calculaFatorCorrecaoFinal } from './lib/calculaFatorCorrecaoFinal'
import { dijuntores } from './lib/dijuntores'

const metodo = 'B1'
const potencia = 7500
const VOLTAGEM = 220
const temperaturaAmbiente = 40
const numeroCircuitos = 1
const proximoCabo = 1

const title = `Potência: ${potencia}W a ${VOLTAGEM}V`
console.log(`Título: ${title} | Método: ${metodo}`)

const amperagem = calcularAmperagem(potencia, VOLTAGEM)
console.log(`Amperagem calculada: ${amperagem}A`)

// Obter cabo nominal
// usa o zero se achou o dijuntor, se nao achar vai para o proximo cabo add 1
const cabo = getSessaoNominalbyAperes(amperagem, proximoCabo)
if (!cabo) {
  console.error('Nenhum cabo nominal encontrado para a corrente fornecida.')
  process.exit(1)
}
console.log(`Cabo selecionado: ${cabo.mm}mm², Suporta até: ${cabo.a}A`)

const fatorTemperatura =
  getFatorCorrecaoTemperaturaByTemperaturaAmbiente(temperaturaAmbiente)
console.log(`Fator de correção por temperatura: ${fatorTemperatura?.pvc}`)

if (!fatorTemperatura) {
  console.error(
    'Nenhum fator de correção encontrado para a temperatura ambiente fornecida.'
  )
  process.exit(1)
}

// quantidade de circuito dentro do conduite 1
const fatorAgrupamento = getFatorCorrecaoAgrupamentoByCircuito(numeroCircuitos)
if (!fatorAgrupamento) {
  console.error('Nenhum fator de agrupamento encontrado.')
  process.exit(1)
}

console.log('Fator Cirtuito', fatorAgrupamento?.fator)

if (!fatorAgrupamento) {
  console.error(
    'Nenhum fator de correção encontrado para o número de circuitos fornecido.'
  )
  process.exit(1)
}

// Cálculo do fator de correção final
const fatorCorrecaoFinal = calculaFatorCorrecaoFinal(
  fatorTemperatura.pvc,
  fatorAgrupamento.fator
)
console.log(`Fator de correção total: ${fatorCorrecaoFinal.toFixed(2)}`)

//fator de correcao * amperes do cabo
// Ajuste da capacidade do cabo considerando o fator de correção
const capacidadeAjustada = calculaCapacidadeAjustada(
  fatorCorrecaoFinal,
  cabo?.a
)

console.log(`Capacidade ajustada do cabo: ${capacidadeAjustada.toFixed(2)}A`)
console.log(
  `Amperage calculada: o cabo de ${cabo?.mm}mm agora nao suporta mais ${cabo?.a}A, e sim ${capacidadeAjustada.toFixed(2)}A`
)

// Verificação do cabo
if (capacidadeAjustada >= amperagem) {
  console.log(
    `Cabo adequado: Suporta até ${capacidadeAjustada.toFixed(2)}A, necessário: ${amperagem}A.`
  )
} else {
  console.warn(
    `Cabo inadequado: Suporta até ${capacidadeAjustada.toFixed(2)}A, necessário: ${amperagem}A.`
  )
}

// djuntor quem de ser maior que a potencia e menor que o cabo
// Recomendação de disjuntor
console.log(`Potência circuito:           ${amperagem.toFixed(2)}A`)
console.log(`Capacidade ajustada do cabo: ${capacidadeAjustada.toFixed(2)}A`)
console.log(
  `Recomendação: Utilize disjuntor MAIOR que ${amperagem}A e MENOR que ${capacidadeAjustada.toFixed(
    2
  )}A.`
)

console.log(`Utilize cabo ${cabo?.mm}mm² para corrente de ${amperagem}A.`)

const dijuntro = dijuntores(amperagem, capacidadeAjustada)
if (dijuntro) {
  console.log(`Utilize o dijuntor: ${dijuntro}`)
} else {
  console.warn('Dijuntor nao encontrado: mude para o proximoCabo')
}
