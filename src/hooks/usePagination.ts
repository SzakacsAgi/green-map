import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../utils/atoms'
import { PaginationState } from '../interfaces'

const usePagination = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    shownData: [],
    currentPage: 0,
    lastPage: null,
    isLoading: true,
    searchedText: undefined,
    pageSize: 9
  })
  const { userToken } = useRecoilValue(authState)

  const getPagePois = async (pageToGet = paginationState.currentPage, operation = null) => {
    if (operation) {
      const isLastPoiOnPage = paginationState.shownData.length === 1

      if (isLastPoiOnPage && paginationState.currentPage > 0) {
        pageToGet = paginationState.currentPage - 1
        setPaginationState((prevState) => ({ ...prevState, currentPage: prevState.currentPage - 1, lastPage: prevState.lastPage! - 1 }))
      } else {
        pageToGet = paginationState.currentPage
      }
    }
    try {
      const response = await axios.get(`/api/poi?size=${paginationState.pageSize}&page=${pageToGet}`, { headers: { Authorization: `Bearer ${userToken}` } })
      setPaginationState((prevState) => ({ ...prevState, shownData: response.data.content }))
      !paginationState.lastPage && setPaginationState((prevState) => ({ ...prevState, lastPage: response.data.page.totalPages }))
    } catch (error) {
      console.log(error)
    } finally {
      setPaginationState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }

  useEffect(() => {
    if (paginationState.searchedText) {
      handleSearch(paginationState.currentPage, paginationState.searchedText)
    } else {
      getPagePois(paginationState.currentPage)
    }
  }, [paginationState.currentPage])

  useEffect(() => {
    setPaginationState((prevState) => ({ ...prevState, currentPage: 0 }))
  }, [paginationState.searchedText])

  const moveToTheNextPage = () => {
    setPaginationState((prevState) => {
      return { ...prevState, currentPage: prevState.currentPage + 1 }
    })
  }
  const moveToThePreviousPage = () => {
    setPaginationState((prevState) => {
      return { ...prevState, currentPage: prevState.currentPage - 1 }
    })
  }

  const handleSearch = async (pageToGet: number, searchedText: string) => {
    try {
      setPaginationState((prevState) => ({ ...prevState, isLoading: true, searchedText: searchedText }))
      if (!searchedText) {
        const response = await axios.get(`/api/poi?size=${paginationState.pageSize}&page=${pageToGet}`, { headers: { Authorization: `Bearer ${userToken}` } })
        setPaginationState((prevState) => ({ ...prevState, shownData: response.data.content, lastPage: response.data.page.totalPages }))
      } else {
        const response = await axios.get(`/api/poi/filter?size=${paginationState.pageSize}&page=${pageToGet}&name=${searchedText}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        setPaginationState((prevState) => ({ ...prevState, shownData: response.data.content, lastPage: response.data.page.totalPages }))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPaginationState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }

  const handlePageNavigation = (page: number) => {
    setPaginationState((prevState) => ({ ...prevState, currentPage: page }))
  }

  useEffect(() => {
    setPaginationState((prevState) => ({
      ...prevState,
      handleNextClick: moveToTheNextPage,
      handlePrevClick: moveToThePreviousPage,
      handleSearch: handleSearch,
      handlePageNavigation: handlePageNavigation
    }))
  }, [])

  return { getPagePois, moveToTheNextPage, paginationState }
}

export { usePagination }
