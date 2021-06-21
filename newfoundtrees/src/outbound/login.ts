import { Wallet } from 'mintbase'

interface Details {
    accountId: string
    balance: string
    allowance: string
    contractName: string
}

export const performLogin = async (
    wallet: Wallet,
    request: boolean
): Promise<Details> => {
    await wallet.connect({ requestSignIn: request })

    if (wallet.isConnected()) {
        try {
            const { data: details } = await wallet.details()
            return details
            // setAccountDetails(details)
            // setIsNearLoggedIn(true)
        } catch (error) {
            console.log(error)
            throw Error("Detail fetch failed")
        }
    } else {
        throw Error("Login failed")
    }
}
