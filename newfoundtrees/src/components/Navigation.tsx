import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AuthContext from '../context/AuthContext'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SafeIcon from '@material-ui/icons/AccountBalance'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography, withStyles, useTheme } from '@material-ui/core';
import AccountDetails from '../domain/AccountDetails'
import LinkIcon from '@material-ui/icons/Link'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const LABELS = {
    tokens: 'Tokens',
    map: 'Map',
    art: 'Art',
    about: 'About',
}

const useNavItemStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100pc',
        flex: 1,
        pointerEvents: 'all',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        // marginLeft: theme.spacing(3),
        // marginRight: theme.spacing(3),
        fontSize: 12,
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,

            '& .nav-icon': {
                display: 'block',
            },
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2),
            width: '100%',
            '@media (min-height: 700px)': {
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
            },
        },
    },
    iconRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // marginLeft: theme.spacing(3),
        // marginRight: theme.spacing(3),
        fontSize: 12,
        color: theme.palette.text.secondary,
        '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,

            '& .nav-icon': {
                display: 'block',
            },
        },
    },
    icon: {
        display: 'flex',
        width: 28,
        height: 28,
    },
    label: {
        marginTop: theme.spacing(1),
        lineHeight: 1,
        color: theme.palette.secondary.dark,
        fontSize: 17,
        fontWeight: 50,
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
    },
    title: {
        lineHeight: 1,
        fontFamily: 'Teko',
        fontWeight: 700,
        fontSize: 25,
        paddingTop: theme.spacing(4),
        color: 'rgba(255, 255, 255)',
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
    },
}))

interface NavItemProps {
    as?: typeof NavLink
    name: 'tokens' | 'about' | 'map' | 'art'
    to: '/tokens' | '/' | '/map' | '/art'
    white: boolean
}

const NavItem = ({ as: Comp = NavLink, name, to, white }: NavItemProps) => {
    const classes = useNavItemStyles()

    return (
        <Comp className={classes.root} {...{ to }}>
            <div className={classes.label}>
                <Typography
                    variant="h5"
                    color={white ? 'textSecondary' : 'primary'}
                >
                    {LABELS[name]}
                </Typography>
            </div>
        </Comp>
    )
}

const StyledMenu = withStyles({
    paper: {
        marginTop: 5,
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
    button: {
        backgroundColor: theme.palette.background.default,
    },
}))(MenuItem)

interface WalletItemProps {
    accountDetails: AccountDetails | null
    signIn: () => void
    signOut: () => void
    white: boolean
}

const WalletItem = ({
    white,
    accountDetails,
    signIn,
    signOut,
}: WalletItemProps) => {
    const classes = useNavItemStyles()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [isSignedIn, setIsSignedIn] = React.useState(false) // Local signed-in state.

    if (firebase.apps.length === 0) {
        const config = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
        }
        firebase.initializeApp(config)
    }

    // Listen to the Firebase Auth state and set the local state.
    React.useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
                setIsSignedIn(!!user)
            })
        return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
    }, [])

    React.useEffect(() => {
        console.log()
        if (
            !!accountDetails &&
            !!firebase.auth().currentUser &&
            !firebase
                .firestore()
                .collection('near-account')
                .doc(`${firebase.auth().currentUser?.uid}`)
                .get()
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
    }, [accountDetails])

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            // Avoid redirects after sign-in.
            // signInSuccessWithAuthResult: () => false,
        },
    }

    return (
        <>
            <div className={classes.root} onClick={handleClick}>
                <div className={classes.label}>
                    <Typography
                        variant="h5"
                        color={white ? 'textSecondary' : 'primary'}
                    >
                        Wallet
                    </Typography>
                </div>
            </div>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {isSignedIn ? (
                    <>
                        <StyledMenuItem>
                            {/* <ListItemIcon>
                                <ArrowBackIcon fontSize="small"  color="primary"/>
                            </ListItemIcon> */}
                            <ListItemText
                                primary={
                                    firebase.auth()?.currentUser?.displayName
                                }
                            />
                        </StyledMenuItem>
                        {accountDetails ? (
                            <>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <LinkIcon
                                            fontSize="small"
                                            color="primary"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${accountDetails.accountId}`}
                                    />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <SafeIcon
                                            fontSize="small"
                                            color="primary"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${accountDetails.balance.available} Ⓝ`}
                                    />
                                </StyledMenuItem>
                            </>
                        ) : (
                            <StyledMenuItem onClick={signIn}>
                                <ListItemIcon>
                                    <SafeIcon
                                        fontSize="small"
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`Link Wallet`} />
                            </StyledMenuItem>
                        )}
                        <StyledMenuItem
                            onClick={() => {
                                signOut()
                                firebase.auth().signOut()
                            }}
                        >
                            <ListItemIcon>
                                <ArrowBackIcon
                                    fontSize="small"
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText primary="LogOut" />
                        </StyledMenuItem>
                    </>
                ) : (
                    <>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </>
                )}
            </StyledMenu>
        </>
    )
}

