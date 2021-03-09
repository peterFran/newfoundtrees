import { Button, makeStyles } from "@material-ui/core"
import { InfoWindow } from "@react-google-maps/api"
import React from "react"
import ProgressBar from "react-bootstrap/esm/ProgressBar"
import { ListedToken } from '../domain/Token';

interface ListedInfoWindowProps {
    token: ListedToken
    onCloseClick: () => void
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



const ListedInfoWindow = ({token, onCloseClick}: ListedInfoWindowProps) => {
    const styles = useStyles()

    const onLoad = React.useCallback(function callback(infoWindow) {
        infoWindow.setZIndex(3);
        // const bounds = new window.google.maps.LatLngBounds({lat: -180, lng: -90},  {lat: 180, lng: 90})
        // map.fitBounds(bounds)
    }, [])

    return (
        <InfoWindow
        position={{
            lat: token.details.coordinates.latitude,
            lng: token.details.coordinates.longitude,
        }}
        zIndex={20}
        options={{
            pixelOffset: new window.google.maps.Size(
                0,
                -25
            ),
        }}
        onLoad={onLoad}
        onCloseClick={onCloseClick}
    >
        <div className={styles.tokenSummaryContainer}>
            <div className={styles.tokenTitle}>
                {token.details.name}
            </div>

            {(token.details.cover.endsWith('.jpg') ||
                token.details.cover.endsWith(
                    '.png'
                )) && (
                <img
                    src={token.details.cover}
                    className={styles.tokenImage}
                    alt="cover"
                />
            )}
            <div className={styles.projectDescription}>
                {token.details.description}
            </div>
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
                                token.price
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
                                    (token.sold /
                                        token.batchSize) *
                                    100
                                }
                                label={`${
                                    token.sold
                                } / ${
                                    token.batchSize
                                } sold`}
                            />
                        </div>
                        {/*  */}
                    </div>
                </>
        </div>
    </InfoWindow>
    )
}

export default ListedInfoWindow