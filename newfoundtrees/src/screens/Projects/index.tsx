
import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'

import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import getTokens from '../../outbound/tokenClient';
import { Token } from '../../domain/Token';

const useStyles = makeStyles((theme) => {
    return {
        mapContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: '#eee',
        },
        floatingMoney: {
            position: 'absolute',
            top: '3pc',
            right: '3pc',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 25,
            zIndex:10,
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.secondary.main,
            [theme.breakpoints.down('sm')]: {
                top: '0.5pc',
                right: '0.5pc',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 15,
            },
        },
    }
})

const listedProjects: Token[] = getTokens()

const Projects = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet> 

            <div className={classes.mapContainer}>
                <NewFoundTreesMap tokens={listedProjects}/>
            </div>
        </>
    )
}

export default Projects
