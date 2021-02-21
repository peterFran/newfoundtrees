import React from 'react'
import { makeStyles } from '@material-ui/core'
import { OwnedToken } from '../domain/Token'
import ReactPlayer from 'react-player'

interface OwnedContentProps {
    token: OwnedToken
}

const useStyles = makeStyles((theme) => ({
    projectDescription: {
        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
    },
    tokenSummaryContainer: {
        width: '100%',
        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
        zIndex: 2,
    },
    arrowRight: {
        width: '16px',
        marginLeft: '5px',
    },
    tokenImage: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

        width: 270,
    },
    tokenTitle: {
        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
        fontWeight: 600,
    },
    buyToken: {
        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
        fontWeight: 600,
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
    },
}))

const OwnedContent = ({ token }: OwnedContentProps) => {
    const styles = useStyles()
    return (
        <div className={styles.tokenSummaryContainer}>
            <ReactPlayer url={token.details.content} />
        </div>
    )
}

export default OwnedContent
