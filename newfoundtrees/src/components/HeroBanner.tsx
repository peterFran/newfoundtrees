import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        hero: {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 0.1,
            minHeight: '800px',
            backgroundColor: theme.palette.background.paper,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            [theme.breakpoints.down('lg')]: {
                marginBottom: 0,
            },

            [theme.breakpoints.down('md')]: {
                minHeight: '556px',
                paddingTop: '156px',
            },
        },

        heroTitle: {
            lineHeight: 1,
            textAlign: 'center',
            fontSize: '8em',
            fontFamily: 'Nunito',
            fontWeight: 700,
            color: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',

            [theme.breakpoints.down('sm')]: {
                marginBottom: '1rem',
                fontSize: '3rem',
            },
        },

        heroLink: {
            color: theme.palette.common.black,
        },

        heroText: {
            maxWidth: '570px',
            margin: '0 auto',
            textAlign: 'center',
        },
    }
})
const HeroBanner = ({
    title,
    image,
    children,
}: {
    image: string
    title: string
    children?: ReactElement
}) => {
    const styles = useStyles()
    return (
        <>
            <div>
                <div className="container d-flex flex-column justify-content-center justify-content-lg-end align-items-center">
                    <div className="herobanner-row row pb-4 w-100" style={{display: 'flex', height: '100vh'}}>
                        <div className="col-12" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent:"space-evenly"}}>
                            <h1
                                className={`${styles.heroTitle} mb-3 mt-7`}
                                style={{ backgroundImage: `url(${image})` }}
                            >
                                {title}
                            </h1>

                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroBanner
