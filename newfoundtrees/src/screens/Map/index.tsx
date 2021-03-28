
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
