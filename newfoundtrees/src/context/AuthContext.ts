import { Contract } from 'near-api-js';
import * as React from 'react'
import AccountDetails from '../domain/AccountDetails';
import { defaultAccount } from '../domain/AccountDetails';

const AuthContext = React.createContext({
    signIn: () => Promise.resolve(defaultAccount),
    signOut: () => {},
    contract: null as Contract | null,
    accountDetails: {} as AccountDetails | null,
})

export default AuthContext
