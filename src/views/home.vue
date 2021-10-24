<template>
  <div>
    <GlassCard width="550" v-for="i in 3">
      <img class="w-60 h-60" alt="Vue logo" src="@/assets/logo.svg" />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
        delectus voluptatem soluta atque fugit id neque asperiores? Explicabo,
        recusandae, pariatur ab sapiente blanditiis necessitatibus perferendis
        ex dicta cum nesciunt possimus?
      </p>
    </GlassCard>
  </div>
</template>

<script lang="ts" setup>
import GlassCard from '@c/GlassCard.vue'
import { ref, reactive } from 'vue'
</script>
<style lang="scss" scoped></style>
