<script lang='ts' setup>
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div flex items-center md="gap-10 flex-row">
    <h1 fsc gap-5>
      <UserAvatar />
    </h1>
    <section>
      <p>
        I'm <strong c-primary>{{ user?.name }}</strong>, front-end engineer 🧑🏻‍💻 & open source enthusiast.
      </p>
      <p italic font-dm mt-2>
        「 {{ user?.bio }} 」
      </p>
      <ul my-6 space-y-2>
        <li>
          <i i-fluent-emoji-sports-medal mr-1 />
          Team member of:
          <IconsUnoCSS />
          ,
          <IconsElk />
        </li>
        <li>
          <i i-fluent-emoji-sparkles mr-1 />
          Creator of:
          <IconsOnuUI />
          ,
          <IconsUnPreset />
        </li>
        <li>
          <i i-fluent-emoji-party-popper mr-1 />
          Contributor of:
          <IconsVite />
          、
          <IconsVue />
          、
          <IconsNuxt /> & etc.
        </li>
        <li>
          <i i-fluent-emoji-party-popper mr-1 />
          Find me on:
          <IconsBilibili />
          & etc.
        </li>
      </ul>
      <p>
        <a trans text-p-r class="group" hover-op-75 :href="`mailto:${user?.email ?? 'hizyyv@gmail.com'}`">
          Hire Me
          <i trans group-hover="ml-2" i-ri:arrow-right-up-line bg-gradient-to-r />
        </a>
      </p>
    </section>
  </div>
</template>
