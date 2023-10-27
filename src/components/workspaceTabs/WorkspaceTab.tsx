import './WorkspaceTab.scss'

type TabProps = {
    data: {
        id: number;
        icon: () => JSX.Element;
        name: string;
    }
}

export const WorkspaceTab = ({ data }: TabProps) => {
    const isBoards = data.name === "Boards"
    return (
        <div className={`workspace-tab  ${isBoards && 'selected'}`}>
            <data.icon />
            <p>{data.name}</p>
        </div>
    )
}