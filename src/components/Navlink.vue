<template>
    <a v-if="isExternalLink" op-50 v-bind="$attrs" :href="to" target="_blank">
        <slot />
    </a>
    <router-link v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
        <a
            v-bind="$attrs"
            :href="href"
            @click="navigate"
            :class="isActive ? activeClass : inactiveClass"
        >
            <slot />
        </a>
    </router-link>
</template>

<script lang='ts' setup>
const props = defineProps<{
    to: string,
    activeClass?: string
    inactiveClass?: string
}>()

const isExternalLink = computed(() => {
    return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>
