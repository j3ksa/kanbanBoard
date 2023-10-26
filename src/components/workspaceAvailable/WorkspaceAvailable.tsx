import './WorkspaceAvailable.scss';
import { AlterButtons } from '../alterButtons/AlterButtons';
import { Workspace } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeWorkspace, setWorkspaceName, resetBoard, resetCard, resetSubCard } from '../../store/slices';
import { useNavigate, useLocation } from 'react-router-dom';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface Props {
  data: Workspace
}

export const WorkspaceAvailable = ({ data }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const workId = Number(searchParams.get('workId')) || 1
  const chosenWorkspace = workId !== data.id
  const [workspaceChange, setWorkspaceChange] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id, animateLayoutChanges: () => false })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const deleteWorkspace = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(removeWorkspace(data.id))
    dispatch(resetBoard())
    dispatch(resetCard())
    dispatch(resetSubCard())
    navigate(`/?workId=${data.id - 1}`)

  }
  const handleCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setWorkspaceChange(false)
    }
  }
  const handleClick = () => {
    navigate(`/?workId=${data.id}`)
  }

  return (
    <>
      {workspaceChange ?
        <input
          className='workspace-available'
          onChange={(e) => dispatch(setWorkspaceName({ id: data.id, name: e.target.value }))}
          placeholder={data.name}
          onBlur={() => setWorkspaceChange(false)}
          onKeyDown={handleCard}
          autoFocus
        />
        :
        <div
          onClick={handleClick}
          className={chosenWorkspace ? 'workspace-available-chosen' : 'workspace-available'}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
        >
          <img src={data.image} alt={'workspace name'} />
          <p>{data.name}</p>
          <AlterButtons edit={setWorkspaceChange} deleteFnc={(e) => deleteWorkspace(e)} />
        </div>
      }
    </>
  )
}
