//tablea 40

const fct = [
    {ambiente: 40, pvc: 0.87}
]

export function getFatorCorrecaoTemperaturaByTemperaturaAmbiente(temperaturaAmbiente: number) {
    const temp = fct.find(x => x.ambiente >= temperaturaAmbiente)
    return temp
}