const TitleItem = ({ white }: { white: boolean }) => {
    const classes = useNavItemStyles()
    const theme = useTheme()

    return (
        <NavLink className={classes.root} to={'/'}>
            <div
                className={classes.title}
                style={white ? { color: theme.palette.text.secondary } : {color: theme.palette.primary.dark }}
            >
                  <Typography
                        variant="h3"
                        color="inherit"
                    >NEWFOUNDTREES</Typography>
                
            </div>
        </NavLink>
    )
}

const useHorizontalStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        backgroundColor: theme.palette.background.paper,
        paddingTop: theme.spacing(5),
        zIndex: 1,
    },
    mapRoot: {
        display: 'flex',
        // position: 'fixed',
        // width: '100pc',
        flex: 1,

        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'space-between',
        pointerEvents: 'none',
        paddingTop: theme.spacing(5),
        zIndex: 5,
    },
    wrapper: {
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: theme.spacing(2),

    },
    pill: {
        borderRadius: 15,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        pointerEvents: 'all',
        display: 'flex',
        color: 'white',
    },
    navList: {
        padding: 0,
        margin: 0,
        display: 'flex',
        listStyle: 'none',
        pointerEvents: 'none',
        justifyContent: 'space-between',
        width: '100%',
    },
    center: {
        alignItems: 'center',
        pointerEvents: 'all',
        marginLeft: theme.spacing(5),
        justifyContent: 'center',
        display: 'flex',
        color: theme.palette.secondary.dark,
    },
}))

const HorizontalNavigation = ({
    white,
    mapView = false,
}: {
    mapView?: boolean
    white: boolean
}) => {
    const { signIn, signOut, accountDetails } = React.useContext(AuthContext)

    const classes = useHorizontalStyles()
    return (
        <>
            <nav
                className={mapView ? classes.mapRoot :classes.root}
            >
                <ul className={classes.navList}>
                    <li>
                        <Link to="/" target="_blank" rel="noopener noreferrer">
                            <TitleItem {...{ white }} />
                        </Link>
                    </li>
                    <div className={classes.wrapper}>
                        {/* <div className={classes.pill}> */}
                            <li className={classes.center}>
                                <WalletItem
                                    {...{
                                        accountDetails,
                                        signIn,
                                        signOut,
                                        white,
                                    }}
                                />
                            </li>
                            <li className={classes.center}>
                                <NavItem
                                    to={`/map`}
                                    name="map"
                                    {...{ white }}
                                />
                            </li>
                            <li className={classes.center}>
                                <NavItem
                                    to={`/tokens`}
                                    name="tokens"
                                    {...{ white }}
                                />
                            </li>
                            <li className={classes.center}>
                                <NavItem
                                    to={`/art`}
                                    name="art"
                                    {...{ white }}
                                />
                            </li>
                            <li className={classes.center}>
                                <NavItem to={`/`} name="about" {...{ white }} />
                            </li>
                        {/* </div> */}
                    </div>
                </ul>
            </nav>
        </>
    )
}

const Navigation = ({ loggedIn = false }: { loggedIn: boolean }) => {
    const location = useLocation()
    return (
        <HorizontalNavigation
            {...{
                loggedIn,
                mapView: location.pathname === '/map',
                white: location.pathname === '/map',
            }}
        />
    )
}

export default Navigation
