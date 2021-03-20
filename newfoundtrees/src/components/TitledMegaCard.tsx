import { Typography } from '@material-ui/core'
import * as React from 'react'
import MegaCard from './MegaCard';

interface TitledMegaCardProps {
    title: String
    body: String
    footer: React.ReactNode
}

const TitledMegaCard = ({ title, body, footer }: TitledMegaCardProps) => {
    return (
        <MegaCard>
            <Typography
                variant="h1"
                style={{ color: 'white', paddingTop: '40px' }}
            >
                {title}
            </Typography>
            <Typography variant="body1" style={{ color: 'white' }}>
                {body}
            </Typography>
            <div
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                {footer}
            </div>
        </MegaCard>
    )
}

export default TitledMegaCard
