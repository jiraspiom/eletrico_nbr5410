
//tabela 36
const B1 = [
    {
        numeroCondutores: 2,
        Aperes: [
            {a: 14,   mm: 1},
            {a: 17.5, mm: 1.5},
            {a: 24,   mm: 2.5},
            {a: 32,   mm: 4},
            {a: 41,   mm: 6},
            {a: 57,   mm: 10},
            {a: 76,   mm: 16},
        ]
    },
    {
        numeroCondutores: 3,
        Aperes: [
            {a: 12,   mm: 1},
            {a: 15.5, mm: 1.5},
        ]
    },
]



export function getSessaoNominalbyAperes(amper: number, proximo: number) {
    const condutor = B1.find(x => x.numeroCondutores === 2)
    const achou = condutor?.Aperes.find(x => x.a > amper)

    const posicao = condutor?.Aperes.findIndex(x => x.mm === achou?.mm )

    return condutor?.Aperes[posicao! + proximo]
}