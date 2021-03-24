import * as React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

interface MegaCardProps {
    children: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
    wrap: {
        display: 'flex',
        height: '100%',
        padding: '10px'
        // borderRadius: 15,
        // overflow: 'hidden',

    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: '100% 100%',
        backgroundImage: `url('/map.png')`,
        backgroundRepeat: 'no-repeat',
        borderRadius: 15,
        overflow: 'hidden',
    },
    veil: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#2D0D45',
        opacity: 0.8,
        padding: theme.spacing(3),
    },
    inner: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        transform: 'translateY(-100%)',
        padding: theme.spacing(5),
        zIndex: 3,
    },
}))

const MegaCard = ({ children }: MegaCardProps) => {
    const styles = useStyles()
    return (
        <Grid xs={12} sm={6} md={6} style={{ height: '100%' }}>
            <div className={styles.wrap}>
                <div className={styles.box}>
                    <div className={styles.veil}></div>
                    <div className={styles.inner}>{children}</div>
                </div>
            </div>
        </Grid>
    )
}

export default MegaCard
