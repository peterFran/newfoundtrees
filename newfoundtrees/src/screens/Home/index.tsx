import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'
import HeroBanner from '../../components/HeroBanner'
import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import { ListedToken, TokenDetails } from '../../domain/Token'
import InfoBanner from '../../components/InfoBanner'

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
            paddingTop: 100,
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
            [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
            },
        },
    }
})

const projects: ListedToken[] = [
    {
        details: {
            name: 'Reforesting London',
            beneficiaries: [
                {
                    account: 'peterf.near',
                    proportion: 1,
                },
            ],
            category: 'reforestation',
            coordinates: {
                latitude: 51.56280727910533,
                longitude: -0.06657722663394684,
            },
            cover:
                'https://newfoundtrees-prod-assets.s3.eu-central-1.amazonaws.com/IR_default.jpg',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description:
                'I would like to plant some trees in my garden. Then there will be more birds. I like birds very much. Especially the hawks. They are fearsome creatures',
        } as TokenDetails,
        price: 20,
        batchSize: 3,
        sold: 1,
    } as ListedToken,
    {
        details: {
            name: 'Eagle Nests in Scotland',
            beneficiaries: [
                {
                    account: 'peterf.near',
                    proportion: 1,
                },
                {
                    account: 'newfoundtreesearth.near',
                    proportion: 1,
                },
            ],
            category: 'rewilding',
            coordinates: {
                latitude: 57.202568248021265,
                longitude: -4.191054353571119,
            },
            cover:
                'https://images.prismic.io/newfoundtreesearth/32623040-b3da-4c00-a74e-81aa1bf9a0cc_white-tailed+eagle.png',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description:
                "By purchasing this token, you are helping to fund a new rewilding project in the Scottish Highlands. \nIn partnership with the Roy Dennis Wildlife Foundation we're building two eagle nest platforms targeting the native golden and white-tailed eagles. \nThese eagles were once extremely rare in Scotland, with white-tailed eagles disappearing altogether. \nThanks to ambitious conservation work, they’re finally making a comeback and it is our hope that these platforms will contribute to this and help safeguard their future in Scotland.",
        } as TokenDetails,
        price: 200,
        batchSize: 10,
        sold: 5,
    } as ListedToken,
]

const Home = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
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
                        <div className={classes.text}>
                            <div>
                                🌏
                                <p>
                                    Explore our map to discover projects around
                                    the globe.
                                </p>
                            </div>
                            <br/>
                            <div>
                                💸
                                <p>
                                    Buy NFTs with NEAR tokens, and use the power
                                    of the blockchain to see exactly where your
                                    money goes.
                                </p>
                            </div>
                            <br/>
                            <div>
                                ✉️
                                <p>
                                    Projects will send you updates if you own their NFT, 
                                    so you can see the impact your contribution is making.
                                </p>
                            </div>
                        </div>
                    </InfoBanner>
                </div>
                <div className={classes.mapContainer}>
                    <NewFoundTreesMap
                        listedTokens={projects}
                        mapType="listed"
                    />
                </div>
            </div>
        </>
    )
}

export default Home
