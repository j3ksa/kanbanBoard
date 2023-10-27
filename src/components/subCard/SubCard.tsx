import { useState } from "react"
import { AlterButtons } from "../alterButtons/AlterButtons"
import { useDispatch } from "react-redux"
import { removeSubCard, setSubCardDone, setSubCardName } from "../../store/slices"
import { SubCard as SubCardProps } from "../../store/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';
import './SubCard.scss'

interface Props {
    subCard: SubCardProps
    isOverlay?: boolean
}

export const SubCard = ({ subCard, isOverlay }: Props) => {
    const dispatch = useDispatch()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: subCard.id, animateLayoutChanges: () => false })

    const [showSubCard, setShowSubCard] = useState(false)

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
        backgroundColor: subCard.isDone ? 'lightgreen' : 'white',
        cursor: isDragging ? 'grabbing' : 'grab'
    }

    const handleCheck = () => {
        dispatch(setSubCardDone({ id: subCard.id }))
    }

    const deleteSubCard = () => {
        dispatch(removeSubCard(subCard.id))
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setShowSubCard(false)
        }
    }

    return (
        <>
            {showSubCard && !isOverlay ?
                <input
                    className="card-change"
                    placeholder={subCard.name}
                    onChange={(e) => dispatch(setSubCardName({ id: subCard.id, name: e.target.value }))}
                    onBlur={() => setShowSubCard(false)}
                    onKeyDown={handleEnter}
                    autoFocus
                    required
                />
                :
                <div
                    className="sub-card"
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    style={style}
                >
                    {subCard.name}
                    <AlterButtons edit={setShowSubCard} correctButton={subCard.isDone} check={handleCheck} deleteFnc={deleteSubCard} />
                </div>
            }
        </>
    )
}