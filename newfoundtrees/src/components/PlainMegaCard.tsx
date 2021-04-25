import * as React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

interface MegaCardProps {
    children: React.ReactNode
    border?: boolean
    small?: boolean
    overflow?: boolean
}

const useStyles = makeStyles((theme) => ({
    box: {
        flex: 1,
        minWidth: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
    },
    border: {
        borderWidth: theme.spacing(1),
        borderStyle: 'solid',
        borderColor: theme.palette.primary.dark,
    },
    inner: {
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
        },
        width: '100%',
        height: '100%',
        display: 'flex',
        transform: 'translateY(0%)',
        justifyContent: 'center',
        padding: theme.spacing(5),
        zIndex: 3,
    },
    veil: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10,
        opacity: 0.8,
        padding: theme.spacing(3),
        background:
            'linear-gradient(transparent 50%, rgba(255,255,255, 100) 100%)',
    },
}))

const PlainMegaCard = ({
    children,
    border = true,
    small = false,
    overflow = false,
}: MegaCardProps) => {
    const styles = useStyles()
    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={small ? { height: '450px', overflow: 'visible' } : { height: '700px' }}
        >
            <div
                className={
                    border ? `${styles.box} ${styles.border}` : styles.box
                }
                style={overflow ? { overflow: 'visible' } : {}}
            >
                <div className={styles.inner}>{children}</div>
            </div>
        </Grid>
    )
}

export default PlainMegaCard
