export interface Token {
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
