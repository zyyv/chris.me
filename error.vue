<template>
  <NuxtLayout name="error">
    <div prose ma>
      <h2>Ooops!</h2>
      <p>It looks like this page doesn't exist.</p>
      <p>
        <button
          b
          rounded
          px-6
          trans
          hover="b-teal c-teal"
          @click="() => $router.back()"
        >
          Back
        </button>
      </p>
    </div>
  </NuxtLayout>
</template>
