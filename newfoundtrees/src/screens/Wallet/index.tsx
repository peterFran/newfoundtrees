import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import {
    fetchUsersTokens,
    LIST_USERS_TOKENS_QUERY,
    StoreData,
    UserVars,
} from '../../outbound/tokenClient'
import TreeCard from '../../components/TreeCard'
import { NewFoundToken } from '../../domain/Token'
import { useQuery } from '@apollo/client'
import AuthContext from '../../context/AuthContext'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
    bigdesktop: {
        breakpoint: { max: 7000, min: 3000 },
        items: 4,
        slidesToSlide: 5, // optional, default to 1.
    },
    desktop: {
        breakpoint: { max: 3000, min: 1500 },
        items: 3,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1500, min: 650 },
        items: 2,
        // slidesToSlide: 5, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
}

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
            flexDirection: 'column',
            paddingBottom: theme.spacing(20),
            [theme.breakpoints.up('md')]: {
                // marginRight: -theme.spacing(40),
                flexDirection: 'row',
            },
            [theme.breakpoints.up('lg')]: {
                marginRight: -theme.spacing(40),
                flexDirection: 'row',
            },
            justifyContent: 'flex-start',
            alignItems: 'space-between',
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
        carousel: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 2000,
            },
            height: 500,
        },
        link: {
            color: '#007bff',
            "&:hover": {
                color: "#0056b3",
                textDecoration: "underline"
            }
        },
        carouselWrap: {
            flex: 1,
            [theme.breakpoints.up('md')]: {
                width: '70%',
            },
        },
        infoBanner: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '30%',
                marginRight: 50,
            },
        },
    }
})

const WalletScreen = () => {
    const classes = useStyles()
    const [availableTokens, setAvailableTokens] = React.useState<
        NewFoundToken[]
    >([])

    const { wallet, accountDetails, isNearLoggedIn, signIn } = React.useContext(
        AuthContext
    )

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
                    <div className={classes.infoBanner}>
                        <div
                            style={{
                                height: 500,

                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                            }}
                        >
                            <div
                                style={{
                                    padding: 40,
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    color="secondary"
                                    align="left"
                                >
                                    Wallet
                                </Typography>
                            </div>
                            {isNearLoggedIn ? (
                                <>
                                    <div>
                                        <Typography
                                            variant="h5"
                                            align="left"
                                            style={{
                                                color: 'white',
                                                textTransform: 'none',
                                                padding: 40,
                                            }}
                                        >
                                            Your investment into vital projects
                                            can make a huge impact on our
                                            ability to fight climate change and
                                            restore our natural world. So far,
                                            you've invested in:
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
                                </>
                            ) : (
                                <div>
                                    <Typography
                                        variant="h5"
                                        align="left"
                                        style={{
                                            color: 'white',
                                            textTransform: 'none',
                                            padding: 40,
                                        }}
                                    >
                                        To access your NewFoundTrees tokens,
                                        please{' '}
                                        <span
                                            className={classes.link}
                                            onClick={() =>
                                                signIn({ request: true })
                                            }
                                        >
                                            Log In
                                        </span>
                                    </Typography>
                                </div>
                            )}
                            <div style={{ padding: 50 }}></div>
                        </div>
                    </div>
                    <div className={classes.carouselWrap}>
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            responsive={responsive}
                            ssr={false} // means to render carousel on server-side.
                            infinite={false}
                            // autoPlay={true}
                            // autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={1000}
                            containerClass="carousel-container"
                            // removeArrowOnDeviceType={['tablet', 'mobile']}
                            // deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            // className={classes.carousel}
                        >
                            {!loading &&
                                availableTokens.map((thing: NewFoundToken) => {
                                    return (
                                        <TreeCard
                                            fixed={true}
                                            token={thing}
                                            key={thing.id}
                                        />
                                    )
                                })}
                        </Carousel>
                    </div>
                    {/* <TreeCardGrid title="">
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
                    </TreeCardGrid> */}
                </div>
            </div>
        </>
    )
}

export default WalletScreen
