import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SafeIcon from '@material-ui/icons/AccountBalance'
import AccountDetails from '../domain/AccountDetails'
import { Button } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import firebase from 'firebase'

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

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 30,
        padding: theme.spacing(2),
        pointerEvents: 'all',
        marginTop: theme.spacing(1),
        lineHeight: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
        fontFamily: 'Arial',
        fontSize: 12,
    },
}))

interface LoginMenuProps {
    accountDetails: AccountDetails | null
    signIn: () => void
    signOut: () => void
}

const LoginMenu = ({ accountDetails, signIn, signOut }: LoginMenuProps) => {
    const classes = useStyles()
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
        console.log(

        )
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
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                size="medium"
                variant="text"
                className={classes.button}
                onClick={handleClick}
            >
                Wallet
            </Button>
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
                            <ListItemIcon>
                                <ArrowBackIcon fontSize="small" />
                            </ListItemIcon>
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
                                        <LinkIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${accountDetails.accountId}`}
                                    />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <SafeIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${accountDetails.balance.available} Ⓝ`}
                                    />
                                </StyledMenuItem>
                            </>
                        ) : (
                            <StyledMenuItem onClick={signIn}>
                                <ListItemIcon>
                                    <SafeIcon fontSize="small" />
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
                                <ArrowBackIcon fontSize="small" />
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
        </div>
    )
}

export default LoginMenu
