import { Plus } from "../../assets/icons"
import './Board.scss'

export const Board = () => {

    return (
        <div className="board">
            <p className="title">
                Name
            </p>
            <p className="card">
                Sth  to do
            </p>
            <p className="card-sub">
                Sth  to do
            </p>
            <input 
                className="card-new"
                placeholder="Title of the new card..."
            />
            <button className="card-create">
                <Plus />
                <p>Add a card</p>
            </button>
        </div>
    )
}