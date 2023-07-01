<script lang='ts' setup>
import { DEFAULT_WEEKDAY_LABELS, eachDayOfInterval, formatISO, getDayjsSubtract, getMonthLabels, groupByWeeks } from '~/utils'
import type { Label } from '~/utils'
import type { ContributeData, Day, Weeks } from '~/types'

const props = withDefaults(defineProps<{
  username: string
  month?: number
  hideMonth?: boolean
  hideWeekday?: boolean
  filterWeekDay?: (index: number) => boolean
  filterMonth?: (index: number) => boolean
}>(), {
  hideMonth: false,
  hideWeekday: false,
})

const rawFilterWeekDay = props.filterWeekDay ?? ((i: number) => i % 2)
const rawFilterMonth = props.filterMonth ?? (() => true)

const STATIC_DATA = {
  blockSize: 10,
  bloclGap: 3,
  blockRadius: 2,
  lrGap: 15,
  tbGap: 20,
  get blockWidth() {
    return this.blockSize + this.bloclGap
  },
}

const state = reactive<{
  weeks: Weeks
  labels: Label[]
  total: ContributeData['total']
}>({
  weeks: [],
  labels: [],
  total: {},
})

const loading = ref(false)

const WIDTH = computed(() => {
  const w = state.weeks.length * STATIC_DATA.blockSize
    + (state.weeks.length - 1) * STATIC_DATA.bloclGap
    + (!props.hideWeekday ? STATIC_DATA.lrGap * 2 : 0)
    + 1
  return w > 0 ? w : 300
})

const HEIGHT = computed(() => {
  const h = 7 * STATIC_DATA.blockSize
    + 6 * STATIC_DATA.bloclGap
    + (!props.hideMonth ? STATIC_DATA.tbGap : 0)
    + 4
  return h > 0 ? h : 90
})

function filterLastByMonth(contributions: Day[], month: number) {
  const range = eachDayOfInterval(
    getDayjsSubtract(undefined, month, 'month'),
    // dayjs().subtract(month, 'month').toDate(),
    new Date(),
  ).map(date => formatISO(date, { representation: 'date' }))

  return contributions.filter(day => range.includes(day.date))
}

async function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

onMounted(async () => {
  loading.value = true
  const { data, error } = await useContribution(props.username)
  if (error.value) {
    loading.value = false
    throw error.value
  }

  const _data = toValue(data)!
  let contributions = _data.contributions
  let total = _data.total

  if (props.month != null) {
    contributions = filterLastByMonth(_data.contributions, props.month)
    total = { [`${props.month}Mons Ago`]: contributions.reduce((total, item) => total + item.count, 0) }
  }

  state.total = total
  state.weeks = groupByWeeks(contributions)
  state.labels = getMonthLabels(state.weeks)

  loading.value = false
})

async function useContribution(username: string, _year = 'last') {
  const API = `https://github-contributions-api.jogruber.de/v4/${username}?y=${_year}`

  return await useFetch<ContributeData>(API)
}
</script>

<template>
  <svg :width="WIDTH" :height="HEIGHT">
    <g
      :transform="`translate(${!props.hideWeekday ? STATIC_DATA.lrGap : -STATIC_DATA.lrGap + STATIC_DATA.bloclGap},${!props.hideMonth ? STATIC_DATA.tbGap : 1})`"
    >
      <template v-for="(list, index) in state.weeks" :key="index">
        <g :transform="`translate(${index * (STATIC_DATA.blockWidth + 1)}, 0)`">
          <template v-for="(item, i) in list" :key="i">
            <rect
              v-if="item"
              :width="STATIC_DATA.blockSize"
              :height="STATIC_DATA.blockSize"
              :x="(STATIC_DATA.blockWidth) - index"
              :y="i * (STATIC_DATA.blockWidth)"
              :class="`fill-level-${item.level}`"
              :rx="STATIC_DATA.blockRadius"
              :ry="STATIC_DATA.blockRadius"
              :data-count="item.count"
              :data-date="item.date"
              :data-level="item.level"
            />
          </template>
        </g>
      </template>
      <!-- Month -->
      <template v-if="!hideMonth">
        <template v-for="(item, index) in state.labels" :key="index">
          <text
            v-if="rawFilterMonth(index)"
            class="fill-$gc-text text-xs"
            :x="(STATIC_DATA.blockWidth) * (item.x + 1)"
            :y="item.y"
          >
            {{ item.text }}
          </text>
        </template>
      </template>
      <!-- Week -->
      <template v-if="!hideWeekday && state.weeks.length">
        <template v-for="(item, index) in DEFAULT_WEEKDAY_LABELS" :key="index">
          <text
            v-if="rawFilterWeekDay(index)"
            class="fill-$gc-text text-xs"
            dx="-15"
            :dy="8 + index * (STATIC_DATA.blockWidth)"
            text-anchor="start"
          >
            {{ item }}
          </text>
        </template>
      </template>
    </g>
  </svg>
</template>
