import * as React from 'react'

import treeGif from '../assets/pixil-gif-drawing.gif'

const ImpactScore = ({ score }: { score: number }) => {
    return (
        <div>
            <ImpactTree on={score >= 1}/>
            <ImpactTree on={score >= 2}/>
            <ImpactTree on={score >= 3}/>
            <ImpactTree on={score >= 4}/>
            <ImpactTree on={score >= 5}/>
        </div>
    )
}

const ImpactTree = ({ on }: { on: boolean }) => {
    if(on){
       return <img src={treeGif} style={{ paddingLeft: 10, height: 18 }}></img>
    } else {
        return <img src={treeGif} style={{ paddingLeft: 10, height: 18, opacity: 0.2}}></img>
    }
}

export default ImpactScore
