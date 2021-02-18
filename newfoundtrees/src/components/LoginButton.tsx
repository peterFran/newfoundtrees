import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ProgressButton from './ProgressButton'
import AuthContext from '../context/AuthContext'


const useStyles = makeStyles((theme) => ({
    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6),
    },
}))

const LoginButton = () => {
    const { signIn, signOut, accountDetails } = React.useContext(AuthContext);
    
    
    const classes = useStyles()

    return (
        <Box>
            {!accountDetails ? (
                <ProgressButton
                    className={classes.submit}
                    loading={false}
                    disabled={false}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => signIn()}
                >
                    Login
                </ProgressButton>
            ) : (
                <ProgressButton
                    loading={false}
                    disabled={false}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => {signOut()}}
                >
                    Logout
                </ProgressButton>
            )}
        </Box>
    )
}

export default LoginButton