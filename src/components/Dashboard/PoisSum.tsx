import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePoi } from '../../hooks/usePoi'

const PoisSum = () => {
  const [count, setCount] = useState(0)
  const duration = 600
  const { data, sumOfData } = usePoi()
  const { t } = useTranslation()

  useEffect(() => {
    let startValue = 0
    const interval = Math.floor(duration / (sumOfData - 0))

    const counter = setInterval(() => {
      if (startValue >= sumOfData) {
        clearInterval(counter)
      } else {
        startValue += 1
        setCount(startValue)
      }
    }, interval)

    return () => {
      clearInterval(counter)
    }
  }, [sumOfData, data])
  return (
    <div className="pt-3 flex flex-col w-full">
      <p className="text-3xl md:text-4xl font-bold text-primaryDarkGray dark:text-[#e5e7e9]">{t('dashboard.pois')}</p>
      <p className="bg-primaryGreen rounded-full w-44 h-44 p-5 md:w-48 md:h-48 min-w-20 absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_6px_6px_#3F3D5630]" />
      <p className="bg-white rounded-full w-[150px] h-[150px] md:w-[166px] md:h-[166px] min-w-20 absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-darkTopBar" />
      <p className="text-7xl md:text-8xl font-bold bg-primaryGreen rounded-full flex items-center justify-center w-36 h-36 md:w-40 md:h-40 text-white min-w-20 text-center absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-darkTopBar">
        {count}
      </p>
    </div>
  )
}

export default PoisSum
