import { Button, makeStyles, Typography } from '@material-ui/core'
import { NewFoundToken } from '../domain/Token'
import PlainMegaCard from './PlainMegaCard'
import treeTrunk from '../assets/tokenTree.png'
import ImageIcon from '@material-ui/icons/Image'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import FsLightbox from 'fslightbox-react'
import { useState } from 'react'

interface TitledMegaCardProps {
    token: NewFoundToken
}

const CARD_HEIGHT = 600

const useStyles = makeStyles((theme) => ({
    veil: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.primary.dark,
        zIndex: 2,
        borderRadius: 15,
        height: `${CARD_HEIGHT}px`,

        opacity: 0.8,
    },
    image: {
        position: 'absolute',
        top: 60,
        bottom: -60,
        left: -60,
        right: 60,
        background: `url(${treeTrunk})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        overflow: 'visible',
        borderRadius: 15,
        height: `${CARD_HEIGHT}px`,

        zIndex: 1,
    },
    box: {
        display: 'flex',
        padding: theme.spacing(5),
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(15),
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        height: `${CARD_HEIGHT}px`,
        borderRadius: 15,
        overflow: 'visible',
    },
    button: {
        backgroundColor: 'white',
        color: theme.palette.primary.main,
        opacity: 1,
        margin: 5,
    },
}))

const IDMegaCard = ({ token }: TitledMegaCardProps) => {
    const styles = useStyles()
    const [galleryToggler, setGalleryToggler] = useState<boolean>(false)
    const [videoToggler, setVideoToggler] = useState<boolean>(false)

    return (
        <>
            <FsLightbox
                toggler={galleryToggler}
                sources={[
                    token.details.cover
                ]}
            />
            <FsLightbox
                toggler={videoToggler}
                sources={[
                    token.details.content
                ]}
            />
            <PlainMegaCard border={false} overflow={true}>
                <div className={styles.box}>
                    <div className={styles.veil}></div>
                    <div className={styles.image}></div>
                    <div style={{ zIndex: 5 }}>
                        <Typography
                            variant="h1"
                            color="textSecondary"
                            align="left"
                            style={{ color: 'white' }}
                        >
                            {token.details.name} NFT
                        </Typography>
                        <Typography
                            variant="h1"
                            color="textSecondary"
                            align="left"
                            style={{ color: 'white', fontWeight: 300 }}
                        >
                            Ref{token.id.slice(0, 7)}
                        </Typography>
                    </div>
                    <div
                        style={{
                            zIndex: 5,
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => setGalleryToggler(!galleryToggler)}
                        >
                            View Gallery
                            <ImageIcon
                                fontSize="small"
                                style={{ marginLeft: 2 }}
                            />
                        </Button>
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => setVideoToggler(!videoToggler)}
                        >
                            Watch Film
                            <PlayCircleOutlineIcon
                                fontSize="small"
                                style={{ marginLeft: 2 }}
                            />
                        </Button>
                    </div>
                </div>
            </PlainMegaCard>
        </>
    )
}

export default IDMegaCard
