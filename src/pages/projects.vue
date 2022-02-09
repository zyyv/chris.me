<script lang='ts' setup>
const { t } = useI18n()

useTitle('Chris\' Blog | Projects')
</script>

<template>
  <div max-w-68ch m-auto>
    <h1 text-3xl base text-black class="mb-4 font-medium">
      {{ t('project.h1') }}
    </h1>
    <p text-base base font-lobster>
      {{ t('project.h2') }}
    </p>

    <section v-for="i in 3" :key="i" mt-10>
      <h2 base mb-2 text-xl>
        Latest
      </h2>
      <div grid py-2 gap-2 style="grid-template-columns: repeat(auto-fit,minmax(250px,1fr))">
        <Navlink
          v-for="i in 5"
          :key="i"
          flex
          op-60
          hover="op-100 bg-[#fbfbfb] dark:bg-transparent"
          transition-all-300
          ease-in-out
          class="px-3.5 py-4"
          to=""
        >
          <div text-0 pt-2 pr-4>
            <img w-10 h-10 :src="Logo" alt="" srcset="">
          </div>
          <div>
            <div text-base dark:text-white-800 toDark>
              Utils
            </div>
            <div
              toDark
              mt-2
              text-sm
              text-black
              dark:text-white
              op-80
            >
              Collection of common and useful JavaScript / TypeScript utilities
            </div>
          </div>
        </Navlink>
      </div>
    </section>

    <BBack />
  </div>
</template>
