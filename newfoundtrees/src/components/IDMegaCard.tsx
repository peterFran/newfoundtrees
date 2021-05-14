import { IconButton, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'
import { NewFoundToken } from '../domain/Token'
import PlainMegaCard from './PlainMegaCard'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Breadcrumbs from './Breadcrumbs'

interface TitledMegaCardProps {
    token: NewFoundToken
}

const CARD_HEIGHT = 670
const NUMBER_CARDS = 3

const useStyles = makeStyles((theme) => ({
    veil: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        transition: 'top 2s',
        height: `${CARD_HEIGHT * NUMBER_CARDS + 2}px`,
        borderRadius: 10,
        opacity: 1,
        background: `linear-gradient(${theme.palette.secondary.light} 0%, ${theme.palette.secondary.light} 15%, rgba(255,255,255, 100) 33%, ${theme.palette.primary.dark} 100%)`,
    },
}))

const IDMegaCard = ({ token }: TitledMegaCardProps) => {
    const [index, setIndex] = React.useState(0)
    const styles = useStyles()
    return (
        <PlainMegaCard>
            <div
                className={styles.veil}
                style={{ top: `${-index * CARD_HEIGHT}px` }}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: `${CARD_HEIGHT - 100}px`,
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    zIndex: 100,
                }}
            >
                <IconButton
                    color="primary"
                    aria-label="show more"
                    onClick={() => {
                        setIndex((index + 1) % NUMBER_CARDS)
                    }}
                    component="span"
                >
                    <KeyboardArrowDownIcon fontSize="large" />
                </IconButton>
                <div style={{ width: '20%', position: 'absolute', right: '10%' }}>
                    <Breadcrumbs quantity={NUMBER_CARDS} index={index} />
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: `${-index * CARD_HEIGHT}px`,
                    display: 'flex',
                    width: '100%',
                    height: `${NUMBER_CARDS * CARD_HEIGHT}px`,
                    transition: 'top 2s',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        height: `${CARD_HEIGHT}px`,
                        padding: 25,

                        width: '100%',
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                writingMode: 'vertical-rl',
                                textAlign: 'left',
                                color: 'white',
                                fontSize: 63,
                            }}
                        >
                            ID
                        </Typography>
                    </div>
                    <div
                        style={{
                            height: '100%',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                color: 'white',
                                writingMode: 'vertical-rl',
                                textAlign: 'left',
                                overflow: 'visible',
                                fontSize: 63,
                            }}
                        >
                            {token.details.category}
                        </Typography>
                        <Typography
                            variant="h5"
                            style={{
                                color: 'white',
                                writingMode: 'vertical-rl',
                                textAlign: 'left',
                                overflow: 'visible',
                                fontSize: 63,
                            }}
                        >
                            NFTREE #{token.edition}
                        </Typography>
                    </div>
                </div>
                <div
                    style={{
                        height: `${CARD_HEIGHT}px`,
                        padding: 25,
                        paddingTop: 0,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <img
                        width="100%"
                        style={{ borderRadius: '5px' }}
                        src={`${token.details.cover}`}
                        height="auto"
                        alt="cover"
                    />
                </div>
                <div
                    style={{
                        height: `${CARD_HEIGHT}px`,
                        padding: 25,
                        paddingTop: 0,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <video
                        width="100%"
                        height="auto"
                        style={{ borderRadius: '5px' }}
                        controls
                    >
                        <source
                            src={`${token.details.content}`}
                            type="video/mp4"
                            // poster="https://www.example.com/poster.png"
                            // primaryColor="red"
                            // other props
                        />
                    </video>
                </div>
            </div>
        </PlainMegaCard>
    )
}

export default IDMegaCard
