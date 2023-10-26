import { createSlice } from "@reduxjs/toolkit";
import { SubCardRoot, SubCard, NameProps, MoveProps } from "../types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from "@dnd-kit/sortable";

const initialState: SubCardRoot = {
    subCards: [
        {
            id: 'subCard-1',
            cardId: 'card-1',
            name: "New sub task"
        }
    ],
};

export const subCardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setSubCardName: (state, action: PayloadAction<NameProps>) => {
            const { id, name } = action.payload
            const index = state.subCards.findIndex(subCard => subCard.id === id)
            state.subCards[index].name = name;
        },
        addSubCard: (state, action: PayloadAction<SubCard>) => {
            state.subCards = [...state.subCards, action.payload]
        },
        removeSubCard: (state, action: PayloadAction<string>) => {
            state.subCards = state.subCards.filter((subCard) => subCard.id !== action.payload)
            return state
        },
        moveSubCard: (state, action: PayloadAction<MoveProps>) => {
            const { oldIndex, newIndex } = action.payload
            state.subCards = arrayMove(state.subCards, oldIndex, newIndex);
            return state
        },
        resetSubCard: () => {
            initialState
        }
    },
})


export const { setSubCardName, addSubCard, removeSubCard, moveSubCard, resetSubCard } = subCardSlice.actions;