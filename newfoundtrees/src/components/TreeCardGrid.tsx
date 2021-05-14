import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

interface TreeCardRowProps {
    title: String
    children: React.ReactNode
    reverse?: boolean
}

const useStyles = makeStyles((theme) => {
    return {
        wrap: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            overflow: 'visible' 
        },
        row: {
            marginLeft: -theme.spacing(2),
            marginRight: -theme.spacing(2),
            display: 'flex',
            height: '100%',
            flex: 1,
            overflow: 'visible',
            justifyContent: 'center',
            alignItems: 'space-between',
            flexDirection: 'row',
        },
    }
})

const TreeCardGrid = ({ title, children, reverse=false }: TreeCardRowProps) => {
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
                    direction={reverse ? "row-reverse" : "row"}
                    item
                    xs={12}
                    zeroMinWidth
                    spacing={4}
                >
                    {children}
                </Grid>
            </div>
        </div>
    )
}

export default TreeCardGrid
