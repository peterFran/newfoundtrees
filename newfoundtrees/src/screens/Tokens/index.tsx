import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'

import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import { OwnedToken, TokenDetails } from '../../domain/Token';

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
    }
})

const projects: OwnedToken[] = [
    {
        details: {
            name: 'Building a Namibian Tree Nursery',
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
            category: 'reforestation',
            coordinates: {
                latitude: -21.22119515496362,
                longitude: 17.067420321086132,
            },
            cover:
                'https://images.prismic.io/mossyearth/73653848-73de-4da1-b7ed-3c4eb19ab6d1_INVASIVE+TREES.jpg',
            content: 'https://www.youtube.com/watch?v=DsGnVZawfpg',
            description:
                'The region we will be working in Namibia is characterised by open desert shrubland interspersed by mountainous terrain, wooded ephemeral (intermittent water) and perennial (constant water) river beds, and grassy sand and gravel plains. These habitats are threatened by overgrazing, the spread of non-native Prosopis spp., climate change and erosion. Oana has already made great progress in clearing large areas of Prosopis and will soon be able to start restoring the river beds as well as the grassland ecosystem through planting. To do so, they require a local nursery where the native species can be propagated and taken care of until they are strong enough to be planted out in the harsh conditions of Southern Namibia.',
        } as TokenDetails,
        batchSize: 5,
        ownedEditions: [ 1, 3, 4 ]
    } as OwnedToken,
]

const Tokens = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet>
            <div className={classes.mapContainer}>
                <NewFoundTreesMap ownedTokens={projects} mapType='owned' />
            </div>
        </>
    )
}

export default Tokens
