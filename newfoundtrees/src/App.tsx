import { Container, useTheme } from '@material-ui/core'
import { Wallet } from 'mintbase'
import { WalletConfig } from 'mintbase/lib/types'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch, useLocation } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import tree from './assets/tokensBackground.png'
import { mintbaseConfig } from './components/NearConfig'
import AuthContext from './context/AuthContext'
import AccountDetails from './domain/AccountDetails'
import Home from './screens/About/index'
import Empty from './screens/Empty'
import Projects from './screens/Map'
import TokenPage from './screens/Token'
import Tokens from './screens/Tokens'
import WalletScreen from './screens/Wallet'

const App = () => {
    const location = useLocation()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [wallet, setWallet] = useState<Wallet | null>(null)

    useEffect(() => {
        initWallet()
    }, [])

    const [
        accountDetails,
        setAccountDetails,
    ] = React.useState<AccountDetails | null>(null)

    const initWallet = async () => {
        const { data: walletData, error } = await new Wallet().init(
            mintbaseConfig as WalletConfig
        )

        if (error) return

        const { wallet, isConnected } = walletData

        if (isConnected) {
            try {
                const { data: details } = await wallet.details()

                setAccountDetails(details)
            } catch (error) {
                console.log(error)
            }
        }

        setWallet(wallet)
        setIsLoggedIn(isConnected)
    }

    useEffect(() => {
        if (!wallet) return
        wallet.details().then(({ data: details }) => {
            setAccountDetails(details as AccountDetails)
        })
    }, [wallet])

    const authContext = React.useMemo(
        () => ({
            wallet: wallet,
            signIn: async () => {
                if (!wallet) return
                wallet.connect({ requestSignIn: true })
            },
            signOut: () => {
                wallet?.disconnect()
                setAccountDetails(null)
            },
            accountDetails: accountDetails,
        }),
        [wallet, accountDetails]
    )

    const theme = useTheme()
    return (
        <div
            className="App"
            style={
                location.pathname === '/about'
                    ? {
                          backgroundColor: theme.palette.primary.dark,
                          background: `linear-gradient(to bottom, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 55%, #000000 55%,${theme.palette.primary.light} 55%,${theme.palette.primary.light} 100%)` /* W3C */,
                          overflow: 'hidden',
                      }
                    : location.pathname === '/tokens' || location.pathname === '/' ? {
                        backgroundImage: `url(${tree})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPositionX: 'right -60px',
                        backgroundPositionY: '150px',
                        overflow: 'hidden' 
                    } 
                    : location.pathname === '/art' || location.pathname === '/' ? {
                        backgroundColor: theme.palette.primary.dark
                    } 
                    : { overflow: 'hidden' }
            }
        >
            <AuthContext.Provider
                value={{
                    wallet: wallet,
                    signIn: authContext.signIn,
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

                        <Route path="/art">
                            <WalletScreen />
                        </Route>

                        <Route
                            path="/token/:id"
                            render={(
                                props
                            ): {
                                props: { match: { params: { id: number } } }
                            } => {
                                return <TokenPage id={props.match.params.id} />
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
