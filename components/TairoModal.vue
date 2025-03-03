<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

const props = withDefaults(
    defineProps<{
        overflow?: string
        /**
         * Whether the modal is open.
         */
        open?: boolean

        /**
         * The HTML tag to use as modal wrapper (e.g. `div`, `form`, etc.).
         *
         * @default 'div'
         */
        as?: string

        /**
         * The size of the modal.
         */
        size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

        /**
         * The radius of the modal.
         */
        rounded?: 'none' | 'sm' | 'md' | 'lg'

        /**
         * The alignment of the footer content.
         */
        footerAlign?: 'start' | 'end' | 'center' | 'between'

        classes?: {
            wrapper?: string | string[]
            dialog?: string | string[]
        }
    }>(),
    {
        as: 'div',
        size: 'md',
        rounded: 'sm',
        overflow: 'auto', // Set the default value of overflow to 'auto'
        footerAlign: 'end',
        classes: () => ({
            wrapper: '',
            dialog: '',
        }),
    }
)
const emit = defineEmits<{
    close: []
}>()

defineOptions({
    inheritAttrs: false,
})

const dialogClasses = computed(() => {
    const classes = []

    if (props.classes.dialog) {
        if (Array.isArray(props.classes.dialog)) {
            classes.push(...props.classes.dialog)
        } else {
            classes.push(props.classes.dialog)
        }
    }

    switch (props.rounded) {
        case 'none':
            classes.push('rounded-none')
            break
        case 'sm':
            classes.push('rounded-md')
            break
        case 'md':
            classes.push('rounded-lg')
            break
        case 'lg':
            classes.push('rounded-xl')
            break
    }

    switch (props.size) {
        case 'sm':
            classes.push('max-w-sm')
            break
        case 'md':
            classes.push('max-w-md')
            break
        case 'lg':
            classes.push('max-w-xl')
            break
        case 'xl':
            classes.push('max-w-2xl')
            break
        case '2xl':
            classes.push('max-w-3xl')
            break
        case '3xl':
            classes.push('max-w-5xl')
            break
    }

    return classes
})
</script>

<template>
    <TransitionRoot appear :show="props.open" as="template">
        <div class="fixed inset-0 z-[9999] flex items-center justify-center">
            <Dialog class="relative z-[9999]" as="div" @close="emit('close')">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div
                        class="bg-muted-800/70 dark:bg-muted-900/80 fixed inset-0"
                    />
                </TransitionChild>

                <div class="fixed inset-0">
                    <component
                        :is="props.as ? props.as : as"
                        class="flex min-h-full items-center justify-center p-4 text-center"
                        :class="props.classes.wrapper"
                    >
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel
                                class="dark:bg-muted-400 w-full bg-white text-left align-middle shadow-xl transition-all"
                                :class="dialogClasses"
                                :style="{ overflowY: props.overflow }"
                            >
                                <slot name="header" />

                                <slot />

                                <div
                                    v-if="'footer' in $slots"
                                    class="flex w-full items-center gap-x-2"
                                    :class="[
                                        props.footerAlign === 'center' &&
                                            'justify-center',
                                        props.footerAlign === 'end' &&
                                            'justify-end',
                                        props.footerAlign === 'between' &&
                                            'justify-between',
                                    ]"
                                >
                                    <slot name="footer" />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </component>
                </div>
            </Dialog>
        </div>
    </TransitionRoot>
</template>
