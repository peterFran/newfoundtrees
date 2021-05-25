import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import {
    fetchUsersTokens,
    LIST_USERS_TOKENS_QUERY,
    StoreData,
    UserVars,
} from '../../outbound/tokenClient'
import TreeCardGrid from '../../components/TreeCardGrid'
import { TreeCardItemBigger } from '../../components/TreeCard'
import { NewFoundToken } from '../../domain/Token'
import { useQuery } from '@apollo/client'
import AuthContext from '../../context/AuthContext'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            marginTop: theme.spacing(5),
            paddingTop: theme.spacing(4),
            display: 'flex',
            height: '100%',

            alignItems: 'flex-start',
            scrollBehavior: 'smooth',
            overflow: 'visible',
        },
        contentWrap: {
            display: 'flex',
            height: '100%',
            width: '100%',
            flex: 1,
            paddingBottom: theme.spacing(20),
            marginRight: -theme.spacing(40),
            justifyContent: 'flex-start',
            alignItems: 'space-between',
            flexDirection: 'row',
        },

        row: {
            marginLeft: -theme.spacing(2),
            marginRight: -theme.spacing(2),
            display: 'flex',
            maxHeight: 500,
            flex: 1,
            overflow: 'hidden',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            flexDirection: 'row',
        },

        veil: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '20%',
            height: '100%',
            pointerEvents: 'none',
            background: `linear-gradient(to right, transparent 0%,  ${theme.palette.primary.dark} 100%)` /* W3C */,
        },

        heroGif: {
            width: '10pc',
            height: 'auto',
            opacity: 0.5,
        },

        sellBanner: {
            display: 'flex',
            width: '100vw',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: theme.palette.primary.dark,
            opacity: 1,
            zIndex: 3,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
        },
    }
})

const WalletScreen = () => {
    const classes = useStyles()
    const [availableTokens, setAvailableTokens] = React.useState<
        NewFoundToken[]
    >([])

    const { wallet, accountDetails } = React.useContext(AuthContext)

    const { loading, data } = useQuery<StoreData, UserVars>(
        LIST_USERS_TOKENS_QUERY,
        {
            variables: {
                store: process.env.REACT_APP_MINTBASE_STORE_NAME || '',
                user: accountDetails?.accountId || '',
            },
        }
    )
    React.useEffect(() => {
        if (!loading && data?.store && data.store.length > 0) {
            fetchUsersTokens(data.store[0].things).then((tokens) =>
                setAvailableTokens(tokens)
            )
        }
    }, [loading, data, wallet])

    return (
        <>
            <Helmet>
                <title>Tokens</title>
            </Helmet>
            <div className={classes.veil}></div>
            <div className={classes.container}>
                <div className={classes.contentWrap}>

                    <div style={{width: '80%', marginRight: 50,}}>
                        <div
                            style={{
                                height: 500,
                                
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{
                                        
                                        padding: 40
                                    }}>
                                <Typography
                                    variant="h1"
                                    color="secondary"
                                    align="left"
                                >
                                    Wallet
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="h5"
                                    align="left"
                                    style={{
                                        color: 'white',
                                        textTransform: 'none',
                                        padding: 40
                                    }}
                                >
                                    Your investment into vital projects can make
                                    a huge impact on our ability to fight
                                    climate change and restore our natural
                                    world. So far, you've invested in:
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="h1"
                                    align="center"
                                    style={{
                                        color: 'white',
                                        textTransform: 'none',
                                    }}
                                >
                                    {availableTokens.length}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    style={{
                                        color: 'white',
                                        textTransform: 'none',
                                    }}
                                >
                                    NewFoundTrees
                                </Typography>
                            </div>
                            <div style={{ padding: 50 }}></div>
                        </div>
                    {/* </PlainMegaCard> */}
                    </div>
                    <TreeCardGrid title="">
                        <>
                            {!loading &&
                                availableTokens.map((thing: NewFoundToken) => {
                                    return (
                                        <TreeCardItemBigger
                                            token={thing}
                                            key={thing.id}
                                        />
                                    )
                                })}
                        </>
                    </TreeCardGrid>
                </div>
            </div>
        </>
    )
}

export default WalletScreen
