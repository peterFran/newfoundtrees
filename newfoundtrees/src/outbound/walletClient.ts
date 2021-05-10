import { WalletConnection } from 'near-api-js'
import { normaliseBalance } from '../domain/AccountDetails'
import AccountDetails from '../domain/AccountDetails'
import { Chain, Network, Wallet } from 'mintbase'
export async function signIn(
    contract: string,
    wallet: WalletConnection
): Promise<AccountDetails> {
    return wallet
        .requestSignIn(contract, 'New Found Trees')
        .then(() => getAccountDetails(wallet))
        .catch((err) => {
            return Promise.reject(err || 'fail')
        })
}

export async function getAccountDetails(wallet: WalletConnection) {
    return wallet
        .account()
        .getAccountBalance()
        .then((balance) => {
            return {
                balance: normaliseBalance({
                    balance: balance,
                }),
                accountId: wallet.getAccountId(),
            } as AccountDetails
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

export const wallet = new Wallet({
    chain: Chain.near,
    networkName:
        process.env.REACT_APP_NEAR_CHAIN === 'mainnet'
            ? Network.main
            : Network.testnet,
    apiKey: process.env.REACT_APP_MINTBASE_API_KEY,
})
