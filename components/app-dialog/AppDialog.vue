<script setup lang="ts">
interface Props {
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    title: string
    loading?: boolean
    overflowY?: 'auto' | 'visible' // New prop for overflow-y
}
const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    title: 'اضافة',
    overflowY: 'auto', // Default value for overflowY
})
const isDialogOpen = defineModel({
    default: false,
})
const isLoading = computed(() => props.loading)
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]

const colorMode = useColorMode()
colorMode.value = 'dark'
</script>

<template>
    <TairoModal
        :open="isDialogOpen"
        :size="size"
        @close="isDialogOpen = true"
        class="!dark:bg-[#1E1E1E] "
        :overflow="props.overflowY"
    >
        <template #header>
            <!-- Header -->
            <div
                v-if="!hasSlot('header')"
                class="flex w-full items-center justify-between p-4 md:p-6 !dark:bg-[#1E1E1E]"
            >
                <h3
                    class="font-heading text-muted-200 text-lg font-medium leading-6 dark:text-white"
                >
                    {{ title }}
                </h3>

                <BaseButtonClose @click="isDialogOpen = false" />
            </div>
            <slot name="header" />
        </template>

        <!-- Body -->

        <div class="px-4 md:px-6 text-right">
            <slot v-if="!isLoading" />
            <AppLoading v-else></AppLoading>
        </div>

        <template #footer>
            <!-- Footer -->

            <div class="flex w-full items-center justify-end p-4 md:p-6 gap-2">
                <BaseButton
                    variant="pastel"
                    color="danger"
                    @click="isDialogOpen = false"
                >
                    الغاء
                </BaseButton>
                <slot name="actions"></slot>
            </div>
            <slot name="footer" />
        </template>
    </TairoModal>
</template>

<style>
[id^='headlessui-dialog-panel'] {
    max-height: 700px !important;
}
</style>
