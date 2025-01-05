// tabela 42
interface FatorCorrecaoAgrupamento {
  circuito: number // Número do circuito
  fator: number // Fator de correção
}

const FCA: FatorCorrecaoAgrupamento[] = [
  { circuito: 1, fator: 1 },
  { circuito: 2, fator: 0.8 },
  { circuito: 3, fator: 0.7 },
]

export function getFatorCorrecaoAgrupamentoByCircuito(
  numeroCircuito: number
): FatorCorrecaoAgrupamento | null {
  if (numeroCircuito < 1) {
    console.warn('Número do circuito inválido. Deve ser maior ou igual a 1.')
    return null
  }

  const fatorCorrecao = FCA.find(f => f.circuito === numeroCircuito)

  if (!fatorCorrecao) {
    console.warn(
      `Nenhum fator de correção encontrado para o circuito ${numeroCircuito}.`
    )
    return null
  }

  return fatorCorrecao
}
