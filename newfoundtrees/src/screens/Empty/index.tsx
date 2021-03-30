import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import doge from '../../assets/doge.jpg'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            marginTop: theme.spacing(5),
            paddingBottom: theme.spacing(20),
            paddingTop: theme.spacing(4),
            display: 'flex',
            scrollBehavior: 'smooth',
        },
        contentWrap: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,

        },
        doge: {
            width: '255px',
            height: '160px',
            margin: theme.spacing(4),
            borderRadius: 80
        }
    }
})

const Empty = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Wow such empty</title>
            </Helmet>

            <div className={classes.container}>
                <div className={classes.contentWrap}>
                        <img
                            src={doge}
                            className={classes.doge}
                            alt="wow"
                        ></img>
                        <Typography variant="h3">Wow, such empty.</Typography>
                </div>
            </div>
        </>
    )
}

export default Empty
