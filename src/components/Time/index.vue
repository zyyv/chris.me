<template>
  <div class="list flex flex-items-center fs14">
    <Item v-model="hourF" width="30px" height="45px" :color="color" />
    <Item v-model="hourB" width="30px" height="45px" :color="color" />
    <span class="noselect" :style="{ color }">:</span>
    <Item v-model="minF" width="30px" height="45px" :color="color" />
    <Item v-model="minB" width="30px" height="45px" :color="color" />
    <span class="noselect" :style="{ color }">:</span>
    <Item v-model="secF" width="30px" height="45px" :color="color" />
    <Item v-model="secB" width="30px" height="45px" :color="color" />
  </div>
</template>

<script>
import Item from './item'
export default {
  name: 'Time',
  components: { Item },
  props: {
    color: String
  },
  data () {
    return {
      hourF: 0,
      hourB: 0,
      minF: 0,
      minB: 0,
      secF: 0,
      secB: 0
    }
  },
  mounted () {
    setInterval(() => {
      this.initTime()
    }, 1000)
    this.initTime()
  },
  methods: {
    initTime () {
      let date = new Date()
      let hour = this.formatNum(date.getHours())
      let min = this.formatNum(date.getMinutes())
      let sec = this.formatNum(date.getSeconds())
      this.hourF = Number(hour[0])
      this.hourB = Number(hour[1])
      this.minF = Number(min[0])
      this.minB = Number(min[1])
      this.secF = Number(sec[0])
      this.secB = Number(sec[1])
    },
    formatNum (num) {
      let str = Number(num).toString()
      if (str.length < 2) {
        str = '0' + str
      }
      return str.split('')
    }
  }
}
</script>
<style scoped></style>
