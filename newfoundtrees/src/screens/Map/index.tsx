
import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'

import NewFoundTreesMap from '../../components/NewFoundTreesMap'
import { fetchTokens, getToken, LIST_TOKENS_QUERY, StoreData, StoreVars } from '../../outbound/tokenClient';
import { OldToken, Thing, TokenDetails } from '../../domain/Token';
import { useQuery } from '@apollo/client';
import { resolve } from 'node:path';

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

    const [availableTokens, setAvailableTokens] = React.useState<OldToken[]>([])
    const { loading, data } = useQuery<StoreData, StoreVars>(
        LIST_TOKENS_QUERY,
        {
            variables: {
                store: process.env.REACT_APP_MINTBASE_STORE_NAME || '',
            },
        }
    )

    React.useEffect(() => {

        if(!loading && data?.store && data.store.length > 0){
            console.log(data?.store[0].things)
            fetchTokens(data.store[0].things).then((tokens) => setAvailableTokens(tokens))
        }
    }, [loading, data])

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet> 

            <div className={classes.mapContainer}>
                <NewFoundTreesMap tokens={availableTokens}/>
            </div>
        </>
    )
}

export default Projects