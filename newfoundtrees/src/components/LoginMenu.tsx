import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SafeIcon from '@material-ui/icons/AccountBalance'
import AccountDetails from '../domain/AccountDetails'
import { Button } from '@material-ui/core'

const StyledMenu = withStyles({
    paper: {
        marginTop: 5,
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
    button: {
        backgroundColor: theme.palette.background.default,
    },
}))(MenuItem)

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 30,
        padding: theme.spacing(2),
        pointerEvents: 'all',
        marginTop: theme.spacing(1),
        lineHeight: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
        fontFamily: 'Arial',
        fontSize: 12
    },
}))

interface LoginMenuProps {
    accountDetails: AccountDetails | null
    signIn: () => void
    signOut: () => void
}

const LoginMenu = ({ accountDetails, signIn, signOut }: LoginMenuProps) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                size="medium"
                variant="text"
                className={classes.button}
                onClick={handleClick}
            >
                Wallet
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {accountDetails ? (
                    <>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SafeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${accountDetails.balance.available} Ⓝ`}
                            />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={signOut}>
                            <ListItemIcon>
                                <ArrowBackIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="LogOut" />
                        </StyledMenuItem>
                    </>
                ) : (
                    <>
                        <StyledMenuItem onClick={signIn}>
                            <ListItemIcon>
                                <ArrowForwardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="LogIn" />
                        </StyledMenuItem>
                    </>
                )}
            </StyledMenu>
        </div>
    )
}

export default LoginMenu
