import { scaleQuantize } from '@visx/scale'
import { Mercator } from '@visx/geo'
import * as topojson from 'topojson-client'
import topology from './hungary.json'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../utils/atoms'
import { SupportedThemes } from '../../interfaces'

export type GeoMercatorProps = {
  width: number
  height: number
  events?: boolean
}

interface FeatureShape {
  type: 'Feature'
  id: string
  geometry: { coordinates: [number, number][][]; type: 'Polygon' }
  properties: { name: string }
}

// @ts-expect-error description
const world = topojson.feature(topology, topology.objects.hungary) as {
  type: 'FeatureCollection'
  features: FeatureShape[]
}

const color = scaleQuantize({
  domain: [Math.min(...world.features.map((f) => f.geometry.coordinates.length)), Math.max(...world.features.map((f) => f.geometry.coordinates.length))],
  range: ['#9ef7d9', '#87dfc2', '#72c9ac', '#5db397', '#489d81', '#32876b', '#1d7156', '#085b40']
})

const HungaryMap = ({ width, height }: GeoMercatorProps) => {
  const theme = useRecoilValue(themeState)
  const background = theme === SupportedThemes.LIGHT ? '#FFFFFF' : '#3C4043'

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} />
      <Mercator<FeatureShape> data={world.features} fitSize={[[width, height], world]} translate={[width / 2, height / 2]}>
        {(mercator) => (
          <g>
            {mercator.features.map(({ feature, path }, i) => {
              return <path key={`map-feature-${i}`} d={path || ''} fill={color(feature.geometry.coordinates.length)} stroke={background} strokeWidth={0.5} />
            })}
          </g>
        )}
      </Mercator>
    </svg>
  )
}

export default HungaryMap
