import axios from 'axios'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { ModalState, PoiData } from '../interfaces'
import { useRecoilValue } from 'recoil'
import { authState } from '../utils/atoms'

interface usePoiOperationsProps {
  refreshData: (pageToGet?: number, method?: string) => void
  setModalState: Dispatch<SetStateAction<ModalState>>
}

const usePoiOperations = ({ refreshData, setModalState }: usePoiOperationsProps) => {
  const { userToken } = useRecoilValue(authState)

  const createPoi = useCallback(async (data: PoiData & { openingTime: string; closingTime: string }) => {
    const { id, openingTime, closingTime, ...dataWithoutId } = data
    try {
      const pointCreateRequestResponse = await axios.post(
        '/api/poi',
        { ...dataWithoutId, openingHours: `${openingTime} - ${closingTime}` },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (pointCreateRequestResponse.status === 201) {
        refreshData()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setModalState((prevState: ModalState) => ({ ...prevState, opened: false }))
    }
  }, [])

  const editPoi = useCallback(async (formData: PoiData & { openingTime: string; closingTime: string }) => {
    if (formData!.id) {
      const dataBeforeEdit: PoiData = await axios.get(`/api/poi/${formData.id}`, { headers: { Authorization: `Bearer ${userToken}` } })
      type ChangedFields = {
        [K in keyof PoiData]?: PoiData[K]
      }
      formData['openingHours'] = `${formData.openingTime} - ${formData.closingTime}`
      const dataToSend = Object.keys(formData).reduce((changedFields: ChangedFields, key) => {
        const dataKey = key as keyof PoiData
        if (dataBeforeEdit && dataKey !== 'id' && formData[dataKey] !== dataBeforeEdit[dataKey]) {
          changedFields[dataKey] = formData[dataKey] as never
        }
        return changedFields
      }, {} as ChangedFields)

      if (Object.values(dataToSend).length > 0) {
        try {
          const pointUpdateRequestResponse = await axios.put(
            `/api/poi/${formData.id}`,
            { ...dataBeforeEdit, ...dataToSend },
            {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }
          )

          if (pointUpdateRequestResponse.status === 200) {
            refreshData()
          }
        } catch (error) {
          console.error(error)
        }
      }
      setModalState({ opened: false, data: null, type: null })
    }
  }, [])

  const deletePoi = useCallback(async (poiId: string) => {
    try {
      const response = await axios.delete(`/api/poi/${poiId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      if (response.status === 200) {
        refreshData(1, 'delete')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setModalState({ opened: false, data: null, type: null })
    }
  }, [])

  return { createPoi, editPoi, deletePoi }
}

export { usePoiOperations }
