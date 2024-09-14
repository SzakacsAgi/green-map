import { useTranslation } from 'react-i18next'
import BaseLayout from '../common/BaseLayout'
import Calendar from '../Dashboard/Calendar'
import CategoryChart from '../Dashboard/CategoryChart'
import { usePoi } from '../../hooks/usePoi'
import WidgetContainer from '../Dashboard/WidgetContainer'
import PoisSum from '../Dashboard/PoisSum'
import LoadingIcon from '../svg/LoadingIcon'
import HungaryMap from '../Dashboard/HungaryMap'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

const Dashboard = () => {
  const { t } = useTranslation()
  const { isLoading } = usePoi()

  return (
    <>
      <BaseLayout title={t('menuPoints.desktop.dashboard')}>
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <LoadingIcon />
          </div>
        ) : (
          <section className="px-9 pt-9 pb-8 lg:p-9 flex flex-col gap-10 md:gap-16 font-primaryFont">
            <div className="flex flex-col 1400:flex-row gap-10 md:gap-20">
              <WidgetContainer className="flex max-h-64 1400:max-h-full 1400:min-w-72 relative 1400:basis-[25%]">
                <PoisSum />
              </WidgetContainer>
              <WidgetContainer className="flex justify-center basis-[75%]">
                <div className="w-11/12 mx-auto">
                  <ParentSize debounceTime={14} initialSize={{ width: 30, height: 200 }}>
                    {(parent) => <CategoryChart width={parent.width} height={parent.height} />}
                  </ParentSize>
                </div>
              </WidgetContainer>
            </div>
            <div className="flex flex-col 1400:flex-row gap-10 md:gap-20">
              <WidgetContainer className="flex basis-[62%]">
                <div className="w-11/12 mx-auto py-5">
                  <ParentSize debounceTime={14} initialSize={{ width: 30, height: 200 }} className="flex items-center">
                    {(parent) => <HungaryMap width={parent.width} height={parent.height} />}
                  </ParentSize>
                </div>
              </WidgetContainer>
              <WidgetContainer className="flex py-3 md:py-7 items-center basis-[38%]">
                <Calendar />
              </WidgetContainer>
            </div>
          </section>
        )}
      </BaseLayout>
    </>
  )
}

export default Dashboard
