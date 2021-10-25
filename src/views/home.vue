<template>
  <div class="w-3/5 m-auto">
    <img class="w-60 h-60" alt="Vue logo" src="@/assets/logo.svg" />
    {{ store.info.name }}
    <div v-typeWrite style="height: 300px">{{str}}</div>
    <div v-typeWrite style="height: 300px">{{swe}}</div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { ref, reactive } from 'vue'
const store = useUserStore()
// setTimeout(() => {
//   store.$patch({
//     age: 18
//   } as any)
// }, 1000)




let str = `一天叶子离开了,它问树：你为什么不挽留我，树默默的说：因为风在追你，所以我选择了放弃；叶子问风：你为什么要追求我，风平淡的回答：因为树放弃了你，我看你孤独就追你了。叶子沉默了，是树太懦弱，还是自己太傻。
      终有一天叶子感到筋疲力尽了，于是选择了随风漂泊，它问树：你为什么不挽留我?树骄傲的说：世界上不只有你一片叶子；叶子伤心走了，它问风：你为什么要追求我，风真诚的回答：因为世界上没有相同的两片叶子。叶子沉默了，是树不懂得爱,还是风太执着。`


const swe = `</script>`

</script>
<style lang="scss" scoped></style>
