import * as React from 'react'
import AccountDetails from '../domain/AccountDetails'

const AuthContext = React.createContext({
    signIn: () => Promise.resolve(''),
    signOut: () => {},
    accountDetails: {} as AccountDetails | null,
})

export default AuthContext
