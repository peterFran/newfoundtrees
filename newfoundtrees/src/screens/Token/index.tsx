import * as React from 'react'

import { Button, makeStyles } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { NewFoundToken, Thing } from '../../domain/Token'
import TreeCardGrid from '../../components/TreeCardGrid'
import PurchaseMegaCard from '../../components/PurchaseMegaCard'
import IDMegaCard from '../../components/IDMegaCard'
import { getToken, GET_TOKEN_QUERY } from '../../outbound/tokenClient'
import { useQuery } from '@apollo/client'
import Empty from '../Empty'
import AuthContext from '../../context/AuthContext'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            display: 'flex',
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
interface ThingData {
    thing: Thing[]
}

interface ThingVars {
    thingId: string
}

const TokenPage = ({ id }: { id: string }) => {
    const classes = useStyles()

    const { accountDetails, wallet } = React.useContext(AuthContext)

    React.useEffect(() => {
        console.log(accountDetails)
    }, [accountDetails])

    const { data, error } = useQuery<ThingData, ThingVars>(GET_TOKEN_QUERY, {
        variables: { thingId: id },
    })

    const [token, setToken] = React.useState<NewFoundToken>()

    React.useEffect(() => {
        if (data?.thing && data.thing.length > 0) {
            getToken(data.thing[0]).then((it) => {
                setToken(it)
            })
        }
    }, [data, wallet])

    return (
        <>
            {error ? (
                <Empty />
            ) : (
                token && (
                    <>
                        <Helmet>
                            <title>Token</title>
                        </Helmet>
                        <div className={classes.container}>
                            <div className={classes.contentWrap}>
                                <TreeCardGrid title="🌲 NFT" reverse={true}>
                                    <PurchaseMegaCard token={token} />
                                    <IDMegaCard token={token} />
                                </TreeCardGrid>
                            </div>
                        </div>
                        {token.ownedEditions.length > 0 && (
                            <div className={classes.sellBanner}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href="/sell"
                                >
                                    💰 Sell Token
                                </Button>
                            </div>
                        )}
                    </>
                )
            )}
        </>
    )
}

export default TokenPage
