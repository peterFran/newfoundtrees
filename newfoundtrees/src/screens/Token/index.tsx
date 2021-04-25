import * as React from 'react'

import { Button, makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { Token } from '../../domain/Token'
import TreeCardGrid from '../../components/TreeCardGrid'
import PurchaseMegaCard from '../../components/PurchaseMegaCard'
// import { Wallet, Network, Chain } from 'mintbase'
// import getTokens from '../../outbound/tokenClient'
import IDMegaCard from '../../components/IDMegaCard'


const useStyles = makeStyles((theme) => {
    return {
        container: {
            // marginTop: theme.spacing(5),
            // paddingTop: theme.spacing(2),
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

const TokenPage = ({ token }: { token: Token }) => {
    const classes = useStyles()

    // const minty = new Wallet({ networkName: 'testnet' as Network, chain: 'near' as Chain })

    // React.useEffect(() => {
    //     minty.api.fetchMarketplace(10, 0).then(stuff => {
    //         console.log(stuff)
    //     })

    // }, [minty.api])

    return (
        <>
            <Helmet>
                <title>Tokens</title>
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
                    <Button variant="contained" color="primary" href="/sell">
                        💰 Sell Token
                    </Button>
                </div>
            )}
        </>
    )
}

export default TokenPage
