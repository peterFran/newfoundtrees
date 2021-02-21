import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { InfoWindow } from '@react-google-maps/api'
import { OwnedToken } from '../domain/Token'
import ReactCardFlip from 'react-card-flip'
import OwnedContent from './OwnedContent'

interface OwnedInfoWindowProps {
    token: OwnedToken
    onCloseClick: () => void
}

const useStyles = makeStyles((theme) => ({
    projectDescription: {
        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
        // width: '300px'
    },
    tokenSummaryContainer: {
        // width: '100pc',
        width: '300px',

        fontFamily: ['sofia-pro', 'sans-serif'].join(','),
        zIndex: 2,
        alignItems: 'center'
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

const OwnedInfoWindow = ({ token, onCloseClick }: OwnedInfoWindowProps) => {
    const styles = useStyles()
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false)

    return (
        <InfoWindow
            position={{
                lat: token.details.coordinates.latitude,
                lng: token.details.coordinates.longitude,
            }}
            options={{
                pixelOffset: new window.google.maps.Size(0, -25),
            }}
            onCloseClick={onCloseClick}
            
        >
            <>
                <Button
                    style={{
                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        zIndex: 5,
                    }}
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    ↩
                </Button>
                {/* <div style={{width: '100pc', height: '100pc'}}> */}
                    <ReactCardFlip
                        isFlipped={isFlipped}
                        flipDirection="horizontal"
                    >
                        <div className={styles.tokenSummaryContainer}>
                            <div className={styles.tokenTitle}>
                                {token.details.name}
                            </div>

                            {(token.details.cover.endsWith('.jpg') ||
                                token.details.cover.endsWith('.png')) && (
                                <img
                                    src={token.details.cover}
                                    className={styles.tokenImage}
                                    alt="cover"
                                />
                            )}
                            <div className={styles.projectDescription}>
                                {token.details.description}
                            </div>
                            <div className={styles.buyToken}>
                                <p>
                                    You own {token.ownedEditions.length} /{' '}
                                    {token.batchSize} tokens
                                </p>
                            </div>
                        </div>
                        <div style={{width: '100pc'}}>
                            <OwnedContent token={token} />
                        </div>
                    </ReactCardFlip>
                {/* </div> */}
            </>
        </InfoWindow>
    )
}

export default OwnedInfoWindow
