import { Container, useTheme } from '@material-ui/core'
import { Contract, WalletAccount } from 'near-api-js'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch, useLocation } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import { near, nearConfig } from './components/NearConfig'
import AuthContext from './context/AuthContext'
import AccountDetails from './domain/AccountDetails'
import getTokens from './outbound/tokenClient'
import { getAccountDetails, signIn } from './outbound/walletClient'
import Home from './screens/About/index'
import Empty from './screens/Empty'
import Projects from './screens/Map'
import TokenPage from './screens/Token'
import Tokens from './screens/Tokens'


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

    const theme = useTheme()
    return (
        <div
            className="App"
            style={
                location.pathname === '/about'
                    ? {
                          backgroundColor: theme.palette.primary.dark,
                          background: `linear-gradient(to bottom, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 55%, #000000 55%,${theme.palette.primary.light} 55%,${theme.palette.primary.light} 100%)`, /* W3C */
                          overflow: 'hidden',
                      }
                    : { overflow: 'hidden' }
            }
        >
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
                <Container
                    maxWidth="lg"
                    style={
                        location.pathname !== '/map'
                            ? { display: 'block' }
                            : { display: 'flex' }
                    }
                >
                    <Navigation loggedIn={accountDetails != null} />
                    <Switch>
                        <Route exact path="/">
                            <Tokens />
                        </Route>

                        <Route exact path="/about">
                            <Home />
                        </Route>

                        <Route path="/map">
                            <Projects />
                        </Route>

                        <Route
                            path="/token/:id"
                            render={(
                                props
                            ): {
                                props: { match: { params: { id: number } } }
                            } => {
                                const token = getTokens().find(
                                    (token) =>
                                        `${token.id}` === props.match.params.id
                                )
                                if (token) return <TokenPage token={token} />
                                else return <Empty />
                            }}
                        />

                        <Route path="*" exact={true}>
                            <Empty />
                        </Route>
                    </Switch>
                </Container>
            </AuthContext.Provider>
        </div>
    )
}

export default App
