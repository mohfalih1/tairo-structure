<script lang="ts" setup generic="T">
import axiosInstance from '~/services/app-client/axios.js'
import { watchDebounced, onClickOutside } from '@vueuse/core'
interface Props {
    items?: T[]
    itemLabel?: string
    itemValue?: string
    label?: string
    placeholder?: string
    appendIcon?: string
    getUrl?: string
    fetchOnSearch?: boolean
    searchKey?: string
    modelValue: any
}

const props = defineProps<Props>()

defineSlots<{
    item: { item: T }
}>()
const menu = ref<{ query: string } | null>(null)
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
    (e: 'update:objectValue', value: T | null): void
}>()

const selectedItem = ref<T>()
const modelValue = computed({
    get: () => props.modelValue,
    set: () => {
        emit('update:modelValue', getItemValueByLabel(selectedItem.value!))
        emit('update:objectValue', selectedItem.value!)
    },
})
watch(selectedItem, () => {
    // modelValue.value = selectedItem.value! as string | number | null
    emit('update:modelValue', getItemValueByLabel(selectedItem.value!))
})

const setSelectedItemFromModelValue = () => {
    const item = getItemLabelByValue(props.modelValue)
    if (item) {
        selectedItem.value = item
    }
}

watch(
    () => props.modelValue,
    () => {
        setSelectedItemFromModelValue()
    }
)

const search = computed(() => {
    if (menu.value) return menu.value!.query
    return ''
})
const items = ref<T[]>(props.items || [])
const searchKey = computed(() => props.searchKey || 'text')
function itemWithLabel(item: T): string {
    if (!item) return ''
    if (typeof item === 'string') return item
    return item[props.itemLabel! as keyof T] as string
}
// function itemWithValue(item: T): string | null {
//     if (!item) return null
//     if (typeof item === 'string') return item
//     return item[props.itemValue! as keyof T] as string
// }
// const filteredItems = computed(() => {
//     const filtered = items.value.filter((item) =>
//         itemWithLabel(item as T)
//             .toLowerCase()
//             .includes(search.value.toLowerCase())
//     )
//     // console.log('Filtered items:', filtered)
//     return filtered
// })
const itemsLabel = computed(() => {
    return items.value.map((i: T): string => {
        return i[props.itemLabel! as keyof T] as string
    })
})
async function fetchData() {
    if (props.getUrl) {
        let params = {}
        if (props.fetchOnSearch) params = { [searchKey.value]: search.value }

        const res = await axiosInstance.get(props.getUrl, { params })
        items.value = res.data.data
    }
}

const getItemLabelByValue = (label) => {
    const item = items.value.find(
        (i) => i[props.itemValue! as keyof T] === label
    )
    return item ? item[props.itemLabel! as keyof T] : null
}

const getItemValueByLabel = (val) => {
    const item = items.value.find((i) => i[props.itemLabel! as keyof T] === val)
    return item ? item[props.itemValue! as keyof T] : null
}

onMounted(() => {
    if (props.getUrl) {
        fetchData().then(() => {
            setSelectedItemFromModelValue()
        })
    } else {
        setSelectedItemFromModelValue()
    }
})

const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]

watch(search, () => {
    if (props.fetchOnSearch) fetchData()
    // console.log('Search value changed:', search.value)
})
</script>

<template>
    <div relative>
        <BaseAutocomplete
            clearable
            dropdown
            ref="menu"
            :display-value="itemWithLabel"
            v-model="selectedItem"
            :items="itemsLabel"
            :label="label"
            :placeholder="placeholder"
        >
            <template #item="{ item, active }">
                <p
                    class="p-1"
                    v-if="!hasSlot('item')"
                    :class="{
                        'bg-primary-500 rounded': active,
                    }"
                >
                    {{ itemWithLabel(item as T) }}
                </p>

                <slot v-else name="item" :item="item" />
            </template>
        </BaseAutocomplete>
    </div>
</template>
