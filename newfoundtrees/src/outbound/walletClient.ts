import { WalletConnection } from 'near-api-js'
import { normaliseBalance } from '../domain/AccountDetails'
import AccountDetails from '../domain/AccountDetails'
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
