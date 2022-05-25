import React, {FunctionComponent, MouseEventHandler} from 'react'
import { ReactComponent as CreateIcon } from '../../assets/icons/pencil-alt.svg'

export interface Props {
    label: string,
    onClick: MouseEventHandler
}

const Create: FunctionComponent<Props> = ({label, onClick}) => {
    return (
        <button
            {...{onClick}}
            className="font-medium leading-none inline-flex items-center p-2 py-2 rounded border border-border mb-3"
            style={{
                backgroundColor: '#262628',
                fontSize: 13
            }}
        >
            <CreateIcon className="mr-2" />{label}
        </button>

    )
}

export default Create