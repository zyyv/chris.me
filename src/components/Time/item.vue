<template>
  <div class="wrapper" :style="{ width: style.width, height: style.height }">
    <div v-for="i in 6" :key="i" class="time">
      <div
        v-if="
          degEnum[value] &&
            degEnum[value][i - 1] &&
            degEnum[value][i - 1].h !== 45
        "
        class="hour"
        :style="{
          transform:
            'translateX(-50%) rotate(' + degEnum[value][i - 1].h + 'deg)',
          backgroundColor: style.color,
        }"
      ></div>
      <div
        v-if="
          degEnum[value] &&
            degEnum[value][i - 1] &&
            degEnum[value][i - 1].m !== 45
        "
        class="min"
        :style="{
          transform:
            'translateX(-50%) rotate(' + degEnum[value][i - 1].m + 'deg)',
          backgroundColor: style.color,
        }"
      ></div>
      <div
        v-if="
          degEnum[value] &&
            degEnum[value][i - 1].s &&
            degEnum[value][i - 1].s !== 45
        "
        class="sec"
        :style="{
          transform:
            'translateX(-50%) rotate(' + degEnum[value][i - 1].s + 'deg)',
          backgroundColor: style.color,
        }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'item',
  props: {
    value: Number,
    width: [Number, String],
    height: [Number, String],
    color: {
      type: String,
      default: '#2c2c2c',
    }
  },
  computed: {
    style () {
      let style = {}
      if (this.isDef(this.width)) {
        style.width = this.addUnit(this.width)
      }
      if (this.isDef(this.height)) {
        style.height = this.addUnit(this.height)
      }
      if (this.isDef(this.color)) {
        style.color = this.addUnit(this.color)
      }
      return style
    }
  },
  data () {
    return {
      degEnum: [
        [
          {
            h: 90,
            m: 180
          },
          {
            h: -90,
            m: 180
          },
          {
            h: 0,
            m: 180
          },
          {
            h: 0,
            m: 180
          },
          {
            h: 0,
            m: 90
          },
          {
            h: 0,
            m: -90
          }
        ],
        [
          {
            h: 45,
            m: 45
          },
          {
            h: 180,
            m: 180
          },
          {
            h: 45,
            m: 45
          },
          {
            h: 180,
            m: 0
          },
          {
            h: 45,
            m: 45
          },
          {
            h: 0,
            m: 0
          }
        ],
        [
          {
            h: 90,
            m: 90
          },
          {
            h: 180,
            m: -90
          },
          {
            h: 90,
            m: 180
          },
          {
            h: 0,
            m: -90
          },
          {
            h: 90,
            m: 0
          },
          {
            h: -90,
            m: -90
          }
        ],
        [
          {
            h: 90,
            m: 90
          },
          {
            h: 180,
            m: -90
          },
          {
            h: 90,
            m: 90
          },
          {
            h: 0,
            m: -90,
            s: 180
          },
          {
            h: 90,
            m: 90
          },
          {
            h: 0,
            m: -90
          }
        ],
        [
          {
            h: 180,
            m: 180
          },
          {
            h: 180,
            m: 180
          },
          {
            h: 90,
            m: 0
          },
          {
            h: 0,
            m: -90,
            s: 180
          },
          {
            h: 45,
            m: 45
          },
          {
            h: 0,
            m: 0
          }
        ],
        [
          {
            h: 180,
            m: 90
          },
          {
            h: -90,
            m: -90
          },
          {
            h: 0,
            m: 90
          },
          {
            h: -90,
            m: 180
          },
          {
            h: 90,
            m: 90
          },
          {
            h: -90,
            m: 0
          }
        ],
        [
          {
            h: 180,
            m: 90
          },
          {
            h: -90,
            m: -90
          },
          {
            h: 0,
            m: 90,
            s: 180
          },
          {
            h: -90,
            m: 180
          },
          {
            h: 0,
            m: 90
          },
          {
            h: -90,
            m: 0
          }
        ],
        [
          {
            h: 90,
            m: 90
          },
          {
            h: 180,
            m: -90
          },
          {
            h: 45,
            m: 45
          },
          {
            h: 0,
            m: 180
          },
          {
            h: 45,
            m: 45
          },
          {
            h: 0,
            m: 0
          }
        ],
        [
          {
            h: 180,
            m: 90
          },
          {
            h: 180,
            m: -90
          },
          {
            h: 0,
            m: 90,
            s: 180
          },
          {
            h: 0,
            m: -90,
            s: 180
          },
          {
            h: 0,
            m: 90
          },
          {
            h: 0,
            m: -90
          }
        ],
        [
          {
            h: 180,
            m: 90
          },
          {
            h: 180,
            m: -90
          },
          {
            h: 90,
            m: 0
          },
          {
            h: 0,
            m: -90,
            s: 180
          },
          {
            h: 90,
            m: 90
          },
          {
            h: 0,
            m: -90
          }
        ],
      ],
    }
  },
  methods: {
    isDef (val) {
      return val !== undefined && val !== null
    },
    isNumeric (val) {
      return /^\d+(\.\d+)?$/.test(val)
    },
    addUnit (value) {
      if (!this.isDef(value)) {
        return undefined
      }
      value = String(value)
      return this.isNumeric(value) ? value + 'px' : value
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  .time {
    position: relative;
    width: 50%; /** 100 */
    height: calc(100% / 3); /** 100 */
    border-radius: 50%;

    .hour {
      position: absolute;
      top: calc(100% / (100 / 5));
      left: 50%;
      width: calc(100% / (100 / 4)); /** 4px */
      height: calc(100% / (100 / 45));
      transform-origin: 50% 100%;
      transition: all 0.3s linear;
    }
    .min {
      position: absolute;
      top: calc(100% / (100 / 15));
      left: 50%;
      width: calc(100% / (100 / 4));
      height: calc(100% / (100 / 35));
      /* background-color: #2c2c2c; */
      transform-origin: 50% 100%;
      transition: all 0.3s linear;
    }
    .sec {
      position: absolute;
      top: calc(100% / (100 / 5));
      left: 50%;
      width: calc(100% / (100 / 4));
      height: calc(100% / (100 / 45));
      transform-origin: 50% 100%;
      transition: all 0.3s linear;
    }
  }
}
</style>
