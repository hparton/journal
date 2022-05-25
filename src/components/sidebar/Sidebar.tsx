import React, {FunctionComponent} from 'react'
import Create, {Props as CreateProps} from './Create'

interface SidebarSubComponents {
    Create: FunctionComponent<CreateProps>
}

const Sidebar: FunctionComponent & SidebarSubComponents = ({children}) => {
    return (
        <div style={{width: 220, backgroundColor: '#1F2023', paddingTop: 60}} className="border-r border-border flex flex-shrink-0 flex-col p-4 h-full overflow-auto">{children}</div>
    )
}

Sidebar.Create = Create

export default Sidebar