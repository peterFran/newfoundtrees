
import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'

import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import { LIST_TOKENS_QUERY, StoreData, StoreVars } from '../../outbound/tokenClient';
import { OldToken } from '../../domain/Token';
import { useQuery } from '@apollo/client';

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

// const listedProjects: OldToken[] = getTokens()

const Projects = () => {
    const classes = useStyles()

    const { loading, data } = useQuery<StoreData, StoreVars>(
        LIST_TOKENS_QUERY,
        {
            variables: {
                store: process.env.REACT_APP_MINTBASE_STORE_NAME || '',
            },
        }
    )

    // React.useEffect(() => {
    //     if(!loading && data?.store && data.store.length > 0){
    //         Promise.all([data.store[0].things.map(thing => getToken(thing))]).then(())
    //     }
    // }, [loading, data])

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet> 

            <div className={classes.mapContainer}>
                {/* <NewFoundTreesMap tokens={listedProjects}/> */}
            </div>
        </>
    )
}

export default Projects
