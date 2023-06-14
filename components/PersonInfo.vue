<script lang='ts' setup>
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div flex flex-col items-center md="gap-10 flex-row">
    <ImgBlurHash
      :src="user!.avatar_url"
      blurhash="U8B4RsM[08%j00og?ZR.%io$s:jVo$oeM^RP"
      alt="Avatar"
      w-10
      h-10
      md="w-10 h-10"
      rounded-full
    />
    <div>
      <h2 fic justify-center md="justify-start">
        {{ user?.name }}
      </h2>
      <p text-lg text-center md="text-left">
        {{ user?.bio }}
      </p>
      <div fic gap-4 justify-center md="justify-start">
        <div fic gap-2>
          <div class="text-3.5" i-carbon-building />
          {{ user?.company }}
        </div>
        <div fic gap-2>
          <div class="text-3.5" i-carbon-location />
          {{ user?.location }}
        </div>
        <div fic gap-2>
          <div class="text-3.5" i-carbon-campsite />
          {{ user?.blog }}
        </div>
      </div>
      <div my-4 fic justify-center md="justify-start">
        <div i-carbon-user-favorite-alt-filled mr2 />
        <span>
          {{ user?.followers }}
          <span class="text-xs">
            followers
          </span>
        </span>
        <span mx-2>·</span>
        <span>
          {{ user?.following }}
          <span class="text-xs">
            following
          </span>
        </span>
      </div>
      <p />
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
