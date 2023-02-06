<template>
  <div space-y-8>
    <div
      flex="~ col"
      lt-md-gap-2
      items-center
      md-items-end
      md="gap-10 flex-row"
    >
      <div>
        <div w-30 h-30 md="w-50 h-50" rounded-full class="skeleton-loading-bg" />
      </div>
      <div
        flex="~ col 1"
        md-items-start
        items-center
        gap-4
        w-full
        children-m0
      >
        <h2 flex class="skeleton-loading-bg" h-9 w="40" rounded />
        <p flex class="skeleton-loading-bg" h-6 w-full rounded />
        <div flex class="skeleton-loading-bg" h-6 w="4/5" rounded />
        <div
          flex
          class="skeleton-loading-bg"
          h-6
          w="2/5"
          rounded
        />
      </div>
    </div>
    <div class="skeleton-loading-bg" h-10 rounded />
    <div class="skeleton-loading-bg" h-10 rounded />
    <div class="skeleton-loading-bg" h-10 rounded />
  </div>
</template>
