import React from 'react'
import { NavLink } from 'react-router-dom'
// import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import brushDivider from '../assets/brush-divider.png'
import globeIcon from '../assets/location.svg'
import leavesIcon from '../assets/leaves.svg'
import LoginButton from './LoginButton'

const LABELS = {
    projects: 'Projects',
    tokens: 'My tokens',
}

const ICONS = {
    projects: globeIcon,
    tokens: leavesIcon,
}

const useNavItemStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(3),
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
    iconWrapper: {
        position: 'relative',
    },
    icon: {
        position: 'relative',
        display: 'block',
        width: 28,
        height: 28,
    },
    activeBg: {
        display: 'none',
        position: 'absolute',
        top: -3,
        left: -3,
        width: 20,
        height: 21,
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
    as?: typeof NavLink,
    name: "projects" | "tokens",
    to: "/projects" | "/tokens"
}

const NavItem = ({ as: Comp = NavLink, name, to }: NavItemProps) => {
    const classes = useNavItemStyles()

    return (
        <Comp className={classes.root} {...{to}}>
            <div className={classes.iconWrapper}>
                {/* <img
                    src={activeBg}
                    className={clsx('nav-icon', classes.activeBg)}
                    alt=""
                /> */}
                <img src={ICONS[name]} alt="" className={classes.icon} />
            </div>
            <div className={classes.label}>{LABELS[name]}</div>
        </Comp>
    )
}

const useMobileStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 24,
        zIndex: 10,
    },
    brush: {
        display: 'block',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 24,
        backgroundImage: `url(${brushDivider})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    inner: {
        display: 'flex',
        width: '100%',
        backgroundColor: '#fff',
    },
}))

const MobileNavigation = ({ loggedIn }: { loggedIn: boolean }) => {
    const classes = useMobileStyles()

    return (
        <nav className={classes.root}>
            <div className={classes.brush} />
            <div className={classes.inner}>
                <NavItem to={`/projects`} name="projects" />
                <NavItem to={`/tokens`} name="tokens" />
            </div>
        </nav>
    )
}

const useDesktopStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        // backgroundColor: '#fff',
        zIndex: 10,
    },
    pill: {
        backgroundColor: '#fff',
        borderRadius:15
    },
    top: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius:15,
        margin: theme.spacing(1)
    },
    logoSmall: {
        display: 'block',
        width: 60,
        height: 60,
        marginBottom: theme.spacing(3),
        '@media (min-height: 700px)': {
            marginBottom: theme.spacing(6),
        },
    },
    bottom: {
        display: 'flex',
        flexDirection: 'column',
    },
    separator: {
        height: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: '#D5DCDC',
    },
    account: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontSize: 12,
        lineHeight: 1,
        textAlign: 'center',
        textDecoration: 'none',
        '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
        },
    },
    avatar: {
        marginBottom: theme.spacing(1),
    },
}))

const DesktopNavigation = ({ loggedIn }: { loggedIn: boolean }) => {
    const classes = useDesktopStyles()
    return (
        <>
        <nav className={classes.root}>
            <div className={classes.top}>
                <NavItem to={`/projects`} name="projects" />
                {loggedIn && <NavItem to={`/tokens`} name="tokens" />}
            </div>
        <div style={{ padding: 10 }}><LoginButton /></div>
        </nav>
        </>
    )
}

const Navigation = ({ loggedIn = false }: { loggedIn: boolean }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

    if (matches) {
        return <DesktopNavigation {...{ loggedIn }} />
    }

    return <MobileNavigation {...{ loggedIn }} />
}

export default Navigation
