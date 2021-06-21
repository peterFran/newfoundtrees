import {
    NewFoundToken,
    TokenDetails,
    Thing,
    Metadata,
    Store,
} from '../domain/Token'
import { gql } from '@apollo/client'

export interface StoreData {
    store: Store[]
}

export interface StoreVars {
    store: string
}

export interface UserVars {
    store: string
    user: string
}

export const LIST_TOKENS_QUERY = gql`
    query LIST_TOKENS_QUERY($store: String!) {
        store(where: { id: { _eq: $store } }) {
            things {
                id
                metaId
                tokens {
                    id
                    mintGroupId
                    lists(where: { acceptedOfferId: { _is_null: true } }) {
                        price
                    }
                }
            }
            id
            name
            owner
        }
    }
`

export const LIST_USERS_TOKENS_QUERY = gql`
    query LIST_USERS_TOKENS_QUERY($store: String!, $user: String!) {
        store(where: { id: { _eq: $store } }) {
            things(distinct_on: metaId, where: {tokens: {ownerId: {_eq: $user}, lists: {acceptedOfferId: {_is_null: false}}}}) {
                id
                metaId
                tokens(where: {ownerId: {_eq: $user}, lists: {acceptedOfferId: {_is_null: false}}}) {
                    id
                    mintGroupId
                    lists(where: { acceptedOfferId: { _is_null: false } }) {
                        price
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
            tokens {
                id
                mintGroupId
                lists(where: { acceptedOfferId: { _is_null: true } }) {
                    price
                }
            }
        }
    }
`

export async function fetchTokens(things: Thing[]): Promise<NewFoundToken[]> {
    return Promise.all(
        things
            .filter(
                (thing) => thing.tokens.some(it => it.lists.length > 0)
            )
            .map(async (thing) => {
                console.log(thing)
                return await getToken(thing)
            })
    ).catch(() => [])
}

export async function fetchUsersTokens(things: Thing[]): Promise<NewFoundToken[]> {
    return Promise.all(
        things
            .map(async (thing) => {
                console.log(thing)
                return await getToken(thing)
            })
    ).catch(() => [])
}

export async function getToken(thing: Thing): Promise<NewFoundToken> {
    console.log(`I'm getting a token ${thing.metaId}`)
    console.log(thing)
    return fetch(`https://arweave.net/${thing.metaId}`)
        .then((response) => response.json())
        .then((meta: Metadata) => {
            return {
                id: thing.id,
                edition: thing.tokens[0]?.mintGroupId.split(
                    ':'
                )[0],
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
                price: thing.tokens.some(it => it.lists.length > 0) &&
                    thing.tokens.length > 0
                        ? Math.min.apply(
                              Math,
                              thing.tokens.filter(it => it.lists.length > 0).map(
                                  (tok) => tok.lists[0].price
                              )
                          )
                        : null,
                ownedEditions: [],
                availableEditions: thing.tokens,
                updates: [],
            } as NewFoundToken
        })
}
