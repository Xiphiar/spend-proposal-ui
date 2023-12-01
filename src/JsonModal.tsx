import { Modal } from "react-bootstrap"
//@ts-ignore
import ReactJson from 'react-json-view'

const JsonModal = (
  {
    json,
    show,
    hide
  }:{
    json: any
    show: boolean
    hide: ()=>void
  }
) => {
  return <Modal
    show={show}
    onHide={hide}
    size='xl'
  >
    <div className='p-4'>
      <ReactJson src={json} collapsed={1} collapseStringsAfterLength={128} />
    </div>
  </Modal>
}

export default JsonModal;