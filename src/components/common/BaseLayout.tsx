import { FunctionComponent, useCallback } from 'react'
import TopBar from '../Header/TopBar'
import MenuButton from '../Header/MenuButton'
import Navigation from '../Header/Navigation'
import MobileNavigation from '../Header/MobileNavigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { navbarState } from '../../utils/atoms'

interface BaseLayoutProp {
  title: string
  children: JSX.Element
  extended?: boolean
  handleSearch?: (searchedValue: string) => void
  refreshData?: () => Promise<void>
}

const BaseLayout: FunctionComponent<BaseLayoutProp> = ({ title, children, extended, handleSearch, refreshData }) => {
  const isOpen = useRecoilValue(navbarState)
  const setIsOpen = useSetRecoilState(navbarState)
  const safeRefreshData = refreshData || (() => Promise.resolve())

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="w-screen min-h-screen flex font-secondaryFont relative max-h-fit">
      <div className="bg-primaryDarkGray w-fit relative z-10 shadow-[4px_0_4px_0_rgba(0,0,0,0.25)] dark:bg-darkNavBg hidden lg:block">
        <MenuButton opened={isOpen} handleOpen={handleOpen} />
        <Navigation opened={isOpen} />
      </div>
      <div className="flex flex-col w-full">
        <TopBar handleSearch={handleSearch} title={title} extended={extended} refreshData={refreshData} />
        <div className="bg-lightGray h-full pb-24 lg:pb-0 dark:bg-darkContentBg">{children}</div>
      </div>
      <div className="fixed bottom-2 left-0 w-full z-50 lg:hidden">
        <MobileNavigation refreshData={safeRefreshData} />
      </div>
    </div>
  )
}

export default BaseLayout
