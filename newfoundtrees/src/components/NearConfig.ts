import { Chain, Network } from 'mintbase'

// export const nearConfig = {
//     networkId: 'default',
//     nodeUrl: 'https://rpc.testnet.near.org',
//     walletUrl: 'https://wallet.testnet.near.org',
//     helperUrl: 'https://helper.testnet.near.org',
//     contract: 'newfoundtrees.mintspace1.testnet',
// }

export const mintbaseConfig = {
    chain: Chain.near,
    networkName:
        process.env.REACT_APP_NEAR_CHAIN === 'mainnet'
            ? Network.mainnet
            : Network.testnet,
    apiKey: process.env.REACT_APP_MINTBASE_API_KEY,
}

// export const near = new Near({
//     networkId: nearConfig.networkId,
//     nodeUrl: 'https://rpc.testnet.near.org',
//     walletUrl: nearConfig.walletUrl,
//     deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
// })
