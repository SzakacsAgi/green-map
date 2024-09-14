import { useState } from 'react'
import { PaginationState } from '../../interfaces'

interface PaginationProps {
  paginationState: PaginationState
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ paginationState }) => {
  const { lastPage, currentPage, handlePageNavigation } = paginationState
  const [hover, setHover] = useState({ right: false, left: false })
  const displayPages = () => {
    const pages = []
    for (let i = 1; i <= lastPage!; i++) {
      pages.push(
        <span
          key={Math.random()}
          onClick={() => handlePageNavigation!(i - 1)}
          className={`font-primaryFont font-bold cursor-pointer text-3xl text-primaryDarkGray px-3 py-1 rounded-md ${i === currentPage + 1 ? 'bg-primaryGreen text-white ' : 'hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark hover:text-white'}`}
        >
          {i}
        </span>
      )
    }
    return pages
  }

  return (
    <div className="flex flex-wrap">
      <button disabled={currentPage === 0}>
        <svg
          onClick={paginationState.handlePrevClick}
          onMouseEnter={() => setHover((prevState) => ({ ...prevState, left: true }))}
          onMouseLeave={() => setHover((prevState) => ({ ...prevState, left: false }))}
          className="cursor-pointer test"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5714 5.51087V2.75016C23.5714 2.51087 23.2964 2.37873 23.1107 2.52516L7.01072 15.1002C6.87393 15.2065 6.76324 15.3428 6.6871 15.4984C6.61096 15.6541 6.57138 15.8251 6.57138 15.9984C6.57138 16.1717 6.61096 16.3427 6.6871 16.4983C6.76324 16.654 6.87393 16.7902 7.01072 16.8966L23.1107 29.4716C23.3 29.618 23.5714 29.4859 23.5714 29.2466V26.4859C23.5714 26.3109 23.4893 26.143 23.3536 26.0359L10.4964 16.0002L23.3536 5.96087C23.4893 5.85373 23.5714 5.68587 23.5714 5.51087Z"
            fill={hover.left ? '#10B981' : '#3F3D56'}
          />
        </svg>
      </button>
      <div className="flex items-center gap-4 mx-3">{displayPages()}</div>
      <button disabled={currentPage === lastPage! - 1}>
        <svg
          onClick={paginationState.handleNextClick}
          onMouseEnter={() => setHover((prevState) => ({ ...prevState, right: true }))}
          onMouseLeave={() => setHover((prevState) => ({ ...prevState, right: false }))}
          className="cursor-pointer test"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.0607 15.0999L8.96072 2.52486C8.91865 2.49174 8.86809 2.47116 8.81485 2.46547C8.76161 2.45979 8.70784 2.46924 8.65973 2.49274C8.61162 2.51624 8.57111 2.55283 8.54286 2.59831C8.5146 2.64379 8.49975 2.69632 8.5 2.74986V5.51057C8.5 5.68557 8.58215 5.85343 8.71786 5.96057L21.575 15.9999L8.71786 26.0391C8.57857 26.1463 8.5 26.3141 8.5 26.4891V29.2499C8.5 29.4891 8.775 29.6213 8.96072 29.4749L25.0607 16.8999C25.1976 16.7931 25.3083 16.6566 25.3844 16.5006C25.4605 16.3447 25.5001 16.1734 25.5001 15.9999C25.5001 15.8263 25.4605 15.6551 25.3844 15.4991C25.3083 15.3431 25.1976 15.2066 25.0607 15.0999Z"
            fill={hover.right ? '#10B981' : '#3F3D56'}
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
