import { Wallet } from 'mintbase';
import * as React from 'react'
import AccountDetails from '../domain/AccountDetails';

const AuthContext = React.createContext({
    wallet: {} as Wallet | null,
    signIn: () => {},
    signOut: () => {},
    accountDetails: {} as AccountDetails | null,
})

export default AuthContext
