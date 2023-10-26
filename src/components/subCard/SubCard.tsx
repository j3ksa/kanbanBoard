import { useState } from "react"
import { AlterButtons } from "../alterButtons/AlterButtons"
import { useDispatch } from "react-redux"
import { removeSubCard, setSubCardName } from "../../store/slices"
import { SubCard as SubCardProps } from "../../store/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';
import './SubCard.scss'

interface Props {
    subCard: SubCardProps
    isDragging: boolean
    isOverlay?: boolean
}

export const SubCard = ({ subCard, isDragging, isOverlay }: Props) => {
    const dispatch = useDispatch()
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: subCard.id, animateLayoutChanges: () => false })

    const [showSubCard, setShowSubCard] = useState(false)

    const style = {
        transition,
        transform: CSS.Translate.toString(transform)
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
                    className={isDragging ? "sub-card-hide" : "sub-card "}
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    style={style}
                >
                    {subCard.name}
                    <AlterButtons edit={setShowSubCard} deleteFnc={deleteSubCard} />
                </div>
            }
        </>
    )
}