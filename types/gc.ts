export type Level = 0 | 1 | 2 | 3 | 4

export interface Day {
  date: string
  count: number
  level: Level
}

type Week = Array<Day | undefined>

export type Weeks = Week[]

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Year = number | 'last' // 2022 2021 ...

export interface ContributeData {
  total: {
    [year: number]: number
    [year: string]: number // 'lastYear;
  }
  contributions: Day[]
}

export interface Label {
  x: number
  y: number
  text: string
}
