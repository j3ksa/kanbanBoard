import { Plus } from "../../assets/icons"
import './BoardCreate.scss'
import { useDispatch, useSelector } from "react-redux"
import { addBoard } from "../../store/slices"
import { useState } from "react"
import { RootState } from '../../store/store'
import { useLocation } from "react-router-dom"

export const BoardCreate = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const workId = Number(searchParams.get('workId')) || 1
    const [showInput, setShowInput] = useState(false)
    const [boardName, setBoardName] = useState('')
    const boards = useSelector((state: RootState) => state.app.boards.boards)

    const handleAdd = () => {
        setShowInput(false)
        if (boardName.length !== 0) {
            dispatch(addBoard({
                id: `board-${boards.length + 1}`,
                workspaceId: workId,
                name: boardName,
            }))
        }
        setBoardName('')
    }

    const handleCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            handleAdd()
        }
    }

    return (
        <>
            {showInput ?
                <input
                    className="board-change"
                    placeholder='Title of the new list...'
                    onChange={(e) => setBoardName(e.target.value)}
                    onBlur={handleAdd}
                    onKeyDown={handleCard}
                    autoFocus
                    required
                />
                :
                <button
                    className="board-create"
                    onClick={() => setShowInput(true)}
                >
                    <Plus />
                    Add another list
                </button>
            }
        </>
    )
}