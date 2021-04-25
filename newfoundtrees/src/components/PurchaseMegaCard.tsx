import { Button, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'
import { Token } from '../domain/Token'
import ImpactScore from './ImpactScore'
import PlainMegaCard from './PlainMegaCard'

interface PurchaseMegaCardProps {
    token: Token
    rotated?: boolean
    background?: boolean
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(5),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

const PurchaseMegaCard = ({ token }: PurchaseMegaCardProps) => {
    const styles = useStyles()
    return (
        <PlainMegaCard border={false}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography
                        variant="h5"
                        style={{ textTransform: 'capitalize' }}
                    >
                        {token.details.category} Project
                    </Typography>
                    <Typography variant="h5">Ⓝ{token.price}</Typography>
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
                            textAlign: 'left',
                            textTransform: 'capitalize',
                            paddingBottom: 10,
                        }}
                    >
                        {token.details.name}
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'left' }}>
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
                        variant="h5"
                        style={{ textTransform: 'capitalize' }}
                    >
                        Location:
                    </Typography>
                    <Typography variant="body1">{`${token.details.coordinates.latitude.toFixed(
                        6
                    )}, ${token.details.coordinates.longitude.toFixed(
                        6
                    )}`}</Typography>
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
                <Button variant="contained" color="primary" href="/buy">
                    💰 Buy Token
                </Button>
            </div>
        </PlainMegaCard>
    )
}

export default PurchaseMegaCard
