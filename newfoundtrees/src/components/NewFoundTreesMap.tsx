import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from '@react-google-maps/api'
import mapStyles from './mapStyles'
import { Button, makeStyles } from '@material-ui/core'
import { OwnedToken, ListedToken } from '../domain/Token'
import reforestationIcon from '../assets/map-pin-reforestation.svg'
import rewildingIcon from '../assets/map-pin-rewilding.svg'
import ProgressBar from 'react-bootstrap/ProgressBar'

const mapContainerStyle = {
    height: '100%',
    width: '100%',
}

const options = {
    styles: mapStyles,
    disableDefaultUI: false,
    scrollwheel: true,
    zoomControl: true,
    minZoom: 3,
}

const center = {
    lat: -20.68,
    lng: -9.16,
}

const useStyles = makeStyles((theme) => ({
    projectDescription: {
        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
    },
    tokenSummaryContainer: {
        width: '300px',
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

interface NewFoundTreesMapProps {
    ownedTokens?: OwnedToken[]
    listedTokens?: ListedToken[]
    mapType: 'listed' | 'owned'
}

const NewFoundTreesMap = ({
    ownedTokens = [],
    listedTokens = [],
    mapType = 'listed',
}: NewFoundTreesMapProps) => {
    const styles = useStyles()
    const [selected, setSelected] = React.useState<
        OwnedToken | ListedToken | null
    >(null)

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
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={2}
                    center={center}
                    options={options}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {(mapType === 'listed' &&
                        listedTokens.map((project) => (
                            <Marker
                                key={project.details.name}
                                position={{
                                    lat: project.details.coordinates.latitude,
                                    lng: project.details.coordinates.longitude,
                                }}
                                icon={{
                                    url:
                                        project.details.category ===
                                        'reforestation'
                                            ? reforestationIcon
                                            : rewildingIcon,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                        23,
                                        23
                                    ),
                                    scaledSize: new window.google.maps.Size(
                                        46,
                                        46
                                    ),
                                }}
                                onClick={() => {
                                    console.log(map?.getCenter())
                                    map?.setZoom(5)
                                    map?.panTo({lat: project.details.coordinates.latitude, lng: project.details.coordinates.longitude})
                                    console.log(map?.getCenter())

                                    setSelected(project)
                                }}
                            />
                        ))) ||
                        (mapType === 'owned' &&
                            ownedTokens.map((project) => (
                                <Marker
                                    key={project.details.name}
                                    position={{
                                        lat:
                                            project.details.coordinates
                                                .latitude,
                                        lng:
                                            project.details.coordinates
                                                .longitude,
                                    }}
                                    icon={{
                                        url:
                                            project.details.category ===
                                            'reforestation'
                                                ? reforestationIcon
                                                : rewildingIcon,
                                        origin: new window.google.maps.Point(
                                            0,
                                            0
                                        ),
                                        anchor: new window.google.maps.Point(
                                            23,
                                            23
                                        ),
                                        scaledSize: new window.google.maps.Size(
                                            46,
                                            46
                                        ),
                                    }}
                                    onClick={() => {
                                        map?.setZoom(5)
                                        map?.setCenter({lat: project.details.coordinates.latitude, lng: project.details.coordinates.longitude})
                                        setSelected(project)
                                    }}
                                />
                            )))}

                    {selected && (
                        <InfoWindow
                            position={{
                                lat: selected.details.coordinates.latitude,
                                lng: selected.details.coordinates.longitude,
                            }}
                            options={{
                                pixelOffset: new window.google.maps.Size(
                                    0,
                                    -25
                                ),
                            }}
                            onCloseClick={() => {
                                setSelected(null)
                            }}
                        >
                            <div className={styles.tokenSummaryContainer}>
                                <div className={styles.tokenTitle}>
                                    {selected.details.name}
                                </div>

                                {(selected.details.cover.endsWith('.jpg') ||
                                    selected.details.cover.endsWith(
                                        '.png'
                                    )) && (
                                    <img
                                        src={selected.details.cover}
                                        className={styles.tokenImage}
                                        alt="cover"
                                    />
                                )}
                                <div className={styles.projectDescription}>
                                    {selected.details.description}
                                </div>
                                {mapType === 'listed' ? (
                                    <>
                                        <div className={styles.buyToken}>
                                            <Button
                                                style={{
                                                    paddingTop: 2,
                                                    paddingBottom: 2,
                                                }}
                                                color="primary"
                                                variant="contained"
                                                size="small"
                                            >
                                                Buy for $
                                                {
                                                    (selected as ListedToken)
                                                        .price
                                                }
                                            </Button>
                                            <div
                                                style={{
                                                    width: '290px',
                                                    height: '10',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                <ProgressBar
                                                    striped
                                                    variant="success"
                                                    now={
                                                        ((selected as ListedToken)
                                                            .sold /
                                                            (selected as ListedToken)
                                                                .batchSize) *
                                                        100
                                                    }
                                                    label={`${
                                                        (selected as ListedToken)
                                                            .sold
                                                    } / ${
                                                        (selected as ListedToken)
                                                            .batchSize
                                                    } sold`}
                                                />
                                            </div>
                                            {/*  */}
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.buyToken}>
                                        <text>
                                            You own{' '}
                                            {
                                                (selected as OwnedToken)
                                                    .ownedEditions.length
                                            }{' '}
                                            /{' '}
                                            {(selected as OwnedToken).batchSize}{' '}
                                            tokens
                                        </text>
                                    </div>
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}
        </>
    )
}

export default NewFoundTreesMap
