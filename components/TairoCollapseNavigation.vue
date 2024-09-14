<script setup lang="ts">
import { useCollapse } from '../layers/tairo-layout-collapse/composables/collapse'

const { isOpen, isMobileOpen, menuItems } = useCollapse()
const app = useAppConfig()

const startMenuItems = computed(
  () =>
    menuItems.value?.filter(
      sidebar => !sidebar.position || sidebar.position === 'start',
    ),
)
const endMenuItems = computed(
  () => menuItems.value?.filter(sidebar => sidebar.position === 'end'),
)
</script>

<template>
  <!-- // background nav -->
  <div
    class="bg-[#1E1E1E] border-muted-700 fixed start-2.5 top-3 z-[60] flex h-[97vh] rounded-2xl flex-col transition-all duration-300"
    :class="[
      !isOpen ? 'w-[80px]' : 'w-[210px]',
      isMobileOpen
        ? 'translate-x-0 lg:translate-x-0'
        : 'hidden lg:flex lg:translate-x-0',
    ]">

    <!--Header-->
    <slot name="header">
      <div class="flex items-center justify-center px-5">
        <img src="~public/logo.png" class="object-contain" :class="{
          'w-30 h-30 ': !isOpen,
          'w-40 h-48 p-5': isOpen,
        }" />
      </div>
    </slot>
    <!--Body-->
    <div class=" relative flex w-full grow flex-col py-2"
      :class="!isOpen ? 'px-4' : 'px-2 nui-slimscroll overflow-y-auto'">
      <!--Menu-->
      <ul v-if="startMenuItems?.length" class="space-y-2">
        <!--Menu item-->
        <li v-for="(item, index) in startMenuItems" :key="index">
          <component :is="resolveComponentOrNative(item?.component?.name)" v-if="item?.component?.name"
            v-bind="item?.component?.props" />
          <TairoCollapseNavigationCollapseLinks v-else-if="item.children" :item="item" :expanded="isOpen"
            @clicked="isOpen = true" />
          <NuxtLink v-else-if="item.to" :to="item.to" :data-nui-tooltip="isOpen ? undefined : item.name"
            data-nui-tooltip-position="end"
            exact-active-class="!bg-primary-500/10 dark:!bg-primary-400/80 !text-mauve-500 rounded-3xl dark:!text-muted-950"
            class="nui-focus text-muted-950 dark:!text-mauve-200 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300"
            :class="!isOpen ? 'px-1 justify-center' : 'px-4'">
            <Icon :name="item.icon.name" :class="item.icon.class" />
            <span class="whitespace-nowrap font-sans text-sm" :class="!isOpen ? 'hidden' : 'block'">
              {{ item.name.length > 20 ? item.name.substring(0,20) + '...' : item.name }}
            </span>
          </NuxtLink>
          <div v-else-if="item.divider" class="border-muted-200 dark:border-muted-700 my-3 h-px w-full border-t" />
          <button v-else
            class="nui-focus text-muted-900 dark:text-muted-950 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex w-full cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300"
            :class="!isOpen ? 'px-1 justify-center' : 'px-4'" @click="item.click">
            <Icon :name="item.icon.name" :class="item.icon.class" />
            <span class="whitespace-nowrap font-sans text-sm" :class="!isOpen ? 'hidden' : 'block'">
              {{ item.name }}
            </span>
          </button>
        </li>
      </ul>
      <div class="mb-2 grow" />
      <!--Menu-->
      <ul v-if="endMenuItems?.length" class="space-y-2">
        <!--Menu item-->
        <li v-for="(item, index) in endMenuItems" :key="index">
          <component :is="resolveComponentOrNative(item?.component?.name)" v-if="item?.component?.name"
            v-bind="item?.component?.props" />
          <TairoCollapseNavigationCollapseLinks v-else-if="item.children" :item="item" :expanded="isOpen"
            @clicked="isOpen = true" />
          <NuxtLink v-else-if="item.to" :to="item.to"
            exact-active-class="!bg-primary-500/10 dark:!bg-primary-500/20 !text-muted-50 dark:!text-muted-50"
            class="nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300"
            :class="!isOpen ? 'px-1 justify-center' : 'px-4'">
            <Icon :name="item.icon.name" :class="item.icon.class" />
            <span class="whitespace-nowrap font-sans text-sm" :class="!isOpen ? 'hidden' : 'block'">
              {{ item.name }}
            </span>
          </NuxtLink>
          <div v-else-if="item.divider" class="border-muted-200 dark:border-muted-700 my-3 h-px w-full border-t" />
          <button v-else
            class="nui-focus text-muted-500 dark:text-muted-400/80 hover:bg-muted-100 dark:hover:bg-muted-700/60 hover:text-muted-600 dark:hover:text-muted-200 flex w-full cursor-pointer items-center gap-4 rounded-lg py-3 transition-colors duration-300"
            :class="!isOpen ? 'px-1 justify-center' : 'px-4'" @click="item.click">
            <Icon :name="item.icon.name" :class="item.icon.class" />
            <span class="whitespace-nowrap font-sans text-sm" :class="!isOpen ? 'hidden' : 'block'">
              {{ item.name }}
            </span>
          </button>
        </li>
      </ul>
    </div>
    <!--Footer-->
    <slot name="footer">
      <component :is="resolveComponentOrNative(
        app.tairo?.collapse?.navigation?.footer?.component,
      )
        " v-if="app.tairo?.collapse?.navigation?.footer?.component" />
    </slot>
  </div>
</template>
