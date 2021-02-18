import * as React from 'react';
import { AccountBalance } from 'near-api-js/lib/account';

const AuthContext = React.createContext({
    signIn: () => Promise.resolve("") ,
    signOut: () => {},
    accountDetails: {} as 
    {
        balance: AccountBalance,
        accountId: string,
    } | null
});

export default AuthContext