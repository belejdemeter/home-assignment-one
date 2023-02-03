import {ReactNode} from "react";

interface CardProps {
    children: ReactNode,
    shadow?: 'sm' | 'md'
}

function Card({children, shadow = 'md'}: CardProps) {
    const classes = ['card flex-shrink-0 w-full bg-base-100'];

    switch (shadow) {
        case "md":
            classes.push('shadow-md')
            break;
        case "sm":
            classes.push('shadow-sm')
            break;
        default:
            classes.push('shadow-md')
    }

    return (
        <div className={classes.join(' ')}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card