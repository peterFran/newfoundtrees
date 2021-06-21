export default interface AccountDetails {
    accountId: string;
    balance: string;
    allowance: string;
    contractName: string;
}
export interface NormalisedBalance {
    total: number
    stateStaked: number
    staked: number
    available: number
}

const defaultBalance = '0'

export const defaultAccount: AccountDetails = {balance: defaultBalance, accountId: '', allowance: '', contractName: ''} as AccountDetails 


