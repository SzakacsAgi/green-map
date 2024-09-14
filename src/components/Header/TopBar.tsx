import { FunctionComponent, useCallback, useState } from 'react'
import Modal from '../common/Modal/Modal'
import { type ModalState, ModalTypes } from '../../interfaces'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import PrimaryButton from '../common/Button/PrimaryButton'
import { usePoiOperations } from '../../hooks/usePoiOperations'

interface TopBarProps {
  title: string
  extended?: boolean
  handleSearch?: (searchedValue: string) => void
  refreshData?: () => Promise<void>
}

const TopBar: FunctionComponent<TopBarProps> = ({ title, extended, handleSearch, refreshData }) => {
  const [searchValue, setSearchValue] = useState('')
  const [modalState, setModalState] = useState<ModalState>({ opened: false, data: null, type: null })
  const { t } = useTranslation()
  const safeRefreshData = refreshData || (() => Promise.resolve())
  const { createPoi } = usePoiOperations({ refreshData: safeRefreshData, setModalState })

  const debouncedSearch = useCallback(
    debounce((searchedValue: string) => {
      if (handleSearch) {
        handleSearch(searchedValue)
      }
    }, 700),
    [handleSearch]
  )

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value
    setSearchValue(searchedValue)
    debouncedSearch(searchedValue)
  }

  return (
    <div
      className={`${extended ? 'flex flex-col gap-8 py-8' : 'flex items-center h-20'} py-12 bg-white min-w-full px-9 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] relative ${title === t('menuPoints.desktop.administration') ? 'flex' : 'hidden'} lg:flex dark:bg-darkTopBar`}
    >
      <h1 className="font-bold font-primaryFont hidden lg:block text-3xl dark:text-white">{title}</h1>
      {extended && (
        <>
          <div className="h-0.5 w-full bg-darkGray hidden lg:block" />
          <div className="sm:flex justify-between items-center">
            <form noValidate onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full mb-5 sm:mb-0">
                <input
                  type="text"
                  className="border w-full border-darkGray border-solid md:py-3 px-10 py-2 rounded-md placeholder:font-bold placeholder:font-primaryFont placeholder:text-darkGray dark:bg-darkInputBg dark:border-white dark:placeholder:text-white dark:text-white"
                  onChange={handleSearchValueChange}
                  value={searchValue}
                  placeholder={t('administration.searchFor')}
                />
                <MagnifyingGlassIcon className="w-6 absolute left-2.5 top-1/2 transform -translate-y-1/2 stroke-2 text-darkGray dark:text-white" />
              </div>
            </form>
            <PrimaryButton
              text={t('buttonText.addNew')}
              icon={PlusIcon}
              onClick={() => setModalState({ opened: true, data: null, type: ModalTypes.CREATE_POI })}
              underSubmit={false}
              iconPosition="left"
              className="w-full sm:w-auto"
            />
          </div>
          {modalState.opened && <Modal setModalState={setModalState} modalInfo={modalState} onSubmit={createPoi}></Modal>}
        </>
      )}
    </div>
  )
}

export default TopBar
