import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { fetchUsersTokens, LIST_USERS_TOKENS_QUERY, StoreData, UserVars } from '../../outbound/tokenClient'
import TreeCardGrid from '../../components/TreeCardGrid'
import { TreeCardItem } from '../../components/TreeCard'
import { NewFoundToken } from '../../domain/Token';
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
        },
        contentWrap: {
            display: 'flex',
            height: '100%',
            flex: 1,
            paddingBottom: theme.spacing(20),
            justifyContent: 'flex-start',
            alignItems: 'space-between',
            flexDirection: 'column',
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
    const [availableTokens, setAvailableTokens] = React.useState<NewFoundToken[]>([])

    const { wallet, accountDetails } = React.useContext(AuthContext)

    const { loading, data } = useQuery<StoreData, UserVars>(
        LIST_USERS_TOKENS_QUERY,
        {
            variables: {
                store: process.env.REACT_APP_MINTBASE_STORE_NAME || '',
                user: accountDetails?.accountId || ''
            },
        }
    )
    React.useEffect(() => {

        if(!loading && data?.store && data.store.length > 0){
            fetchUsersTokens(data.store[0].things).then((tokens) => setAvailableTokens(tokens))
        }
    }, [loading, data, wallet])

    return (
        <>
            <Helmet>
                <title>Tokens</title>
            </Helmet>

            <div className={classes.container}>
                <div className={classes.contentWrap}>

                    <TreeCardGrid title="">
                        <>
                            {!loading && availableTokens.map((thing: NewFoundToken) => {
                                    return <TreeCardItem token={thing} key={thing.id} />
                                })}
                        </>
                    </TreeCardGrid>
                </div>
            </div>
        </>
    )
}

export default WalletScreen
