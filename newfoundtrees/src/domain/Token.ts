export interface NewFoundToken {
    id: string
    edition: string
    details: TokenDetails
    batchSize: number
    sold: number,
    price: number,
    ownedEditions: string[]
    availableEditions: Token[]
    updates: TokenUpdate[]
}

export interface Metadata {
    copies: number,
    animation_url: string,
    description: string,
    title: string,
    price: number,
    media: string,
    extra: {trait_type: string, value: any}[]
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


export interface Store {
    id: string
    name: string
    owner: string
    things: Thing[]
}

export interface Thing {
    metaId: string
    id: string
    tokens_aggregate: {nodes: Token[]}
};

export interface Token {
    id: string
    list: List 
    mintGroupId: string
}

export interface List {
    price: number
}