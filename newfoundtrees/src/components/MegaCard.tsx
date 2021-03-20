import * as React from 'react'
import { makeStyles } from '@material-ui/core'

interface MegaCardProps {
    children: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
    box: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        backgroundSize: '100% 100%',
        backgroundImage: `url('/map.png')`,
        backgroundRepeat: 'no-repeat',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
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
        <div className={styles.box}>
            <div className={styles.veil}></div>
            <div className={styles.inner}>{children}</div>
        </div>
    )
}

export default MegaCard
