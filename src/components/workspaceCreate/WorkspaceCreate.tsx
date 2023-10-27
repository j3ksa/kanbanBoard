import { Plus, Check } from '../../assets/icons';
import './WorkspaceCreate.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkspace } from '../../store/slices';
import { useNavigate } from 'react-router-dom';

interface Props {
  workspaceQuantity: number
}

export const WorkspaceCreate = ({ workspaceQuantity }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [addNew, setAddNew] = useState(false)
  const [name, setName] = useState('')

  const handleConfirm = () => {
    setAddNew(false)
    dispatch(addWorkspace({
      id: workspaceQuantity + 1,
      name,
    }))
    setName('')
    navigate(`/?workId=${workspaceQuantity + 1}`)
  }




  const isDisabled = name.length === 0
  return (
    <>
      {addNew ?
        <>
          <div className='workspace-available'>
            <div className='workspace-create-image'>
              {name.charAt(0).toUpperCase()}
            </div>
            <input
              className='workspace-create-input'
              onChange={(e) => setName(e.target.value)}
              placeholder='New board name...'
              autoFocus
            />
          </div>
          <button
            className='workspace-confirm'
            onClick={handleConfirm}
            disabled={isDisabled}
          >
            <Check />
            <p>Save new workspace</p>
          </button>
        </>
        :
        <button
          className='workspace'
          onClick={() => setAddNew(true)}
        >
          <Plus />
          <p>Create workspace</p>
        </button>
      }

    </>
  )
}
