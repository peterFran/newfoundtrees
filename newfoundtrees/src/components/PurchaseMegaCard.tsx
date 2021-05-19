import { Button, makeStyles, Typography } from '@material-ui/core'
import { formatNearAmount } from 'near-api-js/lib/utils/format'
import * as React from 'react'
import { NewFoundToken } from '../domain/Token'
import ImpactScore from './ImpactScore'
import PlainMegaCard from './PlainMegaCard'
import AuthContext from '../context/AuthContext'

interface PurchaseMegaCardProps {
    token: NewFoundToken
    rotated?: boolean
    background?: boolean
}

const CARD_HEIGHT = 600

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(15),
        height: '100%',
        maxHeight: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
    },
    mapContainer: {
        justifySelf: 'center',
        width: '100%',
        borderRadius: 20,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4),
        flexDirection: 'column',
        textAlign: 'right',
    },
    mapBox: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderWidth: theme.spacing(1),
        borderStyle: 'solid',
        borderColor: theme.palette.primary.dark,
        overflow: 'hidden',
    },
}))

const PurchaseMegaCard = ({ token }: PurchaseMegaCardProps) => {
    const styles = useStyles()

    const { wallet } = React.useContext(AuthContext)

    React.useEffect(() => {
        try {
            console.log(token.availableEditions)
        } catch (error) {}
    }, [token])

    return (
        <PlainMegaCard border={false}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography
                        variant="h5"
                        color="primary"
                        style={{ textTransform: 'capitalize' }}
                    >
                        {token.details.category} Project
                    </Typography>
                    <Typography color="primary" variant="h5">
                        Ⓝ{' '}
                        {formatNearAmount(
                            token.price.toLocaleString('fullwide', {
                                useGrouping: false,
                            })
                        )}
                    </Typography>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        variant="h4"
                        style={{
                            fontSize: 25,
                            textAlign: 'left',
                            textTransform: 'capitalize',
                            paddingBottom: 10,
                        }}
                    >
                        {token.details.name}
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: 'left' }}>
                        {token.details.description}
                    </Typography>
                </div>
                <div
                    style={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        variant="h4"
                        style={{
                            fontSize: 25,
                            textAlign: 'left',
                            textTransform: 'capitalize',
                            paddingBottom: 10,
                        }}
                    >
                        Location:
                    </Typography>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${token.details.coordinates.latitude.toFixed(
                            6
                        )},${token.details.coordinates.longitude.toFixed(
                            6
                        )}`}
                        style={{
                            color: "black"
                        }}
                    >
                    <Typography
                        variant="h5"
                        style={{ textDecoration: 'underline' }}
                    >{`${token.details.coordinates.latitude.toFixed(
                        6
                    )}, ${token.details.coordinates.longitude.toFixed(
                        6
                    )}`}</Typography></a>
                    {/* <div className={styles.mapContainer}>
                        <SmallMap token={token} />
                        <div style={{width: '100%'}}>
                            <Typography variant="body1">{`${token.details.coordinates.latitude.toFixed(
                                6
                            )}, ${token.details.coordinates.longitude.toFixed(
                                6
                            )}`}</Typography>
                        </div>
                    </div> */}
                </div>
                <div
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2">IMPACT</Typography>
                    <ImpactScore score={token.details.impactScore} />
                </div>
                <div
                    style={{
                        padding: 15,
                        justifyContent: 'flex-start',
                        display: 'flex',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            console.log(token.price.toFixed())
                            wallet?.makeOffer(
                                token.availableEditions[0].id,
                                token.price.toLocaleString('fullwide', {
                                    useGrouping: false,
                                })
                            )
                        }}
                    >
                        Buy Token 💰
                    </Button>
                </div>
            </div>
        </PlainMegaCard>
    )
}

export default PurchaseMegaCard
