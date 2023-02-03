import React, {ReactNode} from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../base/Button";

interface BaseLayoutProps {
    children: ReactNode
}

function BaseLayout(props: BaseLayoutProps) {
    const { logout } = useAuth();

    return (
        <div className='bg-gray-100'>
            <div className='shadow-md bg-white'>
                <div className="navbar container ">
                    <div className="flex-1">
                        <div className="text-xl">Test Assigment</div>
                    </div>
                    <div className="flex-none">
                        <Button onClick={logout} ghost>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000"
                                 viewBox="0 0 380 380" width='24' height='24'>
                                <g>
                                    <g id="Sign_Out">
                                        <path
                                            d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                                        <path
                                            d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                                    </g>
                                </g>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
            <section className='container'>
                {props.children}
            </section>
        </div>
    )
}

export default BaseLayout;