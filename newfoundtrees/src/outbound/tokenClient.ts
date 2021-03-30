import { Token, TokenDetails } from '../domain/Token';

export default function getTokens(): Token[] {
    return [
        {
            id: 1,
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
                impactScore: 2,

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
            id: 2,
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
                impactScore: 3,

                cover:
                    'https://images.prismic.io/mossyearth/32623040-b3da-4c00-a74e-81aa1bf9a0cc_white-tailed+eagle.png',
                content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                description:
                    "By purchasing this token, you are helping to fund a new rewilding project in the Scottish Highlands. \nIn partnership with the Roy Dennis Wildlife Foundation we're building two eagle nest platforms targeting the native golden and white-tailed eagles.",
            } as TokenDetails,
            price: 200,
            batchSize: 10,
            sold: 5,
            ownedEditions: [] as number[],
            updates: []
        } as Token,
        {
            id: 3,
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
                category: 'cultural',
                coordinates: {
                    latitude: -21.22119515496362,
                    longitude: 17.067420321086132,
                },
                impactScore: 5,

                cover:
                    'https://images.prismic.io/mossyearth/73653848-73de-4da1-b7ed-3c4eb19ab6d1_INVASIVE+TREES.jpg',
                content: 'https://www.youtube.com/watch?v=DsGnVZawfpg',
                description:
                    'The region we will be working in Namibia is characterised by open desert shrubland interspersed by mountainous terrain, wooded ephemeral (intermittent water) and perennial (constant water) river beds, and grassy sand and gravel plains. These habitats are threatened by overgrazing, the spread of non-native Prosopis, climate change and erosion.',
            } as TokenDetails,
            price: 20,
            batchSize: 5,
            sold: 5,
            ownedEditions: [1, 3, 4],
        } as Token,
    ]
    
}