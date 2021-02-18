
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'

import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import { TokenDetails, ListedToken } from '../../domain/Token'
import { Box, Typography } from '@material-ui/core'
import nearIcon from '../../assets/near-icon.svg'
import AuthContext from '../../context/AuthContext'

const useStyles = makeStyles((theme) => {
    return {
        mapContainer: {
            position: 'relative',
            height: document.documentElement.clientHeight,
            width: window.innerWidth,
            marginTop: -theme.spacing(30),
            marginBottom: theme.spacing(3),
            backgroundColor: '#eee',
            [theme.breakpoints.up('md')]: {
                height: '100pc',
            },
        },
        floatingMoney: {
            position: 'absolute',
            top: '3pc',
            right: '3pc',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 25,
            zIndex:10,
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.secondary.main,
        },
        titleWrapper: {
            paddingTop: theme.spacing(3),
            position: 'absolute',
            top: theme.spacing(6),
            left: 0,
            right: 0,
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 10,
        },
        title: {
            lineHeight: 1,
            fontFamily: ['sofia-pro', 'sans-serif'].join(','),
            fontWeight: 600,
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
                'https://mossy-prod-assets.s3.eu-central-1.amazonaws.com/IR_default.jpg',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description:
                'I would like to plant some trees in my garden. Then there will be more birds. I like birds very much. Especially the hawks. They are fearsome creatures',
        } as TokenDetails,
        price: 20,
        batchSize: 3,
        sold: 1
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
                    account: 'mossyearth.near',
                    proportion: 1,
                },
            ],
            category: 'rewilding',
            coordinates: {
                latitude: 57.202568248021265,
                longitude: -4.191054353571119,
            },
            cover:
                'https://images.prismic.io/mossyearth/32623040-b3da-4c00-a74e-81aa1bf9a0cc_white-tailed+eagle.png',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description:
                "By purchasing this token, you are helping to fund a new rewilding project in the Scottish Highlands. \nIn partnership with the Roy Dennis Wildlife Foundation we're building two eagle nest platforms targeting the native golden and white-tailed eagles. \nThese eagles were once extremely rare in Scotland, with white-tailed eagles disappearing altogether. \nThanks to ambitious conservation work, they’re finally making a comeback and it is our hope that these platforms will contribute to this and help safeguard their future in Scotland.",
        } as TokenDetails,
        price: 200,
        batchSize: 10,
        sold: 5
    } as ListedToken,
]

const Projects = () => {
    const classes = useStyles()
    const [nbalance, setNbalance] = useState<number | null>(null)
    const { accountDetails } = React.useContext(AuthContext);

    useEffect(() => {
        if (accountDetails){
                const scaled = parseInt(accountDetails.balance.available) as number * 0.000000000000000000000001
                const numBalance = Math.round((scaled + Number.EPSILON) * 10000) / 10000
                setNbalance(numBalance)
        }
    }, [nbalance, accountDetails])

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet>
            {accountDetails && (
            <Box className={classes.floatingMoney}>
                <Typography variant="body1">{nbalance} <img src={nearIcon} alt="near icon" style={{ width: 12 }} /></Typography>{' '}
            </Box>)}
            <div className={classes.titleWrapper}>
                <div className={classes.title}>
                    <h1>New Found Trees Prototype</h1>
                </div>
            </div>
            <div className={classes.mapContainer}>
                <NewFoundTreesMap listedTokens={projects} mapType="listed" />
            </div>
        </>
    )
}

export default Projects
