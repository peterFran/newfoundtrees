import * as React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { ReactComponent as Logo } from '../assets/contours.svg'
import treeImg from '../assets/pixel-tree.png'
import treeGif from '../assets/pixil-gif-drawing.gif'
import { Token } from '../domain/Token'
import ImpactScore from './ImpactScore';
interface TreeCardProps {
    token: Token
}

const useStyles = makeStyles((theme) => ({
    box: {
        // padding: 15,
        flex: 1,
        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.spacing(1),
        borderRadius: 15,
        borderStyle: 'solid',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderColor: theme.palette.primary.main,

        // paddingBottom: '100%'
    },
    logo: {
        display: 'block',
        width: '100%',
        height: 'auto',
        zIndex: 0,
    },
    background: {
        height: '100%',
        width: '100%',
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

const TreeCard = ({ token }: TreeCardProps) => {
    const styles = useStyles()
    return (
        <>
            <div className={styles.box}>
                <div className={styles.background}>
                    <div className={styles.background}>
                        <Logo className={styles.logo} />
                    </div>
                    <div className={styles.background2}></div>
                </div>

                <div className={styles.inner}>
                    <div className={styles.top}>
                        <Typography variant="h2" color="secondary">
                            {token.details.name}
                        </Typography>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.top}>
                            <Typography variant="body1" color="secondary">
                                {token.details.description}
                            </Typography>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.scoreBlock}>
                                    <div className={styles.scoreBlockElement}
                                    >
                                        <Typography variant="body2">
                                            NFTREE
                                        </Typography>
                                        <img
                                            src={treeImg}
                                            style={{ paddingLeft: 10 }}
                                        ></img>
                                </div>

                                    <div className={styles.scoreBlockElement}
                                    >
                                        <Typography variant="body2">
                                            IMPACT
                                        </Typography>
                                        <ImpactScore score={token.details.impactScore}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TreeCard
