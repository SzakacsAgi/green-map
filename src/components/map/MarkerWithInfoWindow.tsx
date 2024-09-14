import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import { useCallback, useState } from 'react'
import { PoiData } from '../../interfaces'
import { t } from 'i18next'
interface MarkerWithInfoWindowProps {
  data: PoiData
}

const MarkerWithInfoWindow: React.FunctionComponent<MarkerWithInfoWindowProps> = ({ data }) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)
  const handleMarkerClick = useCallback(() => setInfoWindowShown((isShown) => !isShown), [])

  return (
    <>
      <AdvancedMarker position={{ lat: data.latitude, lng: data.longitude }} ref={markerRef} onClick={handleMarkerClick}>
        <Pin background={'#0f9d58'} borderColor={'#006425'} glyphColor={'#60d98f'} />
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} className="min-w-80 border-primaryGreen border-2 font-secondaryFont" style={{ border: 'red' }}>
          <h2 className="text-2xl mb-2 font-extrabold font-primaryFont">{data.name}</h2>
          <div>
            <div className="flex">
              <span className="mr-2 italic">{t('inputLabels.address')}:</span>
              <p className="font-bold">{data.address}</p>
            </div>
            <div className="flex">
              <span className="mr-2 italic">{t('inputLabels.phoneNumber')}:</span>
              <p className="font-bold">{data.phoneNumber}</p>
            </div>
            <div className="flex">
              <span className="mr-2 italic">{t('inputLabels.openingHours')}:</span>
              <p className="font-bold">{data.openingHours}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export default MarkerWithInfoWindow
