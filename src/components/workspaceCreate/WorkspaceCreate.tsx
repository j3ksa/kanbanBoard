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
  const [workImage, setWorkImage] = useState('')

  const handleConfirm = () => {
    setAddNew(false)
    dispatch(addWorkspace({
      id: workspaceQuantity + 1,
      name,
      image: workImage
    }))
    setWorkImage('')
    setName('')
    navigate(`/?workId=${workspaceQuantity + 1}`)
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageBlob = new Blob([e.target.files[0]], { type: 'image/jpeg' })
    const imageUrl = URL.createObjectURL(imageBlob)
    setWorkImage(imageUrl)
  }
  const isDisabled = name.length === 0 || !workImage
  return (
    <>
      {addNew ?
        <>
          <div className='workspace-available'>
            <label className='workspace-create-image'>
              {
                workImage ?
                  <img
                    src={workImage}
                    alt='Uploaded image'
                  />
                  :
                  <input
                    className='workspace-create-image-hidden'
                    type='file'
                    accept='image/*'
                    multiple={false}
                    onChange={handleImage}
                    hidden
                  />
              }
            </label>
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
