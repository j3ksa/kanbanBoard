import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';
import { WorkspaceCreate } from '../workspaceCreate';
import { WorkspaceAvailable } from '../workspaceAvailable';
import { WorkspaceTabs } from '../workspaceTabs/WorkspaceTabs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { DndContext, DragEndEvent, MouseSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { moveWorkspace } from '../../store/slices';

export const WorkspacesSidebar = () => {
  const workspaces = useSelector((state: RootState) => state.app.workspaces.workspaces)
  const dispatch = useDispatch()
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (active.id === over?.id) {
      return
    }
    const oldIndex = workspaces.findIndex((workspace) => workspace.id === active.id)
    const newIndex = workspaces.findIndex((workspace) => workspace.id === over?.id)
    dispatch(moveWorkspace({
      oldIndex,
      newIndex
    }))
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  )

  return (
    <div className='workspaces'>
      <div className="workspaces-header">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={workspaces} strategy={verticalListSortingStrategy}>
            {workspaces.map((workspace, index) => (
              <WorkspaceAvailable data={workspace} key={index}/>
            ))}
          </SortableContext>
        </DndContext>
        <WorkspaceCreate workspaceQuantity={workspaces.length} />
      </div>
      <div className="workspaces-main">
        <WorkspaceTabs />
      </div>
      <div className="workspaces-footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  )
}
