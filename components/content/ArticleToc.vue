<script lang='ts' setup>
const { toc } = useContent()
</script>

<template>
  <div
    pf
    right-10
    class="text-14px"
  >
    <ul v-if="toc && toc.links" list-none>
      <li>On this page</li>
      <li v-for="link in toc.links" :key="link.text" op-60 hover-op-100>
        <a no-underline :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
