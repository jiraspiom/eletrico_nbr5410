const dijuntor = [
  { in: 2 },
  { in: 4 },
  { in: 6 },
  { in: 10 },
  { in: 16 },
  { in: 20 },
  { in: 25 },
  { in: 32 },
  { in: 40 },
  { in: 50 },
  { in: 63 },
]

export function dijuntores(valorMin: number, valorMax: number) {
  const encontrado = dijuntor.find(
    obj => obj.in > valorMin && obj.in < valorMax
  )
  return encontrado ? encontrado.in : null
}
