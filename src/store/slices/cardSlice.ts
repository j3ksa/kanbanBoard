import { createSlice } from "@reduxjs/toolkit";
import { CardRoot, Card, NameProps, MoveProps } from "../types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from "@dnd-kit/sortable";

const initialState: CardRoot = {
    cards: [
        {
            id: 'card-1',
            boardId: 'board-1',
            name: "New task",
            isDone: false
        }
    ],
};

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCardName: (state, action: PayloadAction<NameProps>) => {
            const { id, name } = action.payload
            const index = state.cards.findIndex(card => card.id === id)
            state.cards[index].name = name;
        },
        setCardBoardId: (state, action: PayloadAction<NameProps>) => {
            const { id, name } = action.payload
            const index = state.cards.findIndex(card => card.id === id)
            state.cards[index].boardId = name;
        },
        addCard: (state, action: PayloadAction<Card>) => {
            state.cards = [...state.cards, action.payload]
        },
        removeCard: (state, action: PayloadAction<string>) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload)
            return state
        },
        moveCard: (state, action: PayloadAction<MoveProps>) => {
            const { oldIndex, newIndex } = action.payload
            state.cards = arrayMove(state.cards, oldIndex, newIndex);
            return state
        },
        setCardDone: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            const index = state.cards.findIndex(card => card.id === id)
            state.cards[index].isDone = !state.cards[index].isDone
        },
        resetCard: () => {
            initialState
        }

    },
})


export const { setCardName, setCardBoardId, addCard, removeCard, moveCard, setCardDone, resetCard } = cardSlice.actions;