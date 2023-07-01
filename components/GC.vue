<script lang='ts' setup>
import { DEFAULT_WEEKDAY_LABELS, eachDayOfInterval, formatISO, getDayjsSubtract, getMonthLabels, groupByWeeks, sleep } from '~/utils'
import type { Label } from '~/utils'
import type { ContributeData, Day, Weeks } from '~/types'

const props = withDefaults(defineProps<{
  username: string
  month?: number
  hideMonth?: boolean
  hideWeekday?: boolean
  filterWeekDay?: (index: number) => boolean
  filterMonth?: (index: number) => boolean
  borderable?: boolean
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
  const _w = 284 + (props.hideWeekday ? 0 : STATIC_DATA.lrGap)
  if (!state.weeks.length)
    return _w
  const w = state.weeks.length * STATIC_DATA.blockSize
    + (state.weeks.length - 1) * STATIC_DATA.bloclGap
    + (!props.hideWeekday ? STATIC_DATA.lrGap * 2 : 0)
    + 1
  return w > 0 ? w : _w
})

const HEIGHT = computed(() => {
  const _h = 92 + (props.hideMonth ? 0 : STATIC_DATA.tbGap)
  if (!state.weeks.length)
    return _h
  const h = 7 * STATIC_DATA.blockSize
    + 6 * STATIC_DATA.bloclGap
    + (!props.hideMonth ? STATIC_DATA.tbGap : 0)
    + 4
  return h > 0 ? h : _h
})

function filterLastByMonth(contributions: Day[], month: number) {
  const range = eachDayOfInterval(
    getDayjsSubtract(undefined, month, 'month'),
    new Date(),
  ).map(date => formatISO(date, { representation: 'date' }))

  return contributions.filter(day => range.includes(day.date))
}

watch(() => props.username, async () => {
  loading.value = true
  const data = await fetchContribution(props.username)

  if (__DEV__)
    await sleep(3000)

  if (data != null) {
    let contributions = data.contributions
    let total = data.total

    if (props.month != null) {
      contributions = filterLastByMonth(data.contributions, props.month)
      total = { [`${props.month}Mons Ago`]: contributions.reduce((total, item) => total + item.count, 0) }
    }

    state.total = total
    state.weeks = groupByWeeks(contributions)
    state.labels = getMonthLabels(state.weeks)

    loading.value = false
  }
}, { immediate: true })

async function fetchContribution(name: string, year = 'last') {
  const { data } = await useFetch<ContributeData>('/api/contribution', {
    query: { name, year },
  })

  return toValue(data)
}
</script>

<template>
  <ClientOnly>
    <div pr :class="borderable ? `b b-gray rd-2 p-2 w-fit` : ''">
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
                style="fill: rgba(var(--text), var(--un-text-opacity, 1));"
                class="text-op-60 text-xs"
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
                style="fill: rgba(var(--text), var(--un-text-opacity, 1));"
                class="text-op-60 text-xs"
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
      <p v-if="loading" pcc m0 animate-pulse>
        <i animate-spin i-carbon:circle-dash /> Loading ···
      </p>
    </div>
  </ClientOnly>
</template>
