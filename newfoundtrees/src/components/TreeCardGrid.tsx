import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

interface TreeCardRowProps {
    title: String
    children: React.ReactNode
}

const useStyles = makeStyles((theme) => {
    return {
        wrap: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
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
    }
})

const TreeCardGrid = ({ title, children }: TreeCardRowProps) => {
    const styles = useStyles()
    return (
        <div className={styles.wrap}>
            <Typography
                noWrap
                variant="h4"
                style={{ textAlign: 'left', paddingBottom: 20 }}
            >
                {title.toLocaleUpperCase()}
            </Typography>
            <div className={styles.row}>
                <Grid
                    container
                    direction="row"
                    xs={12}
                    zeroMinWidth
                    spacing={1}
                >
                    {children}
                </Grid>
            </div>
        </div>
    )
}

export default TreeCardGrid
