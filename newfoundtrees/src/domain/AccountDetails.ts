import { AccountBalance } from 'near-api-js/lib/account';

export default interface AccountDetails {
    balance: NormalisedBalance
    accountId: string
}

export interface NormalisedBalance {
    total: number;
    stateStaked: number;
    staked: number;
    available: number;
}

export function normaliseBalance({balance} :{balance: AccountBalance}) : NormalisedBalance{
    return {
        total: normaliseNumber({value: balance.total}),
        staked: normaliseNumber({value: balance.staked}),
        stateStaked: normaliseNumber({value: balance.stateStaked}),
        available: normaliseNumber({value: balance.available})
    }
}

function normaliseNumber({value}: {value: string}): number {
    const scaled = parseInt(value) as number * 0.000000000000000000000001
             return Math.round((scaled + Number.EPSILON) * 10000) / 10000
}