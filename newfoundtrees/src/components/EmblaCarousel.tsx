import React, { useState, useEffect, useCallback } from 'react'
import { PrevButton, NextButton } from './EmblaCarouselButtons'
import { useEmblaCarousel } from 'embla-carousel/react'
import '../css/embla.css'
import { NewFoundToken } from '../domain/Token'
import TreeCard from './TreeCard'

interface CarouselProps {
    slides: NewFoundToken[]
}

const EmblaCarousel = ({ slides }: CarouselProps) => {
    const [viewportRef, embla] = useEmblaCarousel({
        inViewThreshold: 0.5,
        slidesToScroll: 1,
        skipSnaps: false,
    })
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
    const onSelect = useCallback(() => {
        if (!embla) return
        setPrevBtnEnabled(embla.canScrollPrev())
        setNextBtnEnabled(embla.canScrollNext())
    }, [embla])

    useEffect(() => {
        if (!embla) return
        embla.on('select', onSelect)
        onSelect()
    }, [embla, onSelect])

    return (
        <div  className="embla__fader">
            <div className="embla">
                <div className="embla__viewport" ref={viewportRef}>
                    <div className="embla__container">
                        {slides.map((slide, index) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__inner">
                                    <TreeCard
                                        fixed={true}
                                        token={slide}
                                        key={index}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
        </div>
    )
}

export default EmblaCarousel
