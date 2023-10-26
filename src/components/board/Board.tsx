import { Plus } from "../../assets/icons"
import './Board.scss'
import { useState } from "react"
import { AlterButtons } from "../alterButtons/AlterButtons"
import { setBoardName, removeBoard, addCard } from "../../store/slices"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "../card/Card"
import { RootState } from '../../store/store'
import { SortableContext, rectSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

interface Props {
    board: {
        id: string
        workspaceId: number
        name: string
    }
    isOverlay?: boolean
}

export const Board = ({ board, isOverlay }: Props) => {
    const dispatch = useDispatch()
    const cards = useSelector((state: RootState) => state.app.cards.cards)
    const correctCards = cards.filter(card => card.boardId === board.id)
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: board.id, animateLayoutChanges: () => false })
    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    const [showInput, setShowInput] = useState(false)
    const [showTitleChange, setShowTitleChange] = useState(false)
    const [newCardName, setNewCardName] = useState('')
    const handleClick = () => {
        setShowInput(true)
    }

    const deleteBoard = () => {
        dispatch(removeBoard(board.id))
    }

    const handleNewCard = () => {
        setShowInput(false)
        if (newCardName.length !== 0) {
            dispatch(addCard({
                id: `card-${cards.length + 1}`,
                boardId: board.id,
                name: newCardName
            }))
        }
        setNewCardName('')
    }

    const handleCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            handleNewCard()
        }
    }

    return (
        <div
            className="board"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            {showTitleChange ?
                <input
                    className="title-change"
                    placeholder={board.name}
                    onChange={(e) => dispatch(setBoardName({ id: board.id, name: e.target.value }))}
                    onBlur={() => setShowTitleChange(false)}
                    autoFocus
                />
                :
                <div className="title">
                    {board.name}
                    <AlterButtons edit={setShowTitleChange} deleteFnc={deleteBoard} />
                </div>
            }
            {!isOverlay &&
                correctCards.map((card) => (
                    <SortableContext id={card.boardId} items={correctCards} strategy={rectSortingStrategy} key={card.id}>
                        <Card card={card} />
                    </SortableContext>
                ))
            }
            {showInput ?
                <input
                    className="card-new"
                    placeholder="Title of the new card..."
                    onChange={(e) => setNewCardName(e.target.value)}
                    onBlur={handleNewCard}
                    onKeyDown={handleCard}
                    autoFocus
                    required
                />
                :
                <button
                    className="card-create"
                    onClick={handleClick}
                >
                    <Plus />
                    <p>Add a card</p>
                </button>
            }
        </div>
    )
}