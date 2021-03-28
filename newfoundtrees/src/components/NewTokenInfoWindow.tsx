import React from 'react'
import { makeStyles } from '@material-ui/core'
import { InfoWindow } from '@react-google-maps/api'
import { Token } from '../domain/Token'
import TreeCard from './TreeCard'

interface TokenInfoWindowProps {
    token: Token
    onCloseClick: () => void
}

const useStyles = makeStyles((theme) => ({
    tokenSummaryContainer: {
        zIndex: 2,
        maxWidth: '400px',
        width: '100%',
        maxHeight: '700px',
        height: '70vh',
        overflow: 'hidden',
    },
}))

const NewTokenInfoWindow = ({ token, onCloseClick }: TokenInfoWindowProps) => {
    const styles = useStyles()
    return (
        <InfoWindow
            position={{
                lat: token.details.coordinates.latitude,
                lng: token.details.coordinates.longitude,
            }}
            options={{
                pixelOffset: new window.google.maps.Size(0, -25),
                minWidth: 350,
                maxWidth: 350,
            }}
            onCloseClick={onCloseClick}
        >
            <div className={styles.tokenSummaryContainer}>
                <TreeCard token={token} />
            </div>
        </InfoWindow>
    )
}

export default NewTokenInfoWindow
