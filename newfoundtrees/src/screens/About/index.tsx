import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import PlainMegaCard from '../../components/PlainMegaCard'
import TreeCardGrid from '../../components/TreeCardGrid'
import trees from '../../assets/trees.png'
import bigTrees from '../../assets/bigTrees.png'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: '100%',
            scrollBehavior: 'smooth',
            overflow: 'visible',
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(8),
            },
        },
        box: {
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(8),
            },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        sphere: {
            position: 'absolute',
            top: '50%',
            right: '0%',
            height: '300px',
            width: '300px',
            opacity: 0.5,
            transform: 'translateY(-150px)',
            [theme.breakpoints.up('md')]: {
                left: '325px',
            },
            borderRadius: '50%',
            zIndex: 1,
            backgroundColor: theme.palette.secondary.light,
        },
        header: {
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
        },
        offsetText: {
            [theme.breakpoints.up('md')]: {
                paddingLeft: theme.spacing(18),
                marginTop: theme.spacing(8),
            },
            paddingLeft: theme.spacing(4),
            marginTop: theme.spacing(2),
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'left',
            flex: 1,
        },
        lowerText: {
            [theme.breakpoints.up('md')]: {
                paddingLeft: theme.spacing(8),
                padding: theme.spacing(20),
                textAlign: 'left',
            },
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
            paddingBottom: theme.spacing(30),
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center',
            flex: 1,
        },
        title: {
            color: theme.palette.secondary.main,
            marginLeft: -theme.spacing(4),
        },
        nftree: {
            color: theme.palette.secondary.main,
            textAlign: 'left',
            alignItems: 'flex-start',
        },
        text: {
            fontSize: '48',
            color: theme.palette.secondary.main,
        },
        pictureWrap: {
            width: '100%',
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                justifyContent: 'flex-start',
            },
            justifyContent: 'center',
        },
        bigPictureWrap: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }
    }
})

const About = () => {
    const styles = useStyles()

    return (
        <>
            <Helmet>
                <title>About</title>
            </Helmet>

            <div className={styles.container}>
                <TreeCardGrid title="">
                    <PlainMegaCard border={false} small={true}>
                        <div className={styles.box}>
                            <div className={styles.header}>
                                <Typography
                                    variant="h1"
                                    style={{ textTransform: 'capitalize' }}
                                    className={styles.title}
                                >
                                    Select, Collect, Protect
                                </Typography>
                            </div>
                            <div className={styles.offsetText}>
                                <Typography
                                    variant="h5"
                                    style={{ textTransform: 'none' }}
                                >
                                    🌎
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        textTransform: 'none',
                                        color: 'white',
                                    }}
                                >
                                    Discover impactful projects around the
                                    world.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        textTransform: 'none',
                                        color: 'white',
                                    }}
                                >
                                    Purchase tokens to fund invaluable work.{' '}
                                    <br />
                                    As the projects progress, receive updates
                                    and <br />
                                    see your impact grow.
                                </Typography>

                                <div
                                    style={{ width: '50%', marginTop: '10px' }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href="/map"
                                    >
                                        🗺 VIEW ON MAP
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PlainMegaCard>

                    <PlainMegaCard border={false} small={true} overflow={true}>
                        <div
                                                        className={styles.pictureWrap}

                        >
                            <img
                                src={trees}
                                alt="forest"
                                style={{ height: '100%' }}
                            />
                            <div className={styles.sphere} />
                        </div>
                    </PlainMegaCard>
                </TreeCardGrid>
                <TreeCardGrid title="">
                    <PlainMegaCard border={false} overflow={false}>
                        <div
                            className={styles.bigPictureWrap}
                        >
                            <img
                                src={bigTrees}
                                alt="forest"
                                style={{ height: '100%' }}
                            />
                            <div
                                style={{
                                    width: '100%',
                                    position: 'absolute',
                                    top: '20%',
                                    bottom: '50%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    style={{
                                        textTransform: 'capitalize',
                                        fontSize: 184,
                                        opacity: 0.8,
                                    }}
                                    className={styles.nftree}
                                >
                                    NF
                                    <br />
                                    TREE
                                </Typography>
                            </div>
                        </div>
                    </PlainMegaCard>

                    <PlainMegaCard border={false}>
                        <div className={styles.box}>
                            <div className={styles.lowerText}>
                                <Typography
                                    variant="h5"
                                    style={{
                                        textTransform: 'none',
                                        color: 'black',
                                    }}
                                >
                                    🌎
                                    <br />
                                    Explore our map to discover projects around
                                    the globe.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        textTransform: 'none',
                                        color: 'black',
                                    }}
                                >
                                    💸
                                    <br />
                                    Discover impactful projects around the
                                    world.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        textTransform: 'none',
                                        color: 'black',
                                    }}
                                >
                                    ✉️
                                    <br />
                                    Projects will send you updates if you own
                                    their NFT, so you can see the impact your
                                    contribution is making.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        textTransform: 'none',
                                        color: 'black',
                                    }}
                                >
                                    👣
                                    <br />
                                    Using stablecoins on the NEAR network we're able to guarantee both proce stability, 
                                    and climate neutrality for our projects, as <a href='https://near.org/blog/near-climate-neutral-product/'>attested by the South Pole institute</a>
                                </Typography>
                            </div>
                        </div>
                    </PlainMegaCard>
                </TreeCardGrid>
            </div>
        </>
    )
}

export default About
