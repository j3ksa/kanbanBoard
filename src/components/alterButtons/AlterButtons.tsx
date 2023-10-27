import { Plus, Check, Edit, Delete, Cancel } from "../../assets/icons"
import './AlterButtons.scss'

interface Props {
    add?: React.Dispatch<React.SetStateAction<boolean>>
    check?: () => void
    correctButton?: boolean
    edit: React.Dispatch<React.SetStateAction<boolean>>
    deleteFnc: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const AlterButtons = ({ add, check, correctButton, edit, deleteFnc }: Props) => {

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
            {check &&
                <button
                    className='check'
                    onClick={check}
                >
                    {!correctButton
                        ?
                        <Check />
                        :
                        <Cancel />
                    }

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