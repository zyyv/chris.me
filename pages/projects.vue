<script lang='ts' setup>
const { data } = await useFetch('/api/github')
const { ps, templates } = data.value

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
    <div prose ma>
      <h1 text-3xl base text-black mb4 fw500>
        Projects
      </h1>
      <p text-base base font-mono>
        Some projects I'm proud of
      </p>

      <section v-for="(list,i) in state.data" :key="i" mt10>
        <h2 base mb-2 text-xl>
          {{ list.name }}
        </h2>
        <div grid="~ cols-2 gap-2" py-2>
          <div
            v-for="repo in list.repos"
            :key="repo.id"
            op60
            rounded-md
            hover="op100 bg-#f6f6f6 dark:bg-transparent"
            trans
            duration-300
            class="px-3.5 py-4"
          >
            <div flex>
              <div class="flex-[0_0_4rem]" text-0 pt-2 pr-4>
                <img w-full class="aspect-1/1" src="/logo.svg" alt="repo logo">
              </div>
              <div>
                <div text-base dark:text-white-800 trans mb2>
                  {{ repo.name }}
                </div>
                <div
                  v-if="repo.description"
                  mb2
                  trans
                  text-sm
                  text-black
                  dark:text-white
                  op-80
                  line-clamp-2
                  :title="repo.description"
                >
                  {{ repo.description }}
                </div>
                <div fic gap-3 mb2 text-sm>
                  <a i-carbon-logo-github :href="repo.html_url" target="_blank" />
                  <div fic>
                    <div i-carbon-fork mr1 />
                    <span>{{ repo.forks_count }}</span>
                  </div>
                  <div fic>
                    <div i-carbon-star mr1 />
                    <span>{{ repo.stargazers_count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Back />
    </div>
  </NuxtLayout>
</template>

<style lang='scss' scoped>
</style>
