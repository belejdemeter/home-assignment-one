interface AnswerErrorProps {
    error: string
}

function AnswerError(props: AnswerErrorProps) {
    const {error} = props;

    return (
        <div className='py-10 text-center fill-error text-error'>
            <div className='w-48 mx-auto mb-5'>
                <svg xmlns="http://www.w3.org/2000/svg"
                     version="1.1" id="Capa_1" viewBox="0 0 52 52">
                    <g>
                        <path
                            d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                        <path
                            d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0   s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36   s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293   c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"/>
                    </g>
                </svg>
            </div>
            <p className='text-2xl'>{ error }</p>
        </div>
    );
}

export default AnswerError;