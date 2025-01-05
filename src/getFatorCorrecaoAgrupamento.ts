
// tabela 42
const FCA = [
    { circuito: 1, fator: 1},
    { circuito: 2, fator: 0.80},
    { circuito: 3, fator: 0.70},
    
]

export function getFatorCorrecaoAgrupamentoByCircuito(numeroCircuito: number) {
    const fator = FCA.find(x=> x.circuito === numeroCircuito)
    return fator
}