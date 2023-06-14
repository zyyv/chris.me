<script lang='ts' setup>
const { toc } = useContent()
const router = useRouter()
const tocRef = ref()

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAnchors = (event: MouseEvent & { target: HTMLElement }) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(tocRef.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})
</script>

<template>
  <div pf right-10 text-sm hidden lg-block>
    <ul v-if="toc && toc.links" ref="tocRef" list-none>
      <li>On this page</li>
      <li v-for="link in toc.links" :key="link.text">
        <a op-60 hover-op-100 no-underline :href="`#${link.id}`">
          {{ link.text }}
        </a>
        <ul v-if="link.children && link.children.length" my-1 list-none>
          <li v-for="child in link.children" :key="child.text">
            <a :href="`#${child.id}`" no-underline op-60 hover-op-100>
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
