import { NewFoundToken, TokenDetails, Thing, Metadata, Store } from '../domain/Token'
import { API, Chain, MintbaseAPIConfig, Network, Wallet } from 'mintbase'
import { gql } from '@apollo/client'

export interface StoreData {
    store: Store[]
}

export interface StoreVars {
    store: string
}

export const LIST_TOKENS_QUERY = gql`
    query LIST_TOKENS_QUERY($store: String!) {
        store(where: { id: { _eq: $store } }) {
            things {
                id
                metaId
                tokens_aggregate(distinct_on: thingId) {
                    nodes {
                        id
                        list {
                            price
                        }
                        mintGroupId
                    }
                }
            }
            id
            name
            owner
        }
    }
`

export const GET_TOKEN_QUERY = gql`
    query GET_TOKEN_QUERY($thingId: String!) {
        thing(where: { id: { _eq: $thingId } }) {
            id
            metaId
            tokens_aggregate(distinct_on: thingId) {
                nodes {
                    id
                    list {
                        price
                    }
                    mintGroupId
                }
            }
        }
    }
`


export async function fetchTokens(things: Thing[]): Promise<NewFoundToken[]> {
    return Promise.all(
        things.filter((thing) => thing.tokens_aggregate.nodes[0].list?.price != null).map(async (thing) => {
            console.log(thing)
            return await getToken(thing)
        })
    ).catch(() => [])
}

export async function getToken(thing: Thing): Promise<NewFoundToken> {
    console.log(`I'm getting a token ${thing.metaId}`)
    return fetch(`https://arweave.net/${thing.metaId}`).then(
        response => response.json()
    ).then(
        (meta: Metadata) => 
    {
        return {
            id: thing.id,
            edition: thing.tokens_aggregate.nodes[0]?.mintGroupId.split(':')[0],
            details: {
                name: meta.title,
                description: meta.description, 
                content: meta.animation_url,
                impactScore: meta.extra.find(
                    (value: { trait_type: string }) =>
                        value.trait_type === 'impact'
                )?.value,
                coordinates: {
                    longitude: meta.extra.find(
                        (value: { trait_type: string }) =>
                            value.trait_type === 'longitude'
                    )?.value,
                    latitude: meta.extra.find(
                        (value: { trait_type: string }) =>
                            value.trait_type === 'latitude'
                    )?.value,
                } as GeolocationCoordinates,
                category: meta.extra.find(
                    (value: { trait_type: string }) =>
                        value.trait_type === 'category'
                )?.value,
                beneficiaries: [],
                projectDate: new Date(
                    meta.extra.find(
                        (value: { trait_type: string }) =>
                            value.trait_type === 'Start Date'
                    )?.value
                ),
                cover: meta.media,
            } as TokenDetails,
            batchSize: meta.copies,
            sold: 0,
            price: thing.tokens_aggregate.nodes.length > 0 ? Math.min.apply(Math, thing.tokens_aggregate.nodes.map(tok => tok.list.price)) : null,
            ownedEditions: [],
            availableEditions: thing.tokens_aggregate.nodes,
            updates: [],
        } as NewFoundToken
    })
}
