import './App.scss';
import { WorkspacesSidebar } from "./components/workspacesSidebar"
import { WorkspaceBoards } from './components/workspaceBoards/WorkspaceBoards';

export const App = () => {
  return (
    <div className="container">
      <WorkspacesSidebar />
      <WorkspaceBoards />
    </div>
  )
}