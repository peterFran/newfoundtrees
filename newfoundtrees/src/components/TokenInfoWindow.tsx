import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { InfoWindow } from '@react-google-maps/api'
import { Token } from '../domain/Token'
import ReactCardFlip from 'react-card-flip'
import OwnedContent from './OwnedContent'
import ProgressBar from 'react-bootstrap/esm/ProgressBar'

interface TokenInfoWindowProps {
    token: Token
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
        alignItems: 'center',
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

const TokenInfoWindow = ({ token, onCloseClick }: TokenInfoWindowProps) => {
    const styles = useStyles()
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false)

    const summary = (
        <div className={styles.tokenSummaryContainer}>
            <div className={styles.tokenTitle}>{token.details.name}</div>

            <div className={styles.projectDescription}>
                {token.details.description}
            </div>

            <div className={styles.buyToken}>
                <p>
                    You own {token.ownedEditions.length} / {token.batchSize}{' '}
                    tokens
                </p>
            </div>
            {token.sold < token.batchSize && (
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
                            Buy for ${token.price}
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
                                now={(token.sold / token.batchSize) * 100}
                                label={`${token.sold} / ${token.batchSize} sold`}
                            />
                        </div>
                        {/*  */}
                    </div>
                </>
            )}
        </div>
    )

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
                {token.ownedEditions.length > 0 ? (
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
                        <ReactCardFlip
                            isFlipped={isFlipped}
                            flipDirection="horizontal"
                        >
                            {summary}
                            {token.ownedEditions.length > 0 && (
                                <div style={{ width: '100pc' }}>
                                    <OwnedContent token={token} />
                                </div>
                            )}
                        </ReactCardFlip>
                    </>
                ) : (
                    summary
                )}
                {/* </div> */}
            </>
        </InfoWindow>
    )
}

export default TokenInfoWindow
