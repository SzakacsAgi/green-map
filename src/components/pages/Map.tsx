import BaseLayout from '../common/BaseLayout'
import LoadingIcon from '../svg/LoadingIcon'
import { Map } from '@vis.gl/react-google-maps'
import { usePoi } from '../../hooks/usePoi'
import { useTranslation } from 'react-i18next'
import MarkerWithInfoWindow from '../map/MarkerWithInfoWindow'

const MapPage = () => {
  const { isLoading, data } = usePoi()
  const { t } = useTranslation()

  return (
    <BaseLayout title={t('menuPoints.desktop.map')}>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <LoadingIcon />
        </div>
      ) : (
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: 47, lng: 20 }}
          defaultZoom={7}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={process.env.MAP_ID as string}
        >
          {data.map((poi) => (
            <MarkerWithInfoWindow key={poi.id} data={poi} />
          ))}
        </Map>
      )}
    </BaseLayout>
  )
}

export default MapPage
