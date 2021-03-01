import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import userIcon from '../assets/user.svg'
import logoSmall from '../assets/logo_transparent.png'
import AuthContext from '../context/AuthContext'
import { Button } from '@material-ui/core'

const LABELS = {
    projects: 'Projects',
    tokens: 'My tokens',
    user: 'Account',
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
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
    },
}))

interface NavItemProps {
    as?: typeof NavLink
    name: 'projects' | 'tokens'
    to: '/projects' | '/tokens'
}

interface NavItemIconProps {
    as?: typeof NavLink
    name: 'user'
    to: '/login'
}

const NavItem = ({ as: Comp = NavLink, name, to }: NavItemProps) => {
    const classes = useNavItemStyles()

    return (
        <Comp className={classes.root} {...{ to }}>
            <div className={classes.label}>{LABELS[name]}</div>
        </Comp>
    )
}

const ICONS = {
    user: userIcon,
}

const NavItemIcon = ({ as: Comp = NavLink, name, to }: NavItemIconProps) => {
    const { signIn, signOut, accountDetails } = React.useContext(AuthContext);

    const classes = useNavItemStyles()

    return (
        <Button className={classes.iconRoot} variant='text' onClick={() => {accountDetails === null ? signIn() : signOut()}}>
            <img src={ICONS[name]} alt="" className={classes.icon} />
        </Button>
    )
}

const useHorizontalStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    pill: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: 'flex',
    },
    accountPill: {
        backgroundColor: '#fff',
        borderRadius: 35,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: 'flex',
    },
    navList: {
        padding: 0,
        margin: 0,
        display: 'flex',
        listStyle: 'none',
        width: '100%',
    },
    logoSmall: {
        display: 'block',
        backgroundColor: '#fff',
        width: 85,
        height: 85,
        borderRadius: 15,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(3),
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
}))

const HorizontalNavigation = ({
    loggedIn,
    transparent = false,
}: {
    loggedIn: boolean
    transparent?: boolean
}) => {
    const classes = useHorizontalStyles()
    return (
        <>
            <nav className={classes.root} style={transparent ? {
                        backgroundColor: 'transparent',
            } : {}}>
                <ul
                    className={classes.navList}
                >
                    <li className={classes.center}>
                        <Link to="/" target="_blank" rel="noopener noreferrer">
                            <img
                                src={logoSmall}
                                className={classes.logoSmall}
                                alt="logo"
                            />
                        </Link>
                    </li>
                    <div className={classes.wrapper}>
                        <div className={classes.pill}>
                            <li className={classes.center}>
                                <NavItem to={`/projects`} name="projects" />
                            </li>
                            <li className={classes.center}>
                                {loggedIn && (
                                    <NavItem to={`/tokens`} name="tokens" />
                                )}
                            </li>
                        </div>
                        <div className={classes.accountPill}>
                            <li
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <NavItemIcon
                                    name="user"
                                    to="/login"
                                ></NavItemIcon>
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
