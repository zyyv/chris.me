<script lang='ts' setup>
const route = useRoute()
const inHome = computed(() => route.path === '/')
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div view-transition-logo>
    <ImgBlurHash
      mode="bg" :src="user!.avatar_url" blurhash="L4A1l2Mx0FN402eiyEx|00-;%MIV" alt="Avatar"
      :class="inHome ? 'w-30' : 'w-10'" aspect-square rd="[62%_47%_82%_35%/45%_45%_80%_66%]"
      will-change="border-radius,transform,opacity" animate-shape
    />
  </div>
</template>
