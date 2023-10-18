import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';
import { WorkspaceCreate } from '../workspaceCreate';
import { WorkspaceAvailable } from '../workspaceAvailable';
import { WorkspaceTabs } from '../workspaceTabs/WorkspaceTabs';

export const WorkspacesSidebar = () => {
  return (
    <div className='workspaces'>
      <div className="workspaces-header">
        <WorkspaceAvailable />
        <WorkspaceCreate />
      </div>
      <div className="workspaces-main">
        <WorkspaceTabs />
      </div>
      <div className="workspaces-footer">
        <UserProfile />
        <WorkspaceSettings/>
      </div>
    </div>
  )
}
