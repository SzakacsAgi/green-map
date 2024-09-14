import { render, waitFor } from '@testing-library/react'
import React from 'react'
import Administration from '../../../src/components/pages/Administration'
import { vi } from 'vitest'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { authState } from '../../../src/utils/atoms'
import '@testing-library/jest-dom'
import axios from 'axios'

const mockPois = [
  {
    id: '1',
    name: 'Arya',
    category: 'Stark',
    subcategory: 'Assassin',
    description: 'Skilled swordswoman',
    url: 'http://arya.com',
    email: 'arya@stark.com',
    phoneNumber: '555-6789',
    address: 'Winterfell',
    longitude: -7.005,
    latitude: 41.887,
    openingHours: 'Flexible hours'
  },
  {
    id: '2',
    name: 'Tyrion',
    category: 'Lannister',
    subcategory: 'Hand of the King',
    description: 'Clever strategist',
    url: 'http://tyrion.com',
    email: 'tyrion@lannister.com',
    phoneNumber: '555-7890',
    address: "King's Landing",
    longitude: -0.1276,
    latitude: 51.5074,
    openingHours: '9:00 AM - 5:00 PM'
  },
  {
    id: '3',
    name: 'Szakacs Agnes',
    category: 'Lannister',
    subcategory: 'Hand of the King',
    description: 'Clever strategist',
    url: 'http://tyrion.com',
    email: 'tyrion@lannister.com',
    phoneNumber: '555-7890',
    address: "King's Landing",
    longitude: -0.1276,
    latitude: 51.5074,
    openingHours: '9:00 AM - 5:00 PM'
  }
]

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('Administration', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockPois })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders POI cards based on shownData', async () => {
    const { findByText } = render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(authState, { isAuthenticated: true, user: 'example@gmail.com' })
        }}
      >
        <BrowserRouter>
          <Administration />
        </BrowserRouter>
      </RecoilRoot>
    )

    for (const poi of mockPois) {
      const poiName = await findByText(poi.name)
      expect(poiName).toBeInTheDocument()
    }
  })
})
