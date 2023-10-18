import './WorkspaceTab.scss'

type TabProps = {
    data: {
        id: number;
        icon: () => JSX.Element;
        name: string;
    }
}

export const WorkspaceTab= ({data}: TabProps) => {
    return (
        <div className="workspace-tab">
            <data.icon />
            <p>{data.name}</p>
        </div>
    )
}