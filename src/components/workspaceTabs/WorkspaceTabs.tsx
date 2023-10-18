import { TabList } from "../../data/TabList"
import { WorkspaceTab } from "./WorkspaceTab"
import './WorkspaceTabs.scss'

export const WorkspaceTabs = () => {
    return (
        <div className="workspace-tabs">
            {TabList.map((tab, index) => (
                <WorkspaceTab
                    key={index}
                    data={tab}
                />
            ))}
        </div>
    )
}