
//video=fCBuxNpuptk

import { getFatorCorrecaoAgrupamentoByCircuito } from "./getFatorCorrecaoAgrupamento"
import { getFatorCorrecaoTemperaturaByTemperaturaAmbiente } from "./getFatorCorrecaoTemperatura"
import { getSessaoNominalbyAperes } from "./getSessaoNominalbyAperes"

const metodo = 'B1'
const potencia = 7500
const VOLTAGEM = 220
const title = ` Potencia: ${potencia} a ${VOLTAGEM}V`

const amperagem = (Math.round((potencia / VOLTAGEM) * 100) / 100)

console.log(`title: ${title} metodo: ${metodo}`);
console.log('anperes', amperagem);

// usa o zero se achou o dijuntor, se nao achar vai para o proximo cabo add 1
const cabo = getSessaoNominalbyAperes(amperagem, 1)
console.log(`metodo: ${metodo}, cabo: ${cabo?.mm}mm, ${cabo?.a}A`);

const segundo = getFatorCorrecaoTemperaturaByTemperaturaAmbiente(40)
console.log('fator temperatura', segundo?.pvc);

// quantidade de circuito dentro do conduite 1
const terceito = getFatorCorrecaoAgrupamentoByCircuito(1)
console.log('Fator Cirtuito', terceito?.fator);



const FatorCorrecao = (segundo?.pvc! * terceito?.fator!)
console.log('fator de correcao', FatorCorrecao);

//fator de correcao * amperes do cabo
const valor = FatorCorrecao * cabo?.a!
console.log(`Amperage calculada: o cabo de ${cabo?.mm}mm agora nao suporta mais ${cabo?.a}A, e sim ${valor}A`, );

if(valor >= amperagem){
    console.log(`o cabo esta ok: CorrenteAtual: ${valor}A CorrenteCircuito: ${amperagem}A`);
}else{
    console.log(`Nao recomentado: CorrenteAtual: ${valor}A CorrenteCircuito: ${amperagem}A`);
}

// djuntor quem de ser maior que a potencia e menor que o cabo
console.log(`potencia circuito: ${amperagem}A`);
console.log(`potencia cabo: ${valor}`);
console.log(`USAR: dijuntor MAIOR que ${amperagem} e MENOR que ${valor}`);
console.log(`USAR: cabo ${cabo?.mm}mm² sua corrente vai ser ${amperagem}A`);