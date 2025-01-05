export const calcularAmperagem = (
  potencia: number,
  voltagem: number
): number => {
  return Math.round((potencia / voltagem) * 100) / 100
}
