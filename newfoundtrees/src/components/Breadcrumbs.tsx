import * as React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    sphere: {
        height: '0.7em',
        width: '0.7em',
        borderRadius: '50%',
        float: 'left',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // transform: 'scale(.3)',
        // msTransform: 'scale(.3)',
        // WebkitTransform: 'scale(.3)',
        zIndex: 1,
        transition: 'transform .2s linear',
        backgroundColor: theme.palette.secondary.light,
    },
}))

interface BreadcrumbProps {
    quantity: number
    index: number
}

const Breadcrumbs = ({ quantity, index }: BreadcrumbProps) => {
    const crumbs = Array.from(Array(quantity).keys())

    const styles = useStyles()
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                flexDirection: 'row',
            }}
        >
            {crumbs.map((idx) => {
                return (
                    <div
                        className={styles.sphere}
                        style={
                            index === idx
                                ? {
                                      transform: 'scale(1.3)',
                                      msTransform: 'scale(1.3)',
                                      WebkitTransform: 'scale(1.3)',
                                  }
                                : {}
                        }
                        id="sphere1"
                    ></div>
                )
            })}
        </div>
    )
}

export default Breadcrumbs
