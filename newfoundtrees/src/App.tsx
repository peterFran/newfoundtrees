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
import { performLogin } from './outbound/login'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const App = () => {
    const location = useLocation()

    const [isNearLoggedIn, setIsNearLoggedIn] = useState(false)
    const [isOAuthLoggedIn, setIsOAuthLoggedIn] = useState(false)
    const [wallet, setWallet] = useState<Wallet | null>(null)
    const [loginRejected, setLoginRejected] = useState(false)
    const [attempts, setAttempts] = useState<number>(0)

    useEffect(() => {
        initWallet()
    }, [])

    const [
        accountDetails,
        setAccountDetails,
    ] = React.useState<AccountDetails | null>(null)

    const initWallet = async (): Promise<Wallet> => {
        const { data: walletData, error } = await new Wallet().init(
            mintbaseConfig as WalletConfig
        )

        if (error) throw error

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
        setIsNearLoggedIn(isConnected)
        return wallet
    }

    const handleLogin = async (request: boolean, accountId?: string) => {
        if (!wallet) {
            await initWallet().then(async (w) => performLogin(w, request).then((details)=> setAccountDetails(details)).catch(() => setLoginRejected(true)))
        } else {
            performLogin(wallet, request).then((details) => setAccountDetails(details)).catch(() => {
                setLoginRejected(true)})
        }
    }

    if (firebase.apps.length === 0) {
        const config = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
        }
        firebase.initializeApp(config)
    }

    React.useEffect(() => {
        const setFirestoreId = async () => {

            const fired = await firebase
                .firestore()
                .collection('near-account')
                .doc(`${firebase.auth().currentUser?.uid}`)
                .get()

            if (
                !!accountDetails?.accountId &&
                !!firebase.auth().currentUser && (!fired.data()?.id || fired.data()?.id !== accountDetails?.accountId)
                
            ) {
                firebase
                    .firestore()
                    .collection('near-account')
                    .doc(`${firebase.auth().currentUser?.uid}`)
                    .set({
                        id: accountDetails.accountId,
                    })
                    .then((res) => {
                        console.log(res)
                    })
            }
        }
        setFirestoreId()


    }, [accountDetails])

    // Listen to the Firebase Auth state and set the local state.
    React.useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
                setIsOAuthLoggedIn(!!user)
            })
        return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
    }, [])

    useEffect(() => {
        setAttempts(attempts + 1)
        console.log(attempts)
        if (wallet && isOAuthLoggedIn && !loginRejected && attempts === 1) {
            if(!wallet.activeAccount){
                performLogin(wallet, true).then((details) => setAccountDetails(details))
            }
        }
    }, [wallet, isOAuthLoggedIn])

    const authContext = React.useMemo(
        () => ({
            wallet: wallet,
            signIn: async ({
                request,
                accountId,
            }: {
                request: boolean
                accountId?: string
            }) => {
                handleLogin(request, accountId)
            },
            signOut: () => {
                wallet?.disconnect()
                setAttempts(0)
                setAccountDetails(null)
                setIsNearLoggedIn(false)
            },
            accountDetails: accountDetails,
            isNearLoggedIn: isNearLoggedIn,
        }),
        [wallet, accountDetails, isNearLoggedIn]
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
                    : location.pathname === '/tokens' ||
                      location.pathname === '/'
                    ? {
                          backgroundImage: `url(${tree})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPositionX: 'right -60px',
                          backgroundPositionY: '150px',
                          overflow: 'hidden',
                          minHeight: '100vh',

                      }
                    : location.pathname === '/art' || location.pathname === '/'
                    ? {
                          backgroundColor: theme.palette.primary.dark,
                          overflow: 'hidden',
                          minHeight: '100vh',
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
                    isOAuthLoggedIn: isOAuthLoggedIn,
                    isNearLoggedIn: isNearLoggedIn,
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
