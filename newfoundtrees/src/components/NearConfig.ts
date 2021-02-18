import { Near } from "near-api-js";
import * as nearAPI from 'near-api-js';

export const nearConfig = {
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contract: 'dev-1609104596673-2046347'
};

export const near = new Near({
    networkId: nearConfig.networkId, nodeUrl : 'https://rpc.testnet.near.org', walletUrl: nearConfig.walletUrl, deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() }
});