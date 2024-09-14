import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { PoiData, ModalState, ModalTypes } from '../../interfaces'
import { EllipsisHorizontalIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Modal from '../common/Modal/Modal'
import { useTranslation } from 'react-i18next'
import { usePoiOperations } from '../../hooks/usePoiOperations'

interface PoiCardProps {
  data: PoiData
  refreshData: () => Promise<void>
}

const PoiCard: FunctionComponent<PoiCardProps> = ({ data, refreshData }) => {
  const [modalState, setModalState] = useState<ModalState>({ opened: false, data: null, type: null })
  const [isEditButtonsShow, setIsEditButtonsShow] = useState<boolean>(false)
  const { t } = useTranslation()
  const editButtonsRef = useRef<HTMLDivElement>(null)
  const { editPoi, deletePoi } = usePoiOperations({ refreshData, setModalState })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (editButtonsRef.current && !editButtonsRef.current.contains(e.target as Node)) {
        setIsEditButtonsShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDelete = () => {
    setModalState({ opened: true, data: data, type: ModalTypes.DELETE_POI })
    setIsEditButtonsShow(false)
  }

  const handleEditButtonsClick = useCallback(() => {
    setIsEditButtonsShow((prevState) => !prevState)
  }, [])

  const handleEditClick = useCallback(() => {
    setModalState({ opened: true, data: data, type: ModalTypes.EDIT_POI })
    setIsEditButtonsShow(false)
  }, [data])

  const handleViewButtonClick = useCallback(() => {
    setModalState({ opened: true, data: data, type: ModalTypes.VIEW_POI })
  }, [data])

  return (
    <div>
      <article className="shadow-[3px_3px_3px_-1px_#00000024] p-3 bg-white rounded-md dark:bg-darkTopBar">
        <div className="flex justify-between items-center bg-lightGray p-3 rounded-md dark:bg-darkNavBg">
          <h2 className="font-bold font-primaryFont text-[16px] dark:text-white">{data.name}</h2>
          <div className="relative" ref={editButtonsRef}>
            <EllipsisHorizontalIcon
              className="relative w-7 cursor-pointer text-black dark:text-white hover:bg-middleGray dark:hover:bg-darkTopBar hover:rounded-md"
              onClick={handleEditButtonsClick}
            />
            {isEditButtonsShow && (
              <div className="p-1 w-36 -left-28 bg-lightGray absolute top-9 border-2 border-darkGray rounded-md text-darkGray dark:bg-darkInputBg dark:text-white dark:border-black">
                <div
                  className="cursor-pointer py-1.5 lg:py-1 mb-3 border-2 border-transparent hover:bg-actionPointHoverBg hover:text-primaryDarkGray hover:rounded-lg hover:border-primaryDarkGray"
                  onClick={handleEditClick}
                >
                  <button className="pl-1 flex items-center ">
                    <PencilSquareIcon className="w-6" />
                    <p className="ml-2 text-">{t('buttonText.edit')}</p>
                  </button>
                </div>
                <hr className="h-0.5 bg-darkGray absolute bottom-[49px] lg:bottom-[44px] font-normal w-[90%] left-0 right-0 m-auto" />
                <div
                  className="cursor-pointer py-1.5 lg:py-1 mt-3 border-2 border-transparent hover:bg-deletePointHoverBg hover:rounded-lg hover:border-middleRed hover:text-darkRed"
                  onClick={handleDelete}
                >
                  <button className="flex items-center">
                    <TrashIcon className="w-6 ml-[2.5px]" />
                    <p className="ml-2">{t('buttonText.delete')}</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between py-3 border-b border-middleGray border-dotted">
          <p className="text-darkGray">{t('inputLabels.category')}</p>
          <p className="dark:text-white">{data.category}</p>
        </div>
        <div className="flex justify-between py-3 border-b border-middleGray border-dotted">
          <p className="text-darkGray">{t('inputLabels.longitude')}</p>
          <p className="dark:text-white">{data.longitude}</p>
        </div>
        <div className="flex justify-between py-3 border-b border-middleGray border-dotted">
          <p className="text-darkGray">{t('inputLabels.latitude')}</p>
          <p className="dark:text-white">{data.latitude}</p>
        </div>
        <button
          className="flex items-center justify-center w-full py-2 rounded-md border border-black mt-3 dark:border-white hover:bg-primaryDarkGray hover:border-white hover:text-white hover:dark:bg-darkNavBg"
          onClick={handleViewButtonClick}
        >
          <p className="font-primaryFont dark:text-white">{t('buttonText.view')}</p>
        </button>
      </article>
      {modalState.opened && (
        <Modal setModalState={setModalState} modalInfo={modalState} onSubmit={modalState.type === ModalTypes.DELETE_POI ? () => deletePoi(data.id) : editPoi} />
      )}
    </div>
  )
}

export default PoiCard
