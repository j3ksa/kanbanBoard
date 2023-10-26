import { createSlice } from "@reduxjs/toolkit";
import { BoardRoot, Board, NameProps, MoveProps } from "../types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from "@dnd-kit/sortable";

const initialState: BoardRoot = {
  boards: [
    {
      id: 'board-1',
      workspaceId: 1,
      name: "Board name"
    }
  ],
};

export const boardsSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardName: (state, action: PayloadAction<NameProps>) => {
      const { id, name } = action.payload
      const index = state.boards.findIndex(board => board.id === id)
      state.boards[index].name = name;
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards = [...state.boards, action.payload]
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload)
      return state
    },
    moveBoard: (state, action: PayloadAction<MoveProps>) => {
      const { oldIndex, newIndex } = action.payload
      state.boards = arrayMove(state.boards, oldIndex, newIndex);
      return state
    },
    resetBoard: () => initialState
  },
})


export const { setBoardName, addBoard, removeBoard, moveBoard, resetBoard } = boardsSlice.actions;
