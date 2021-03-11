
import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'

import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import { TokenDetails, Token } from '../../domain/Token'

const useStyles = makeStyles((theme) => {
    return {
        mapContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: '#eee',
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
            [theme.breakpoints.down('sm')]: {
                top: '0.5pc',
                right: '0.5pc',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 15,
            },
        },
    }
})

const listedProjects: Token[] = [
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
        sold: 1,
        ownedEditions: [] as number[],
        updates: []
    } as Token,
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
                'https://images.prismic.io/mossyearth/32623040-b3da-4c00-a74e-81aa1bf9a0cc_white-tailed+eagle.png',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description:
                "By purchasing this token, you are helping to fund a new rewilding project in the Scottish Highlands. \nIn partnership with the Roy Dennis Wildlife Foundation we're building two eagle nest platforms targeting the native golden and white-tailed eagles. \nThese eagles were once extremely rare in Scotland, with white-tailed eagles disappearing altogether. \nThanks to ambitious conservation work, they’re finally making a comeback and it is our hope that these platforms will contribute to this and help safeguard their future in Scotland.",
        } as TokenDetails,
        price: 200,
        batchSize: 10,
        sold: 5,
        ownedEditions: [] as number[],
        updates: []
    } as Token,
    {
        details: {
            name: 'Building a Namibian Tree Nursery',
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
        price: 20,
        batchSize: 5,
        sold: 5,
        ownedEditions: [1, 3, 4],
    } as Token,
]


const Projects = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet> 

            <div className={classes.mapContainer}>
                <NewFoundTreesMap tokens={listedProjects}/>
            </div>
        </>
    )
}

export default Projects
