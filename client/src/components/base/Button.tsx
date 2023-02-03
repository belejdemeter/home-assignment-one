import {ReactNode} from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>{
    children: ReactNode,
    loading?: boolean,
    block?: boolean,
    ghost?: boolean
}

function Button(props: ButtonProps) {
    const {children, loading = false, className, block, ghost, ...rest} = props;
    const classes = ['btn', className]

    if (loading) {
        classes.push('loading')
    }

    if (block) {
        classes.push('w-full')
    }

    if (ghost) {
        classes.push('btn-ghost')
    }

    return <button className={classes.join(' ')} {...rest}>{ children }</button>
}

export default Button