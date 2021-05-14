import * as React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    sphere: {
        height: '0.7em',
        margin: '0.8em',
        width: '0.7em',
        borderRadius: '50%',
        float: 'left',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        opacity: 0.5,
        transition: 'opacity .2s linear',
        WebkitTransition: 'opacity .2s linear',
        backgroundColor: theme.palette.secondary.light,
    },
}))

interface BreadcrumbProps {
    quantity: number
    index: number
    direction?: 'row' | 'column'
}

const Breadcrumbs = ({
    quantity,
    index,
    direction = 'column',
}: BreadcrumbProps) => {
    const crumbs = Array.from(Array(quantity).keys())

    const styles = useStyles()
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                flexDirection: direction,
            }}
        >
            {crumbs.map((idx) => {
                return (
                    <div
                        className={styles.sphere}
                        key={idx}
                        style={
                            index === idx
                                ? {
                                      opacity: 1,
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
