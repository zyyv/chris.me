<script lang='ts' setup>
const router = useRouter()
</script>

<template>
  <div>
    <slot>
      <button
        op-70
        hover:op-100
        text="#7D7D7D dark:#acbac6"
        bg-transparent
        border="0 b-1 #7D7D7D dark:#acbac6 op-70 hover:op-100"
        @click="router.back()"
      >
        cd ··
      </button>
    </slot>
  </div>
</template>
