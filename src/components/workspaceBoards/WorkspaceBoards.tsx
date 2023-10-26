import './WorkspaceBoards.scss'
import { Board } from '../board/Board'
import { BoardCreate } from '../boardCreate/BoardCreate'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { useLocation } from "react-router-dom"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { moveBoard, moveCard, moveSubCard, setCardBoardId } from '../../store/slices'
import { useState } from 'react'
import { Card } from '../card/Card'
import { SubCard } from '../subCard/SubCard'

export const WorkspaceBoards = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const workId = Number(searchParams.get('workId'))
    const boards = useSelector((state: RootState) => state.app.boards.boards)
    const correctBoards = boards.filter(board => board.workspaceId === workId)
    const cards = useSelector((state: RootState) => state.app.cards.cards)
    const subCards = useSelector((state: RootState) => state.app.subCards.subCards)
    const [activeId, setActiveId] = useState('')
    const activeBoard = boards.find(board => board.id === activeId)
    const activeCard = cards.find(card => card.id === activeId)
    const activeSubCard = subCards.find(subCard => subCard.id === activeId)

    const onDragStart = (e: DragStartEvent) => {
        const { active } = e
        setActiveId(String(active.id))
    }

    const handleDragEnd = (e: DragEndEvent) => {
        setActiveId('')
        const { active, over } = e

        const activeId = String(active.id);
        const overId = String(over?.id)
        const isActiveBoard = activeId.includes('board')
        const isActiveCard = activeId.includes('card')
        const isActiveSubCard = activeId.includes('subCard')
        const isOverParent = String(over?.data.current?.sortable.containerId)
        const isActiveParent = String(active.data.current?.sortable.containerId)
        if (isActiveBoard) {
            const oldIndex = correctBoards.findIndex((board) => board.id === activeId)
            if (isOverParent.includes('board')) {
                const newIndex = correctBoards.findIndex((board) => board.id === isOverParent)
                dispatch(moveBoard({
                    oldIndex,
                    newIndex
                }))
            } else {
                const newIndex = correctBoards.findIndex((board) => board.id === overId)
                dispatch(moveBoard({
                    oldIndex,
                    newIndex
                }))
            }

        } else if (isActiveCard) {
            if (isOverParent === isActiveParent) {
                const oldIndex = cards.findIndex((card) => card.id === activeId)
                const newIndex = cards.findIndex((card) => card.id === overId)
                dispatch(moveCard({
                    oldIndex,
                    newIndex
                }))
            } else {
                if (isOverParent.includes('board')) {
                    dispatch(setCardBoardId({ id: activeId, name: isOverParent }))
                } else {
                    dispatch(setCardBoardId({ id: activeId, name: overId }))
                }
            }
        } else if (isActiveSubCard) {
            console.log('subCard')
            const oldIndex = subCards.findIndex((subCard) => subCard.id === activeId)
            const newIndex = subCards.findIndex((subCard) => subCard.id === overId)
            dispatch(moveSubCard({
                oldIndex,
                newIndex
            }))
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        }),
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    );

    const correctOverlay = () => {
        if (activeId.includes('board') && activeBoard) {
            return (
                <Board board={activeBoard} isOverlay={true} />
            )
        }
        if (activeId.includes('card') && activeCard) {
            return (
                <Card card={activeCard} isOverlay={true} />
            )
        }
        if (activeId.includes('subCard') && activeSubCard) {
            return (
                <SubCard subCard={activeSubCard} isDragging={false} isOverlay={true} />
            )
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={handleDragEnd}>
            <div className="workspace-boards">
                {correctBoards.map((board) => (
                    <SortableContext items={correctBoards} strategy={horizontalListSortingStrategy} key={board.id} >
                        <Board board={board} />
                    </SortableContext>
                ))}
                {workId !== 0 &&
                    <BoardCreate />
                }
            </div>
            <DragOverlay>{correctOverlay()}</DragOverlay>
        </DndContext>
    )
}