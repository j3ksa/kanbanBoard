import { useState } from "react"
import { AlterButtons } from "../alterButtons/AlterButtons"
import { useDispatch, useSelector } from "react-redux"
import { removeCard, setCardName, addSubCard, setCardDone } from "../../store/slices"
import { Card as CardProps } from "../../store/types"
import { SubCard } from "../subCard/SubCard"
import { RootState } from "../../store/store"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';
import './Card.scss'

interface Props {
    card: CardProps
    isOverlay?: boolean
}

export const Card = ({ card, isOverlay }: Props) => {
    const dispatch = useDispatch()
    const subCards = useSelector((state: RootState) => state.app.subCards.subCards)
    const correctSubCards = subCards.filter(subCard => subCard.cardId === card.id)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id, animateLayoutChanges: () => false })
    const [showCard, setShowCard] = useState(false)
    const [showCreateSubCard, setShowCreateSubCard] = useState(false)
    const [subCardName, setSubCardName] = useState('')

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        backgroundColor: card.isDone ? 'lightgreen' : 'white',
        cursor: isDragging ? 'grabbing' : 'grab'
    }

    const handleDone = () => {
        dispatch(setCardDone({ id: card.id }))
    }

    const deleteCard = () => {
        dispatch(removeCard(card.id))
    }

    const handleCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setShowCard(false)
        }
    }

    const handleSubCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setShowCreateSubCard(false)
            dispatch(addSubCard({
                id: `subCard-${subCards.length + 1}`,
                cardId: card.id,
                name: subCardName,
                isDone: false,
            }))
            setSubCardName('')
        }
    }

    return (
        <>
            {showCard ?
                <input
                    className="card-change"
                    placeholder={card.name}
                    onChange={(e) => dispatch(setCardName({ id: card.id, name: e.target.value }))}
                    onBlur={() => setShowCard(false)}
                    onKeyDown={handleCard}
                    autoFocus
                    required
                />
                :
                <div
                    className="card"
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    style={style}
                >
                    {card.name}
                    <AlterButtons add={setShowCreateSubCard} check={handleDone} correctButton={card.isDone} edit={setShowCard} deleteFnc={deleteCard} />
                </div>
            }
            {showCreateSubCard &&
                <input
                    className="card-sub"
                    placeholder={card.name}
                    onChange={(e) => setSubCardName(e.target.value)}
                    onBlur={() => setShowCreateSubCard(false)}
                    onKeyDown={handleSubCard}
                    autoFocus
                    required
                />
            }
            {!isOverlay &&
                correctSubCards.map((subCard) => (
                    <SortableContext id={subCard.cardId} items={correctSubCards} strategy={verticalListSortingStrategy} key={subCard.id}>
                        <SubCard subCard={subCard} />
                    </SortableContext>
                ))
            }
        </>
    )
}