export interface Token {
    id: number
    details: TokenDetails
    batchSize: number
    sold: number,
    price: number,
    ownedEditions: number[]
    updates: TokenUpdate[]
}

export interface TokenDetails {
    name: string
    description: string
    content: string
    impactScore: 0 | 1 | 2 | 3 | 4 |5
    coordinates: GeolocationCoordinates
    category: 'reforestation' | 'rewilding' | 'cultural'
    beneficiaries: {
        account: string
        proportion: number
    }[]
    projectDate: Date
    cover: string
}

interface TokenUpdate {
    conext: string
    content: string
}
