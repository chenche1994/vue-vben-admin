import { BasicColumn } from '/@/components/Table/src/types/table'
import dayjs from 'dayjs'
export interface GrowCardItem {
  icon: string
  title: string
  value: number
  total: number
  color: string
  action: string
}
const formType = ['故障工单', '延期申请', '临时检修', '计划检修', '计划检修变更', '事件提报']
const specialtyList = ['通信', '信号', '土建']
const tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow',
  },
}
const grid = { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true }
const horizonBar = (yAxisData, seriesData) => {
  return {
    tooltip,
    grid,
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
    },
    series: seriesData.map((v) => ({
      name: v.name,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: v.data,
    })),
  }
}
const barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#019680',
      },
    },
  },
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D'],
  },
  yAxis: {
    type: 'value',
    max: 8000,
    splitNumber: 4,
  },
  series: [
    {
      data: [3000, 2000, 3333, 5000],
      type: 'bar',
      barMaxWidth: 80,
    },
  ],
}
const lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#019680',
      },
    },
  },
  grid,
  lengend: { show: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [...new Array(18)].map((_item, index) =>
      dayjs().subtract(index, 'day').format('YYYY-MM-DD'),
    ),
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: 'rgba(226,226,226,0.5)',
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: [
    {
      type: 'value',
      max: 80000,
      splitNumber: 4,
      axisTick: {
        show: false,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
        },
      },
    },
  ],
  series: [
    {
      name: '提报数',
      smooth: true,
      data: [
        111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222, 11111,
        4000, 2000, 500, 333, 222, 111,
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
        color: '#5ab1ef',
      },
    },
    {
      name: '延期数',
      smooth: true,
      data: [
        33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390, 198,
        60, 30, 22, 11,
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
        color: '#019680',
      },
    },
  ],
}
const pieOption = {
  tooltip: {
    trigger: 'item',
  },

  series: [
    {
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data: [
        { value: 500, name: '故障工单' },
        { value: 310, name: '延期申请' },
        { value: 274, name: '临时检修' },
        { value: 400, name: '计划检修' },
        { value: 400, name: '计划检修变更' },
        { value: 400, name: '事件提报' },
      ].sort(function (a, b) {
        return a.value - b.value
      }),
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 400
      },
    },
  ],
}

export const doneStatisOption = {
  title: '工单完成情况',
  option: horizonBar(formType, [
    { name: '未完成', data: [120, 132, 101, 134, 90] },
    { name: '已完成', data: [320, 62, 241, 94, 314] },
  ]),
}

export const delayStatisOption = {
  title: '延期情况',
  option: lineOption,
}

export const rateStatisOption = {
  title: '工单完成情况',
  option: pieOption,
}

export const gradeStatisOption = {
  title: '工单等级',
  option: barOption,
}

export const specialtyStatisOption = {
  title: '各专业工单情况',
  option: horizonBar(
    specialtyList,
    formType.map((v) => ({
      name: v,
      data: [...new Array(3)].map(() => Math.floor(Math.random() * 100)),
    })),
  ),
}

// 工单统计表格列
// 表格页
export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
  },
  {
    title: '工单总数',
    dataIndex: 'desc',
  },
  {
    title: '延期申请',
    dataIndex: 'impact',
  },
  {
    title: '故障工单',
    dataIndex: 'metroArea',
  },
  {
    title: '计划检修工单',
    dataIndex: 'metroArea[0]',
  },
  {
    title: '临时检修工单',
    dataIndex: 'metroArea[1]',
  },
  {
    title: '事件工单',
    dataIndex: 'reporter?.realName',
  },
]
