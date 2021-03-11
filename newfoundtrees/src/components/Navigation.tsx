import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AuthContext from '../context/AuthContext'
import LoginMenu from './LoginMenu'

const LABELS = {
    projects: 'Tokens',
    tokens: 'Art',
    about: 'About',
}

const useNavItemStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        fontSize: 12,
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,

            '& .nav-icon': {
                display: 'block',
            },
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2),
            width: '100%',
            '@media (min-height: 700px)': {
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
            },
        },
    },
    iconRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        fontSize: 12,
        color: theme.palette.text.secondary,
        '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,

            '& .nav-icon': {
                display: 'block',
            },
        },
    },
    icon: {
        display: 'flex',
        width: 28,
        height: 28,
    },
    label: {
        marginTop: theme.spacing(1),
        lineHeight: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
    },
    title: {
        marginTop: theme.spacing(1),
        lineHeight: 1,
        fontFamily: 'Teko',
        fontWeight: 700,
        fontSize: 25,
        color: 'rgba(255, 255, 255)',
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
    },
}))

interface NavItemProps {
    as?: typeof NavLink
    name: 'projects' | 'tokens' | 'about'
    to: '/projects' | '/' | '/'
}

const NavItem = ({ as: Comp = NavLink, name, to }: NavItemProps) => {
    const classes = useNavItemStyles()

    return (
        <Comp className={classes.root} {...{ to }}>
            <div className={classes.label}>{LABELS[name]}</div>
        </Comp>
    )
}

const TitleItem = () => {
    const classes = useNavItemStyles()

    return (
        <NavLink className={classes.root} to={'/'}>
            <div className={classes.title}>NEWFOUNDTREES</div>
        </NavLink>
    )
}

const useHorizontalStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        position: 'fixed',
        backgroundColor: theme.palette.background.paper,
        top: 0,
        bottom: 0,
        left: 0,
        width: '100vw',
        paddingRight: theme.spacing(3),
        height: 100,
        zIndex: 10,
    },
    narrowRoot: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'fixed',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        height: 100,
        zIndex: 10,
    },
    wrapper: {
        display: 'flex',
        width: '100pc',
        alignItems: 'space-between',
        justifyContent: 'flex-end',
        justifySelf: 'flex-end',
        flexDirection: 'row',
        paddingRight: theme.spacing(2),
    },
    pill: {
        borderRadius: 15,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        pointerEvents: 'all',
        display: 'flex',
        color: 'white',
    },
    navList: {
        padding: 0,
        margin: 0,
        display: 'flex',
        listStyle: 'none',
        pointerEvents: 'none',
        justifyContent: 'space-between',
        width: '100%',
    },
    center: {
        alignItems: 'center',
        pointerEvents: 'all',
        marginLeft: theme.spacing(5),
        justifyContent: 'center',
        display: 'flex',
        color: 'white',
    },
}))

const HorizontalNavigation = ({
    loggedIn,
    transparent = false,
}: {
    loggedIn: boolean
    transparent?: boolean
}) => {
    const { signIn, signOut, accountDetails } = React.useContext(AuthContext)

    const classes = useHorizontalStyles()
    return (
        <>
            <nav
                className={classes.root}
                style={
                    transparent
                        ? {
                              backgroundColor: 'transparent',
                          }
                        : {}
                }
            >
                <ul className={classes.navList}>
                    <li className={classes.center}>
                        <Link to="/" target="_blank" rel="noopener noreferrer">
                            <TitleItem />
                        </Link>
                    </li>
                    <div className={classes.wrapper}>
                        <div className={classes.pill}>
                            <li className={classes.center}>
                                <LoginMenu
                                    {...{ accountDetails, signIn, signOut }}
                                />
                            </li>
                            <li className={classes.center}>
                                <NavItem to={`/projects`} name="projects" />
                            </li>
                            <li className={classes.center}>
                                <NavItem to={`/`} name="tokens" />
                            </li>
                            <li className={classes.center}>
                                <NavItem to={`/`} name="about" />
                            </li>
                        </div>
                    </div>
                </ul>
            </nav>
        </>
    )
}

const Navigation = ({ loggedIn = false }: { loggedIn: boolean }) => {
    const location = useLocation()
    return (
        <HorizontalNavigation
            {...{ loggedIn, transparent: location.pathname !== '/' }}
        />
    )
}

export default Navigation
