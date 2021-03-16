import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import HeroBanner from '../../components/HeroBanner'
import InfoBanner from '../../components/InfoBanner'
import treeGif from '../../assets/pixil-gif-drawing.gif'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: '200vh',
            width: '100vw',
            scrollBehavior: 'smooth',
        },
        heroWrap: {
            display: 'flex',
            paddingTop: 100,
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentWrap: {
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        mapContainer: {
            height: '100vh',
            width: '100vw',
            backgroundColor: '#eee',
        },
        text: {
            fontFamily: 'Montserrat',
            fontSize: '2em',
            paddingBottom: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
            },
        },
        heroGif: {
            width: '10pc',
            height: 'auto',
            opacity: 0.5
        },
    }
})

const Home = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div style={{position: 'absolute',  left: 0, bottom: 0}}>
                    <img
                        className={classes.heroGif}
                        src={treeGif}
                        alt="trees!"
                    />
            </div>
            <div style={{position: 'absolute',  left: 0, top: 0}}>
                    <img
                        className={classes.heroGif}
                        src={treeGif}
                        alt="trees!"
                    />
            </div>
            <div style={{position: 'absolute',  right: 0, bottom: 0}}>
                    <img
                        className={classes.heroGif}
                        src={treeGif}
                        alt="trees!"
                    />
            </div>
            <div style={{position: 'absolute',  right: 0, top: 0}}>
                    <img
                        className={classes.heroGif}
                        src={treeGif}
                        alt="trees!"
                    />
            </div>

            <div className={classes.container}>
                <div className={classes.heroWrap}>
                    <HeroBanner
                        image="leaves.jpg"
                        title="Select, Collect, Protect"
                    >
                        <div className={classes.text}>
                            <p>
                                Discover impactful projects around the world.
                                <br />
                                Purchase tokens to fund invaluable work.
                                <br />
                                As the projects progress, receive updates and
                                see your impact grow.
                            </p>
                        </div>
                    </HeroBanner>
                </div>
                <div className={classes.contentWrap}>
                    <InfoBanner>
                        <div>
                            <div className={classes.text}>
                                <div>
                                    <span style={{ fontSize: 40 }}>🌏</span>
                                    <p>
                                        Explore our map to discover projects
                                        around the globe.
                                    </p>
                                </div>
                                <br />
                                <div>
                                    <span style={{ fontSize: 40 }}>💸</span>
                                    <p>
                                        Buy NFTs with NEAR tokens, and use the
                                        power of the blockchain to see exactly
                                        where your money goes.
                                    </p>
                                </div>
                                <br />
                                <div>
                                    <span style={{ fontSize: 40 }}>✉️</span>
                                    <p>
                                        Projects will send you updates if you
                                        own their NFT, so you can see the impact
                                        your contribution is making.
                                    </p>
                                </div>
                            </div>
                            <br />

                            <Button
                                component={Link}
                                to="/projects"
                                variant="contained"
                                color="primary"
                            >
                                Take me to the map!
                            </Button>
                        </div>
                    </InfoBanner>
                </div>
            </div>
        </>
    )
}

export default Home
