import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
// import MarkerWithLabel from "@react-google-maps/lib/component/MarkerWithLabel";
import mapStyles from './mapStyles'
import { Token } from '../domain/Token';

import TokenInfoWindow from './TokenInfoWindow'
import { makeStyles } from '@material-ui/core'

const mapContainerStyle = {
    maxWidth: '100vw',
    height: '100vh',
    width: '100vw',
    maxHeight: '100vh',
    margin: 0,
    overflow: 'hidden',
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    scrollwheel: true,
    zoomControl: true,
    minZoom: 3,
}

const center = {
    lat: 10.68,
    lng: -9.16,
}

const useStyles = makeStyles((theme) => ({
    fader: {
        pointerEvents: 'none',
        height: '100vh',
        position: 'absolute',
        width: '100vw',
        background: 'linear-gradient(rgba(45,13,69, 40) 0%, transparent 40%)',
    },
    box: {
        textAlign: 'left',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
        backgroundColor: '#2D0D45',
        color: 'white',
        transform: 'translateX(50%)',
        paddingLeft: 3,
        paddingRight: 3,
        padding: 2,
        fontFamily: 'Teko',
        borderTopLeftRadius:10,
        fontWeight: 700,
        zIndex: -10
    },
    borderedBox: {
        textAlign: 'left',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
        backgroundColor: '#2D0D45',
        color: 'white',
        transform: 'translateX(50%)',
        paddingLeft: 3,
        paddingRight: 3,
        padding: 2,
        fontFamily: 'Teko',
        fontWeight: 700,
        zIndex: -10
    }
}))

interface NewFoundTreesMapProps {
    tokens?: Token[]
}

const NewFoundTreesMap = ({
    tokens = [],
}: NewFoundTreesMapProps) => {
    const [selected, setSelected] = React.useState<
        Token | null
    >(null)

    const styles = useStyles()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds({lat: -180, lng: -90},  {lat: 180, lng: 90})
        // map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <>
            <title>New Found Trees</title>
            {!isLoaded ? null : (
                <div>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={2}
                        center={center}
                        options={options}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <div className={styles.fader}></div>

                        {tokens.map((project) => (
                            <Marker
                                zIndex={5}
                                key={project.details.name}
                                position={{
                                    lat: project.details.coordinates.latitude,
                                    lng: project.details.coordinates.longitude,
                                }}
                                icon={{
                                    path: project.ownedEditions.length > 0 ? google.maps.SymbolPath.BACKWARD_CLOSED_ARROW : google.maps.SymbolPath.CIRCLE,
                                    strokeColor:  '#2D0D45',
                                    fillColor: 'white',
                                    fillOpacity: 1,
                                    strokeWeight: 2,
                                    labelOrigin: new window.google.maps.Point(
                                        0,
                                        2.2
                                    ),
                                    scale: 5,
                                    
                                }}
                                label={{
                                    text: project.details.name.toUpperCase(),
                                    color: 'white',   
                                    className: project.ownedEditions.length > 0 ? styles.borderedBox : styles.box,
                                    
                                }}
                                onClick={() => {
                                    console.log(map?.getCenter())
                                    map?.setZoom(5)
                                    map?.panTo({
                                        lat:
                                            project.details.coordinates
                                                .latitude,
                                        lng:
                                            project.details.coordinates
                                                .longitude,
                                    })
                                    console.log(map?.getCenter())

                                    setSelected(project)
                                }}
                            />
                        ))}
                        {selected && (
                            <TokenInfoWindow
                                token={selected as Token}
                                onCloseClick={() => setSelected(null)}
                            />
                        )}
                    </GoogleMap>
                </div>
            )}
        </>
    )
}

export default NewFoundTreesMap 
