import Images from '../../assets/images';
import './WorkspaceAvailable.scss';

export const WorkspaceAvailable = () => {
  return (
    <button className='workspace-available'>
        <img src={Images.User} alt={'workspace name'} />
        <p>Workspace name</p>
    </button>
  )
}
