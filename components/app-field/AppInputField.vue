<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const props = defineProps<{
    label?: string
    placeholder?: string
    required?: boolean
    size?: 'sm' | 'md' | 'lg'
    rounded?: 'sm' | 'md' | 'lg' | 'full'
    type?: 'text' | 'number' | 'email' | 'password' | 'date'
    monthPicker?: boolean
}>()
const model = defineModel()
const color = useColorMode()
const dark = computed<boolean>(() => {
    return color.value == 'dark'
})
</script>
<template>
    <BaseInput
        :size="props.size ?? 'md'"
        :label="
            props.label
                ? props.label + (props.label && props.required ? '*' : '')
                : ''
        "
        :placeholder="props.placeholder"
        :type="props.type ?? 'text'"
        :rounded="props.rounded ?? 'sm'"
        class="bg-accent border-accent"
        contrast="default"
        v-model="model"
        v-if="props.type != 'date'"
    />
    <template v-else>
        <div class="flex flex-col justify-between">
            <span v-if="props.label" class="dp__label">
                {{ props.label }}
            </span>
            <VueDatePicker
                v-model="model"
                select-text="تأكيد"
                cancel-text="ألغاء"
                :label="props.label"
                :placeholder="props.placeholder"
                :enable-time-picker="false"
                :dark
                :month-picker="props.monthPicker"
            >
                <template #arrow-left>
                    <icon name="ph:arrow-bend-down-right" />
                </template>
                <template #arrow-right>
                    <icon name="ph:arrow-bend-down-left" />
                </template>
            </VueDatePicker>
        </div>
    </template>
</template>
