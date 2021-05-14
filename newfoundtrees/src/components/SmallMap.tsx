import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import mapStyles from './mapStyles'
import { NewFoundToken } from '../domain/Token'

import { makeStyles } from '@material-ui/core'

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    margin: 0,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    scrollwheel: true,
    zoomControl: false,
    minZoom: 3,
    gestureHandling: 'greedy',
}

const useStyles = makeStyles((theme) => ({
    mapBox: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderWidth: theme.spacing(1),
        borderStyle: 'solid',
        borderColor: theme.palette.primary.dark,
        overflow: 'hidden',
    },
}))

interface SmallMapProps {
    token: NewFoundToken
}

const SmallMap = ({ token }: SmallMapProps) => {
    const styles = useStyles()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <>
            {!isLoaded ? null : (
                <div className={styles.mapBox}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={{
                            lat: token.details.coordinates.latitude,
                            lng: token.details.coordinates.longitude,
                        }}
                        options={options}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <Marker
                            zIndex={5}
                            key={token.details.name}
                            position={{
                                lat: token.details.coordinates.latitude,
                                lng: token.details.coordinates.longitude,
                            }}
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                strokeColor: '#2D0D45',
                                fillColor: 'white',
                                fillOpacity: 1,
                                strokeWeight: 2,
                                labelOrigin: new window.google.maps.Point(
                                    0,
                                    2.2
                                ),
                                scale: 5,
                            }}
                        />
                    </GoogleMap>
                </div>
            )}
        </>
    )
}

export default SmallMap
