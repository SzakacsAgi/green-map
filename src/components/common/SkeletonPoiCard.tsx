import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid'

const SkeletonPoiCard = () => {
  return (
    <div className="shadow-md p-3 bg-white rounded-md dark:bg-darkTopBar">
      <div className="flex justify-between items-center bg-lightGray p-3 rounded-md dark:bg-darkNavBg animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/4 dark:bg-darkGray" />
        <EllipsisHorizontalIcon className="w-7 text-gray-300 dark:text-darkGray" />
      </div>
      <div className="flex justify-between items-center py-3 border-b border-middleGray border-dotted animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/5 dark:bg-darkGray" />
        <div className="h-6 bg-gray-300 rounded w-1/6 dark:bg-darkGray" />
      </div>
      <div className="flex justify-between items-center py-3 border-b border-middleGray border-dotted animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/5 dark:bg-darkGray" />
        <div className="h-6 bg-gray-300 rounded w-1/6 dark:bg-darkGray" />
      </div>
      <div className="flex justify-between items-center py-3 border-b border-middleGray border-dotted animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/5 dark:bg-darkGray" />
        <div className="h-6 bg-gray-300 rounded w-1/6 dark:bg-darkGray" />
      </div>
      <div className="flex items-center justify-center bg-lightGray py-2 rounded-md border border-lightGray mt-3 dark:bg-darkNavBg dark:border-darkNavBg animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/6 dark:bg-darkGray" />
      </div>
    </div>
  )
}

export default SkeletonPoiCard
