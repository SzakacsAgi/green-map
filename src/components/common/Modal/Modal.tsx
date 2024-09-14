import React, { useCallback } from 'react'
import { ModalTypes, type ModalState, type PoiData } from '../../../interfaces'
import EditAndAddView from './EditAndAddView'
import ViewPoiDetails from './ViewPoiDetails'
import DeleteView from './DeleteView'

interface ModalProps {
  modalInfo: ModalState
  setModalState: (newState: ModalState) => void
  onSubmit: (data: PoiData) => void
}

const Modal: React.FunctionComponent<ModalProps> = ({ modalInfo, setModalState, onSubmit }) => {
  const handleModalClose = useCallback(() => {
    setModalState({ data: null, opened: false, type: null })
  }, [setModalState])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        handleModalClose()
      }
    },
    [handleModalClose]
  )

  const detectModalContent = () => {
    switch (modalInfo.type) {
      case ModalTypes.CREATE_POI:
      case ModalTypes.EDIT_POI:
        return <EditAndAddView onClose={handleModalClose} data={modalInfo.data} onSubmit={onSubmit} />
      case ModalTypes.VIEW_POI:
        return <ViewPoiDetails onClose={handleModalClose} data={modalInfo.data} onSubmit={onSubmit} />
      case ModalTypes.DELETE_POI:
        return <DeleteView onClose={handleModalClose} data={modalInfo.data} onSubmit={onSubmit} />
    }
  }

  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-[2px]">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:px-32 md:px-40" onClick={handleOverlayClick}>
              <div
                className={`relative transform overflow-hidden rounded-sm text-left shadow-xl transition-all min-w-[75%] lg:my-10 sm:min-w-0 sm:w-full  ${modalInfo.type === ModalTypes.DELETE_POI ? 'xl:max-w-[45%]' : 'xl:max-w-[80%]'}`}
              >
                <div className="bg-lightGray px-4 py-5 rounded-md dark:bg-darkTopBar">{detectModalContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
