<script lang='ts' setup>
const { ps, templates } = await $fetch('/api/github')

const state = reactive({
  data: [{
    name: 'Latest',
    repos: ps,
  }, {
    name: 'Template',
    repos: templates,
  }],
})

</script>

<template>
  <NuxtLayout>
    <div max-w-68ch m-auto>
      <h1 text-3xl base text-black class="mb-4 font-medium">
        Projects
      </h1>
      <p text-base base font-lobster>
        Some projects I'm proud of
      </p>

      <section v-for="(list,i) in state.data" :key="i" mt-10>
        <h2 base mb-2 text-xl>
          {{ list.name }}
        </h2>
        <div grid py-2 gap-2 style="grid-template-columns: repeat(auto-fit,minmax(250px,1fr))">
          <Navlink
            v-for="repo in list.repos"
            :key="repo.id"
            flex
            op-60
            hover="op-100 bg-[#fbfbfb] dark:bg-transparent"
            transition-all-300
            ease-in-out
            class="px-3.5 py-4"
            to=""
          >
            <div text-0 pt-2 pr-4>
              <img w-10 h-10 src="/logo.svg" alt="" srcset="">
            </div>
            <div>
              <div text-base dark:text-white-800 toDark>
                {{ repo.name }}
              </div>
              <div
                toDark
                mt-2
                text-sm
                text-black
                dark:text-white
                op-80
              >
                {{ repo.description }}
              </div>
            </div>
          </Navlink>
        </div>
      </section>

      <BBack />
    </div>
  </NuxtLayout>
</template>

<style lang='scss' scoped>
</style>
