interface TextFieldProps extends React.ComponentPropsWithoutRef<'input'> {
    label?: string,
    placeholder: string
}

function TextField({ label, placeholder, ...rest }: TextFieldProps) {
    return (
        <div className="form-control">
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input type="text" placeholder={placeholder} className="input input-bordered" {...rest} />
        </div>
    )
}

export default TextField