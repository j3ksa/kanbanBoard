export interface WorkspaceRoot {
    workspaces: Workspace[]
}

export interface Workspace {
    id: number
    name: string
    image: string
}

export interface BoardRoot {
    boards: Board[]
}

export interface Board {
    id: string
    workspaceId: number
    name: string
}

export interface CardRoot {
    cards: Card[]
}

export interface Card {
    id: string
    boardId: string
    name: string
}

export interface SubCardRoot {
    subCards: SubCard[]
}

export interface SubCard {
    id: string
    cardId: string
    name: string
}

export interface NameProps {
    id: string
    name: string
}

export interface MoveProps {
    oldIndex: number
    newIndex: number
}