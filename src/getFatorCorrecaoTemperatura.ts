//tablea 40
interface FatorCorrecao {
  ambiente: number // Temperatura ambiente em graus Celsius
  pvc: number // Fator de correção para o material PVC
}

const fct: FatorCorrecao[] = [{ ambiente: 40, pvc: 0.87 }]

export function getFatorCorrecaoTemperaturaByTemperaturaAmbiente(
  temperaturaAmbiente: number
): FatorCorrecao | null {
  if (temperaturaAmbiente < 0) {
    console.warn('Temperatura ambiente inválida. Deve ser maior ou igual a 0.')
    return null
  }
  const fatorCorrecao = fct.find(f => f.ambiente >= temperaturaAmbiente)

  if (!fatorCorrecao) {
    console.warn(
      `Nenhum fator de correção encontrado para temperatura ambiente >= ${temperaturaAmbiente}°C.`
    )
    return null
  }

  return fatorCorrecao
}
