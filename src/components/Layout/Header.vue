<template>
  <header class="w-full">
    <router-link to="/">
      <img class="w-10 h-10 fixed left-6 top-6" src="@/assets/logo.svg" alt="logo" />
    </router-link>
    <nav class="nav">
      <div class="spacer"></div>
      <div class="right">
        <router-link to="/posts">
          <svg
            class="inline"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            data-v-939756fc
            style="vertical-align: sub"
          >
            <path
              d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"
              fill="currentColor"
            />
          </svg>
        </router-link>
        <router-link to="/share">
          <svg
            class="inline"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            data-v-939756fc
            style="vertical-align: sub"
          >
            <path
              d="M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277c.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974c.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z"
              fill="currentColor"
            />
          </svg>
        </router-link>
        <router-link to="/projects">Projects</router-link>
        <router-link to="/bookmarks">
          <svg
            class="inline"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            data-v-72b3ae42
            style="vertical-align: sub"
          >
            <path
              d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761l6 3.761V4z"
              fill="currentColor"
            />
          </svg>
        </router-link>
        <router-link to="/notes">
          <svg
            class="inline"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            data-v-72b3ae42
            style="vertical-align: sub"
          >
            <path
              d="M21 15l-6 5.996L4.002 21A.998.998 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.456.993 1.002V15zM19 5H5v14h8v-5a1 1 0 0 1 .883-.993L14 13l5-.001V5zm-.829 9.999L15 15v3.169l3.171-3.17z"
              fill="currentColor"
            />
          </svg>
        </router-link>
        <a href="https://github.com/chris-zhu" target="_blank">
          <svg
            class="inline"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            data-v-72b3ae42
            style="vertical-align: sub"
          >
            <path
              d="M10.07 20.503a1 1 0 0 0-1.18-.983c-1.31.24-2.963.276-3.402-.958a5.708 5.708 0 0 0-1.837-2.415a1.2 1.2 0 0 1-.167-.11a1 1 0 0 0-.93-.645h-.005a1 1 0 0 0-1 .995c-.004.815.81 1.338 1.141 1.514a4.44 4.44 0 0 1 .924 1.36c.365 1.023 1.423 2.576 4.466 2.376l.003.098l.004.268a1 1 0 0 0 2 0l-.005-.318c-.005-.19-.012-.464-.012-1.182zM20.737 5.377c.032-.125.063-.264.09-.42a6.278 6.278 0 0 0-.408-3.293a1.002 1.002 0 0 0-.615-.58c-.356-.12-1.67-.357-4.184 1.25a13.87 13.87 0 0 0-6.354 0C6.762.75 5.455.966 5.102 1.079a.997.997 0 0 0-.631.584a6.3 6.3 0 0 0-.404 3.357c.025.127.051.246.079.354a6.27 6.27 0 0 0-1.256 3.83a8.422 8.422 0 0 0 .043.921c.334 4.603 3.334 5.984 5.424 6.459a4.591 4.591 0 0 0-.118.4a1 1 0 0 0 1.942.479a1.678 1.678 0 0 1 .468-.878a1 1 0 0 0-.546-1.745c-3.454-.395-4.954-1.802-5.18-4.899a6.61 6.61 0 0 1-.033-.738a4.258 4.258 0 0 1 .92-2.713a3.022 3.022 0 0 1 .195-.231a1 1 0 0 0 .188-1.025a3.388 3.388 0 0 1-.155-.555a4.094 4.094 0 0 1 .079-1.616a7.543 7.543 0 0 1 2.415 1.18a1.009 1.009 0 0 0 .827.133a11.777 11.777 0 0 1 6.173.001a1.005 1.005 0 0 0 .83-.138a7.572 7.572 0 0 1 2.406-1.19a4.04 4.04 0 0 1 .087 1.578a3.205 3.205 0 0 1-.169.607a1 1 0 0 0 .188 1.025c.078.087.155.18.224.268A4.122 4.122 0 0 1 20 9.203a7.039 7.039 0 0 1-.038.777c-.22 3.056-1.725 4.464-5.195 4.86a1 1 0 0 0-.546 1.746a1.63 1.63 0 0 1 .466.908a3.06 3.06 0 0 1 .093.82v2.333c-.01.648-.01 1.133-.01 1.356a1 1 0 1 0 2 0c0-.217 0-.692.01-1.34v-2.35a4.881 4.881 0 0 0-.155-1.311a4.256 4.256 0 0 0-.116-.416a6.513 6.513 0 0 0 5.445-6.424A8.697 8.697 0 0 0 22 9.203a6.13 6.13 0 0 0-1.263-3.826z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a href="/" target="_blank">
          <svg
            class="inline"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
            data-v-72b3ae42
            style="
              vertical-align: sub;
              font-size: 1.25rem;
              margin: 0px -0.125rem;
            "
          >
            <path
              d="M5 5v22h22V5zm2 2h18v18H7zm5 3c-.684 0-1.355.055-2 .188v2.062a7.86 7.86 0 0 1 2-.25c4.41 0 8 3.59 8 8c0 .691-.086 1.36-.25 2h2.063A9.923 9.923 0 0 0 22 20c0-5.516-4.484-10-10-10zm0 4a5.96 5.96 0 0 0-2 .344v2.219A3.968 3.968 0 0 1 12 16c2.207 0 4 1.793 4 4c0 .73-.219 1.41-.563 2h2.22A5.96 5.96 0 0 0 18 20c0-3.309-2.691-6-6-6zm0 4a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
  a {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.6;
    outline: none;

    &:hover {
      opacity: 1;
      text-decoration-color: inherit;
    }
  }
  .right {
    display: grid;
    grid-gap: 1.2rem;
    grid-auto-flow: column;
  }
}
</style>
