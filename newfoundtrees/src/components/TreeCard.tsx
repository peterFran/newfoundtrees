import * as React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { NewFoundToken } from '../domain/Token'
import ImpactScore from './ImpactScore'
import { useHistory } from 'react-router-dom'
interface TreeCardProps {
    token: NewFoundToken
    showContent?: boolean
    fixed?: boolean
}

const useStyles = makeStyles((theme) => ({
    box: {
        flex: 1,
        minWidth: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderStyle: 'solid',
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.secondary.main,
        boxShadow: '0px 4px 4px 0px #00000040',
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
        padding: theme.spacing(8),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        flexDirection: 'column',
        zIndex: 5,
    },
    bottom: {
        flex: 1,
        height: '50%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'flex-end',
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
        marginTop: theme.spacing(2),
    },
}))

const TreeCard = ({
    token,
    showContent = false,
    fixed = false,
}: TreeCardProps) => {
    const styles = useStyles()

    const history = useHistory()
    const handleOnClick = React.useCallback(
        (e) => {
            if (fixed) {
                e.preventDefault()
                e.stopPropagation()
            } else {
                history.push(`/token/${token.id}`)
            }
        },
        [history, token.id, fixed]
    )
    const handleDoubleClick = React.useCallback(
        (e) => {
            console.log(e)
            history.push(`/token/${token.id}`)
        },
        [history, token.id]
    )

    return (
        <div
            className={styles.box}
            style={
                fixed
                    ? {
                          width: 300,
                          height: 520,
                          display: 'inline-flex',
                          alignSelf: 'center',
                      }
                    : {minWidth: 250}
            }
            onClick={handleOnClick}
            onDoubleClick={handleDoubleClick}
        >
            <div className={styles.inner}>
                <div style={{ minHeight: '30%' }}>
                    <Typography
                        variant="h2"
                        color="primary"
                        align="left"
                        style={{ paddingBottom: 10, fontSize: 27 }}
                    >
                        {token.details.name}
                    </Typography>
                </div>
                <div>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        align="left"
                    >
                        {token.details.description}
                    </Typography>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.bottom}>
                        <div className={styles.scoreBlock}>
                            <div className={styles.scoreBlockElement}>
                                <span>
                                    <Typography
                                        variant="body2"
                                        color="primary"
                                        style={{ textTransform: 'capitalize' }}
                                    >
                                        {token.details.category}
                                    </Typography>
                                </span>
                            </div>

                            <div className={styles.scoreBlockElement}>
                                <Typography variant="body2">IMPACT</Typography>
                                <ImpactScore
                                    score={token.details.impactScore}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TreeCardItem = ({ token }: TreeCardProps) => {
    return (
        <Grid item xs={12} sm={6} md={3} style={{ height: '520px'}}>
            <TreeCard token={token} fixed={false} />
        </Grid>
    )
}

export const TreeCardItemBigger = ({ token }: TreeCardProps) => {
    return (
        <Grid item xs={9} sm={6} md={4} style={{ height: '520px' }}>
            <TreeCard token={token} />
        </Grid>
    )
}

export default TreeCard
