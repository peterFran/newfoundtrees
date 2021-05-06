import * as React from 'react'
import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core'
import treeImg from '../assets/pixel-tree.png'
import { OldToken, Thing, Metadata, TokenDetails, Token } from '../domain/Token';
import ImpactScore from './ImpactScore'
import Contours from './svg/Contours'
import { Link } from 'react-router-dom'
import { api, getToken } from '../outbound/tokenClient'
interface TreeCardProps {
    token: OldToken
    showContent?: boolean
}

interface TreeCardNewProps {
    thing: Thing
}

const useStyles = makeStyles((theme) => ({
    box: {
        flex: 1,
        minWidth: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.spacing(1),
        borderRadius: 15,
        borderStyle: 'solid',

        borderColor: theme.palette.primary.dark,
    },
    logo: {
        display: 'block',
        width: '100%',
        height: 'auto',
        color: 'black',
        zIndex: 0,
    },
    background: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },

    background2: {
        height: '100%',
        width: '100%',
        background:
            'linear-gradient(transparent 0%, rgba(255,255,255, 100) 70%)',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        transform: 'translateY(-100%)',
    },

    inner: {
        height: '100%',
        display: 'flex',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        flexDirection: 'column',
        zIndex: 5,
        transform: 'translateY(-100%)',
    },
    top: {
        flex: 1,
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        height: '50%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreBlock: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column',
        width: '100%',
    },
    scoreBlockElement: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
}))

const GetContourColour = ({
    category,
}: {
    category: 'reforestation' | 'rewilding' | 'cultural'
}): string => {
    const theme = useTheme()
    switch (category) {
        case 'reforestation': {
            return theme.palette.primary.light
        }
        case 'rewilding': {
            return theme.palette.secondary.main
        }
        case 'cultural': {
            return theme.palette.secondary.light
        }
    }
}

const TreeCard = ({ token, showContent = false }: TreeCardProps) => {
    const styles = useStyles()

    return (
        <Link to={`/token/${token.id}`}>
            <div className={styles.box}>
                <div className={styles.background}>
                    <div className={styles.background}>
                        <Contours
                            className={styles.logo}
                            contourColour={GetContourColour({
                                category: token.details.category,
                            })}
                        />
                    </div>
                    <div className={styles.background2}></div>
                </div>

                <div className={styles.inner}>
                    <div className={styles.top}>
                        <div className={styles.top}>
                            <Typography
                                variant="h2"
                                color="primary"
                                align="left"
                                style={{ paddingBottom: 50 }}
                            >
                                {token.details.name}
                            </Typography>
                        </div>
                        {showContent && (
                            <div className={styles.bottom}>
                                <video
                                    autoPlay
                                    width="100%"
                                    height="auto"
                                    controls
                                >
                                    <source
                                        src="https://bpybatlqkq3w52jsp2wupba64i6xg6glpghikcmx6p65enqjyu7a.arweave.net/C_AQTXBUN27pMn6tR4Qe4j1zeMt5joUJl_P90jYJxT4"
                                        type="video/mp4"
                                        // poster="https://www.example.com/poster.png"
                                        // primaryColor="red"
                                        // other props
                                    />
                                </video>
                            </div>
                        )}
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.top}>
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                align="justify"
                            >
                                {token.details.description}
                            </Typography>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.scoreBlock}>
                                <div className={styles.scoreBlockElement}>
                                    <span>
                                        <Typography variant="body2">
                                            {token.details.category.toLocaleUpperCase()}
                                        </Typography>
                                    </span>
                                    <img
                                        src={treeImg}
                                        style={{ paddingLeft: 10 }}
                                        alt="tree"
                                    ></img>
                                </div>

                                <div className={styles.scoreBlockElement}>
                                    <Typography variant="body2">
                                        IMPACT
                                    </Typography>
                                    <ImpactScore
                                        score={token.details.impactScore}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const TreeCardItem = ({ token }: TreeCardProps) => {
    return (
        <Grid item xs={12} sm={6} md={3} style={{ height: '520px' }}>
            <TreeCard token={token} />
        </Grid>
    )
}

export const TreeCardItemMeta = ({ thing }: TreeCardNewProps) => {
    const [state, setState] = React.useState<OldToken | null>(null)
    React.useEffect(() => {
        getToken(thing).then((
            bits
        ) => setState(bits))
    }, [thing])
    return (
        <Grid item xs={12} sm={6} md={3} style={{ height: '520px' }}>
            {state && <TreeCard token={state} />}
        </Grid>
    )
}

export default TreeCard
