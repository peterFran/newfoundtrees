import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import TitledMegaCard from '../../components/TitledMegaCard'
import { LIST_TOKENS_QUERY, StoreData, StoreVars } from '../../outbound/tokenClient'
import TreeCardGrid from '../../components/TreeCardGrid'
import { TreeCardItem, TreeCardItemMeta } from '../../components/TreeCard'
import { Store, Thing } from '../../domain/Token'
import { useQuery } from '@apollo/client'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            marginTop: theme.spacing(5),
            paddingTop: theme.spacing(4),
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

const Tokens = () => {
    const classes = useStyles()

    const { loading, data } = useQuery<StoreData, StoreVars>(
        LIST_TOKENS_QUERY,
        {
            variables: {
                store: process.env.REACT_APP_MINTBASE_STORE_NAME || '',
            },
        }
    )

    React.useEffect(() => {
        console.log(`lalala ${loading}`)
        console.log(data?.store[0]?.things || 'DAMN')
    }, [loading])

    return (
        <>
            <Helmet>
                <title>Tokens</title>
            </Helmet>

            <div className={classes.container}>
                <div className={classes.contentWrap}>
                    <TreeCardGrid title="🌲 NFT">
                        <TitledMegaCard
                            title="Throw your money at some trees"
                            body={`Are you dying to show your friends some cool NFTs, but also want to protect and grow our forests and rewild the plannet? We got you covered fam.`}
                            footer={
                                <>
                                    <Typography
                                        variant="h6"
                                        style={{ color: 'white' }}
                                    >
                                        NFT Projects Across The World
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href="/map"
                                    >
                                        🗺️ View on map
                                    </Button>
                                </>
                            }
                        />
                        {!loading &&
                            data?.store[0] &&
                            data.store[0].things.map((thing: Thing) => {
                                return <TreeCardItemMeta thing={thing} />
                            })}
                    </TreeCardGrid>

                    <TreeCardGrid title="🌲 FUNDABLE INITIATIVES">
                        <>
                            {!loading &&
                                data?.store[0] &&
                                data.store[0].things.map((thing: Thing) => {
                                    return <TreeCardItemMeta thing={thing} />
                                })}
                        </>
                    </TreeCardGrid>
                </div>
            </div>
        </>
    )
}

export default Tokens
