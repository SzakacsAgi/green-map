import axios from 'axios'
import { useEffect, useState } from 'react'
import { PoiData } from '../interfaces'
import { useRecoilValue } from 'recoil'
import { authState } from '../utils/atoms'

const usePoi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<PoiData[]>([])
  const [sumOfData, setSumOfData] = useState(0)
  const { userToken } = useRecoilValue(authState)

  const getAllPoi = async () => {
    try {
      const response = await axios.get(`/api/poi?page=0&size=10000000`, { headers: { Authorization: `Bearer ${userToken}` } })
      setSumOfData(response.data.page.totalElements)
      setData(response.data.content)
      if (response.data.totalElements > 1) {
        for (let i = 1; i <= response.data.totalPages; i++) {
          const response = await axios.get(`/api/poi?page=${i}?size==10000000`, { headers: { Authorization: `Bearer ${userToken}` } })
          setData((prevState) => [...prevState, ...response.data.content])
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getAllPoi()
  }, [])

  return { isLoading, data, sumOfData, getAllPoi }
}

export { usePoi }
