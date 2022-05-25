import React, {FunctionComponent} from 'react'

interface Props {
    
}

const TitleBar: FunctionComponent<Props> = ({children}) => {
    return (
        <div className="border-b border-border w-full" style={{height: 58}}>
            {children}
        </div>
    )
}

export default TitleBar