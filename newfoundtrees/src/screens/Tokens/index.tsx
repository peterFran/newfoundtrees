import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import TreeCard from '../../components/TreeCard'
import TitledMegaCard from '../../components/TitledMegaCard'
import getTokens from '../../outbound/tokenClient'
import TreeCardGrid from '../../components/TreeCardGrid'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            marginTop: theme.spacing(5),
            paddingBottom: theme.spacing(20),
            paddingTop: theme.spacing(4),
            display: 'flex',
            alignItems: 'flex-start',
            scrollBehavior: 'smooth',
        },
        contentWrap: {
            display: 'flex',
            height: '100vh',
            flex: 1,

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
    }
})

const Tokens = () => {
    const classes = useStyles()

    const listedProjects = getTokens()

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
                        <TreeCard token={listedProjects[0]} />
                        <TreeCard token={listedProjects[1]} />
                    </TreeCardGrid>

                    <TreeCardGrid title="🌲 FUNDABLE INITIATIVES">
                        <>
                            <TreeCard token={listedProjects[0]} />
                            <TreeCard token={listedProjects[1]} />
                            <TreeCard token={listedProjects[2]} />
                            <TreeCard token={listedProjects[0]} />
                        </>
                    </TreeCardGrid>
                </div>
            </div>
        </>
    )
}

export default Tokens
