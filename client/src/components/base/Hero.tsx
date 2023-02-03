import React, {ReactNode} from "react";

interface HeroProps {
    children: ReactNode
}

function Hero({ children }: HeroProps) {
    return (
        <div className="hero min-h-screen bg-gray-100">
            <div className="hero-content lg:w-1/3 w-full">
                {children}
            </div>
        </div>
    )
}

export default Hero