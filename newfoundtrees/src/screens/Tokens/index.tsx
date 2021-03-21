import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import TreeCard from '../../components/TreeCard'
import TitledMegaCard from '../../components/TitledMegaCard'
import getTokens from '../../outbound/tokenClient'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: '200vh',
            // width: '100vw',
            marginTop: theme.spacing(10),
            // marginLeft: '20pc',
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
                    <Typography
                        variant="h4"
                        style={{ textAlign: 'left', paddingBottom: 20 }}
                    >
                        🌲 NFT
                    </Typography>
                    <div className={classes.row}>
                        <TitledMegaCard
                            title="Throw your money at some trees"
                            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
                                        color="secondary"
                                        href="/map"
                                    >
                                        🗺️ View on map
                                    </Button>
                                </>
                            }
                        />
                        <TreeCard token={listedProjects[0]}/>
                        <TreeCard token={listedProjects[1]}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tokens
