import './App.css'
import { WalletAccount, Contract } from 'near-api-js'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, useLocation } from 'react-router-dom';

import Navigation from './components/Navigation'
import { near, nearConfig } from './components/NearConfig'
import Projects from './screens/Projects'
import AuthContext from './context/AuthContext'
import Home from './screens/Home/index'
import AccountDetails from './domain/AccountDetails'
import { getAccountDetails, signIn } from './outbound/walletClient'

const scrollTop = () => {
    window.scrollTo(0, 0)
}
const App = () => {
    const location = useLocation()

    const wallet = React.useMemo(() => new WalletAccount(near, null), [])
    const [
        accountDetails,
        setAccountDetails,
    ] = React.useState<AccountDetails | null>(null)

    const [contract, setContract] = React.useState<Contract | null>(null)

    const authContext = React.useMemo(
        () => ({
            signIn: async (): Promise<AccountDetails> => {
                return signIn(nearConfig.contract, wallet).then(
                    (accountDetails) => {
                        setAccountDetails(accountDetails)
                        setContract(
                            new Contract(
                                wallet.account(),
                                nearConfig.contract,
                                {
                                    viewMethods: [],
                                    changeMethods: [],
                                }
                            )
                        )
                        return accountDetails
                    }
                )
            },
            signOut: () => {
                wallet.signOut()
                setAccountDetails(null)
            },
            contract: null,
            accountDetails: null,
        }),
        [wallet]
    )

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            if (wallet.isSignedIn()) {
                getAccountDetails(wallet).then((accountDetails) => {
                    setAccountDetails(accountDetails)
                    setContract(
                        new Contract(wallet.account(), nearConfig.contract, {
                            viewMethods: ['query'],
                            changeMethods: [],
                        })
                    )
                    return accountDetails
                })
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
                    contract: contract,
                    signOut: authContext.signOut,
                    accountDetails: accountDetails,
                }}
            >
                <Helmet
                    defaultTitle="New Found Trees"
                    titleTemplate="%s | New Found Trees"
                />
                {location.pathname !== '/' && (
                    <Navigation loggedIn={accountDetails != null} />
                )}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/projects" preload={scrollTop}>
                        <Projects />
                    </Route>
                </Switch>
            </AuthContext.Provider>
        </div>
    )
}

export default App
