import './WorkspaceBoards.scss'
import { Board } from '../board/Board'
import { BoardCreate } from '../boardCreate/BoardCreate'

export const WorkspaceBoards = () => {

    return (
        <div className="workspace-boards">
            <Board />
            <BoardCreate />
        </div>
    )
}