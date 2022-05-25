import React, {FunctionComponent} from 'react'
import { NavLink } from 'react-router-dom'

interface NavigationSubComponents {
    Link: FunctionComponent<LinkProps>
}

const Navigation: FunctionComponent & NavigationSubComponents = ({children}) => {
    return (
        <>{children}</>
    )
}


interface LinkProps {
    Icon: FunctionComponent
    label: string
    to: string
    disabled?: boolean
}

const Link: FunctionComponent<LinkProps> = ({Icon, label, to, disabled = false, children}) => {
    return (
        <NavLink to={to} style={{fontSize: 13}} onClick={(e) => disabled && e.preventDefault()} className={`font-medium inline-flex items-center leading-none p-2 py-2 ${disabled && 'opacity-25'}`}><Icon className="mr-2" />{label}</NavLink>
    )
}


Navigation.Link = Link

export default Navigation