import { createSlice } from "@reduxjs/toolkit";
import { WorkspaceRoot, Workspace, MoveProps } from "../types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from "@dnd-kit/sortable";
import Images from "../../assets/images";

const initialState: WorkspaceRoot = {
    workspaces: [
        {
            id: 1,
            name: "Acme Corp workplace",
            image: Images.Logo
        }
    ],
};

interface WorkName {
    id: number
    name: string
}

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaceName: (state, action: PayloadAction<WorkName>) => {
            const { id, name } = action.payload
            const index = state.workspaces.findIndex(workspace => workspace.id === id)
            state.workspaces[index].name = name;
        },
        addWorkspace: (state, action: PayloadAction<Workspace>) => {
            state.workspaces = [...state.workspaces, action.payload]
        },
        removeWorkspace: (state, action: PayloadAction<number>) => {
            state.workspaces = state.workspaces.filter((workspace) => workspace.id !== action.payload)
            return state
        },
        moveWorkspace: (state, action: PayloadAction<MoveProps>) => {
            const { oldIndex, newIndex } = action.payload
            state.workspaces = arrayMove(state.workspaces, oldIndex, newIndex);
            return state
        }
    },
})


export const { setWorkspaceName, addWorkspace, removeWorkspace, moveWorkspace } = workspaceSlice.actions;