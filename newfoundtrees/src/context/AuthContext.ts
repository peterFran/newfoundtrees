import { Wallet } from 'mintbase';
import * as React from 'react'
import AccountDetails from '../domain/AccountDetails';

const AuthContext = React.createContext({
    wallet: {} as Wallet | null,
    signIn: ({request=true}:{request:boolean, accountId?: string}) => {},
    signOut: () => {},
    accountDetails: {} as AccountDetails | null,
    isNearLoggedIn: false as boolean,
    isOAuthLoggedIn: false as boolean
})

export default AuthContext
