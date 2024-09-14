import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { throttle } from 'lodash'
import i18n from '../../i18n'
import { SupportedLanguages } from '../../interfaces'
import { Settings } from 'luxon'

const Calendar = () => {
  const [weekDays, setWeekDays] = useState<DateTime[]>([])
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now())
  const getWeekDays = (currentDate: DateTime) => {
    const days = []
    const startDay = currentDate.startOf('week')
    for (let index = 0; index < 7; index++) {
      days.push(startDay.plus({ days: index }))
    }
    return days
  }

  useEffect(() => {
    const days = getWeekDays(DateTime.now())
    setWeekDays(days)
    const updateCurrenTime = throttle(() => {
      setCurrentTime(DateTime.now())
    }, 1000)
    const intervalId = setInterval(updateCurrenTime, 1000)
    return () => {
      clearInterval(intervalId)
      updateCurrenTime.cancel()
    }
  }, [])

  const currentDate = DateTime.now().toFormat('dd MMM')
  i18n.language === SupportedLanguages.ENGLISH ? (Settings.defaultLocale = 'eng') : (Settings.defaultLocale = 'hu')

  return (
    <div className="flex flex-col gap-2 md:gap-3 2xl:gap-4 w-full">
      <h2 className="text-3xl md:text-5xl font-bold text-primaryDarkGray dark:text-[#e5e7e9]">{currentDate}</h2>
      <time className="text-darkGray text-xl md:text-2xl mb-1 md:mb-2 2xl:mb-1 dark:text-softGray">{currentTime.toLocaleString(DateTime.TIME_SIMPLE)}</time>
      <div className="flex gap-2 md:gap-3 mx-auto md:justify-between w-full flex-wrap">
        {weekDays.map((day) => {
          return (
            <div key={day.toFormat('yyyy.MM.dd')} className="flex flex-col items-center gap-y-px md:gap-y-1">
              <p
                className={`${day.toFormat('yyyy.MM.dd') === DateTime.now().toFormat('yyyy.MM.dd') ? 'text-primaryGreen' : 'text-darkGray'} text-sm md:text-base`}
              >
                {day.toFormat('ccc')}
              </p>
              <p
                className={`${day.toFormat('yyyy.MM.dd') === DateTime.now().toFormat('yyyy.MM.dd') ? 'bg-primaryGreen' : 'bg-calendarDaysBg'} p-1 h-8 w-8 md:p-2 md:h-10 md:w-10 2xl:p-2 2xl:h-12 2xl:w-12 rounded-full flex items-center justify-center`}
              >
                <span
                  className={`${day.toFormat('yyyy.MM.dd') === DateTime.now().toFormat('yyyy.MM.dd') ? 'text-white' : 'text-primaryDarkGray'} text-xs md:text-base font-bold`}
                >
                  {day.toFormat('dd')}
                </span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
