import { useCallback } from 'react'
import BaseLayout from '../common/BaseLayout'
import PoiCard from '../administration/PoiCard'
import { useTranslation } from 'react-i18next'
import SkeletonPoiCard from '../common/SkeletonPoiCard'
import Pagination from '../administration/Pagination'
import { usePagination } from '../../hooks/usePagination'

const Administration = () => {
  const { paginationState, getPagePois } = usePagination()

  const { t } = useTranslation()
  const skeletonCards = Array.from({ length: paginationState.pageSize }, () => <SkeletonPoiCard key={Math.random()} />)

  const handleSearch = useCallback(
    (searchedValue: string) => {
      paginationState.handleSearch && paginationState.handleSearch(0, searchedValue)
    },
    [paginationState.handleSearch]
  )

  const displayContent = useCallback(() => {
    let content = null

    if (paginationState.shownData.length === 0 && !paginationState.searchedText) {
      content = (
        <div className="h-full flex flex-col items-center justify-center gap-y-10 pt-7">
          <img src="/assets/noData.svg" alt="Clipboards" className="h-64 md:h-80" />
          <p className="text-primaryDarkGray font-bold text-2xl md:text-3xl">{t('administration.noData')}</p>
        </div>
      )
    } else if (paginationState.searchedText && paginationState.shownData.length === 0) {
      content = (
        <div className="h-full flex flex-col items-center justify-center gap-y-10 pt-7">
          <img src="/assets/noSearchResult.svg" alt="Space" className="h-52 md:h-60" />
          <p className="text-primaryDarkGray font-bold text-2xl md:text-3xl">{t('administration.noSearchResult')}</p>
        </div>
      )
    } else {
      content = (
        <section className="p-10 grid grid-cols-1 xl:grid-cols-3 gap-10 pb-28 sm:grid-cols-2">
          {paginationState.shownData.map((data) => (
            <PoiCard key={data.id} data={data} refreshData={getPagePois} />
          ))}
        </section>
      )
    }
    return content
  }, [paginationState.shownData])

  return (
    <BaseLayout
      title={t('menuPoints.desktop.administration')}
      extended
      handleSearch={handleSearch}
      refreshData={() => getPagePois(paginationState.currentPage)}
    >
      <div className="h-full relative">
        {paginationState.isLoading ? (
          <section className="p-10 grid grid-cols-1 xl:grid-cols-3 gap-10 pb-32 sm:grid-cols-2">
            <>{skeletonCards}</>
          </section>
        ) : (
          displayContent()
        )}
        {!paginationState.isLoading && paginationState.shownData.length > 0 && (
          <div className="w-full flex justify-center absolute bottom-7">
            <Pagination paginationState={paginationState} />
          </div>
        )}
      </div>
    </BaseLayout>
  )
}

export default Administration
