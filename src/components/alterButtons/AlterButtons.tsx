import { Plus, Edit, Delete } from "../../assets/icons"
import './AlterButtons.scss'

interface Props {
    add?: React.Dispatch<React.SetStateAction<boolean>>
    edit: React.Dispatch<React.SetStateAction<boolean>>
    deleteFnc: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const AlterButtons = ({ add, edit, deleteFnc }: Props) => {

    return (
        <div className='alter-buttons'>
            {add &&
                <button
                    className='add'
                    onClick={() => add(true)}
                >
                    <Plus />
                </button>
            }
            <button
                className='edit'
                onClick={() => edit(true)}
            >
                <Edit />
            </button>
            <button
                className='delete'
                onClick={deleteFnc}
            >
                <Delete />
            </button>
        </div>
    )
}