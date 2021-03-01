import React, { ReactElement } from 'react'

const InfoBanner = ({ children }: { children?: ReactElement }) => {
    return (
        <>
            <div>
                <div className="container d-flex flex-column justify-content-center justify-content-lg-end align-items-center">
                    <div className="herobanner-row row pb-4 w-100">
                        <div className="col-12">{children && children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoBanner
