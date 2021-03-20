import * as React from 'react'
import { makeStyles, Typography } from '@material-ui/core';

interface TreeCardProps {
    name: string
}

const useStyles = makeStyles((theme) => ({
    box: {
        padding: 15,
        flex: 1,
        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.spacing(1),
        borderRadius: 15,
        borderStyle: 'solid',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderColor: theme.palette.primary.main,

        // paddingBottom: '100%'
    }
}))

const TreeCard = ({ name }: TreeCardProps) => {
    const styles = useStyles()
    return <div className={styles.box}>
        <Typography variant="h2" color="secondary">{name}</Typography>
    </div>
}

export default TreeCard
