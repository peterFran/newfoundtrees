import './App.css'
import { WalletAccount } from 'near-api-js'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import { near, nearConfig } from './components/NearConfig'
import Projects from './screens/Projects'
import Tokens from './screens/Tokens'
import AuthContext from './context/AuthContext'
import Home from './screens/Home/index';
import AccountDetails, { normaliseBalance } from './domain/AccountDetails';

const scrollTop = () => {
    window.scrollTo(0, 0)
}
const App = () => {
    
    const wallet = React.useMemo(() => new WalletAccount(near, null), [])

    const [accountDetails, setAccountDetails] = React.useState<AccountDetails | null>(null)

    const authContext = React.useMemo(
        () => ({
            signIn: async (): Promise<string> => {
                return wallet
                    .requestSignIn(nearConfig.contract, 'Log in to account')
                    .then(() => {
                        wallet
                            .account()
                            .getAccountBalance()
                            .then((balance) => {
                                setAccountDetails({
                                    balance: normaliseBalance({balance: balance}),
                                    accountId: wallet.getAccountId(),
                                })
                                return Promise.resolve('Success')
                            })
                            .catch((err) => {
                                return Promise.reject(err)
                            })
                        return Promise.resolve('Success')
                    })
                    .catch((err) => {
                        return Promise.reject(err || 'fail')
                    })
            },
            signOut: () => {
                wallet.signOut()
                setAccountDetails(null)
            },
            accountDetails: null,
        }),
        [wallet]
    )

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            if (wallet.isSignedIn()) {
                wallet
                    .account()
                    .getAccountBalance()
                    .then((balance) => {
                        setAccountDetails({
                            balance: normaliseBalance({balance: balance}),
                            accountId: wallet.getAccountId(),
                        })
                        return Promise.resolve('Success')
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
                return Promise.resolve('Success')
            } else {
                setAccountDetails(null)
            }
        }
        bootstrapAsync()
    }, [wallet])

    return (
        <div className="App">
            <AuthContext.Provider
                value={{
                    signIn: authContext.signIn,
                    signOut: authContext.signOut,
                    accountDetails: accountDetails,
                }}
            >
                <Helmet
                    defaultTitle="New Found Trees"
                    titleTemplate="%s | New Found Trees"
                />
                <Navigation loggedIn={accountDetails != null} />
                
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route path="/projects" preload={scrollTop}>
                        <Projects />
                    </Route>
                    {accountDetails && (
                        <Route path="/tokens" preload={scrollTop}>
                            <Tokens />
                        </Route>
                    )}
                </Switch>
            </AuthContext.Provider>
        </div>
    )
}

export default App
