<script setup>
useHead({
  title: 'Posts | Chris',
})
</script>

<template>
  <article class="prose ma">
    <ContentDoc>
      <template #not-found>
        <h2>Ooops!</h2>
        <p>Sorry, the page you are looking for could not be found.</p>
      </template>
    </ContentDoc>
    <Back />
  </article>
</template>
