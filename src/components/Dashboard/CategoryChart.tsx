import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Grid } from '@visx/grid'
import { Tooltip, defaultStyles as tooltipStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../utils/atoms'
import { SupportedThemes } from '../../interfaces'
import { usePoi } from '../../hooks/usePoi'

interface ChartData {
  label: string
  amount: number
}

interface CategoryChartProps {
  width: number
  height: number
}

const tooltipStylesWithZIndex = {
  ...tooltipStyles,
  zIndex: 10
}

const CategoryChart: React.FunctionComponent<CategoryChartProps> = ({ width, height }) => {
  const theme = useRecoilValue(themeState)
  const { data: allData } = usePoi()

  const getChartData = () => {
    return allData.reduce((accumulator, currentValue) => {
      const existingCategory = accumulator.find((item) => item.label === currentValue.category)

      if (existingCategory) {
        existingCategory.amount += 1
      } else {
        accumulator.push({ label: currentValue.category, amount: 1 })
      }
      return accumulator
    }, [] as ChartData[])
  }

  const [tooltipData, setTooltipData] = useState<{ label: string; amount: number; x: number; y: number } | null>(null)

  const onMouseMove = (event: React.MouseEvent, data: { label: string; amount: number }) => {
    const point = localPoint(event)
    if (!point) return
    setTooltipData({
      label: data.label,
      amount: data.amount,
      x: point.x,
      y: point.y
    })
  }

  const onMouseLeave = () => {
    setTooltipData(null)
  }

  const data = getChartData()

  const margin = { top: 50, bottom: 50, left: 20, right: 20 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const getCategoryLabel = (data: ChartData) => data.label
  const getCategoryAmount = (data: ChartData) => data.amount

  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: data.map(getCategoryLabel),
    padding: 0.4
  })
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(getCategoryAmount)) + 2]
  })

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            numTicksRows={3}
            numTicksColumns={7}
            stroke="#cccccc"
            strokeWidth={2}
            left={0}
            color={theme === SupportedThemes.LIGHT ? '#cccccc' : '#FFFFFF'}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            stroke="#cccccc"
            strokeWidth={1}
            tickLabelProps={() => ({
              fill: `${theme === SupportedThemes.LIGHT ? 'black' : 'white'}`,
              fontSize: 12,
              textAnchor: 'middle'
            })}
            tickStroke={`${theme === SupportedThemes.LIGHT ? 'black' : 'white'}`}
          />
          <AxisLeft
            scale={yScale}
            stroke="#cccccc"
            strokeWidth={2}
            tickFormat={(value) => `${value}`}
            tickValues={Array.from({ length: yScale.domain()[1] }, (_, i) => i)}
            tickLabelProps={() => ({
              fill: `${theme === SupportedThemes.LIGHT ? 'black' : 'white'}`,
              fontSize: 12,
              dx: '-1em',
              dy: '0.3em'
            })}
            tickStroke={`${theme === SupportedThemes.LIGHT ? 'black' : 'white'}`}
          />
          {data.map((d, i) => {
            const barHeight = yMax - (yScale(getCategoryAmount(d)) ?? 0)
            return (
              <Bar
                key={`bar-${i}`}
                x={xScale(getCategoryLabel(d))}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth()}
                fill="#10B981"
                onMouseMove={(event) => onMouseMove(event, { label: d.label, amount: d.amount })}
                onMouseLeave={onMouseLeave}
              />
            )
          })}
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip top={tooltipData.y} left={tooltipData.x} style={tooltipStylesWithZIndex}>
          <div>
            {tooltipData.label}:<strong>{tooltipData.amount}</strong>
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default CategoryChart
