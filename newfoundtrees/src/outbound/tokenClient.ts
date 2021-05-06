import { OldToken, TokenDetails, Thing, Metadata, Store } from '../domain/Token'
import { API, Chain, Network } from 'mintbase'
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
    thing(where: {id: {_eq: $thingId}}) {
      id
      metaId
      tokens_aggregate(distinct_on: thingId) {
        nodes {
          list {
            price
          }
          mintGroupId
        }
      }
    }
  }
`

export const api = new API({
    chain: Chain.near,
    networkName: process.env.REACT_APP_NEAR_CHAIN === 'mainnet' ? Network.main : Network.testnet,
    apiKey: process.env.REACT_APP_MINTBASE_API_KEY,
})

export async function getToken(thing: Thing): Promise<OldToken> {
    return api.fetchMetadata(thing.metaId).then((meta: Metadata) => {
        return {
            id: thing.id,
            edition: thing.tokens_aggregate.nodes[0]?.mintGroupId.split(':')[0],
            details: {
                name: meta.name,
                description: meta.description,
                content: meta.animation_url,
                impactScore: meta.attributes.find(
                    (value: { trait_type: string }) =>
                        value.trait_type === 'impact'
                )?.value,
                coordinates: {
                    longitude: meta.attributes.find(
                        (value: { trait_type: string }) =>
                            value.trait_type === 'longitude'
                    )?.value,
                    latitude: meta.attributes.find(
                        (value: { trait_type: string }) =>
                            value.trait_type === 'latitude'
                    )?.value,
                } as GeolocationCoordinates,
                category: meta.attributes.find(
                    (value: { trait_type: string }) =>
                        value.trait_type === 'category'
                )?.value,
                beneficiaries: [],
                projectDate: new Date(
                    meta.attributes.find(
                        (value: { trait_type: string }) =>
                            value.trait_type === 'Start Date'
                    )?.value
                ),
                cover: meta.image,
            } as TokenDetails,
            batchSize: meta.amountToMint,
            sold: 0,
            price: thing.tokens_aggregate.nodes[0]?.list.price,
            ownedEditions: [], 
            updates: [],
        } as OldToken
    })
}

