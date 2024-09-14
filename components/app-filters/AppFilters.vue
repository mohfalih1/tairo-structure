<script setup lang="ts" generic="T">
import type { LocationQueryValue, RouteParamsRaw } from 'vue-router'
import type { AppFiltersProps } from './types'

interface Emit {
    (event: 'update:filters', value: T): void
}
const emit = defineEmits<Emit>()
const props = defineProps<AppFiltersProps<T>>()
const router = useRouter()
const route = useRoute()
const filters = computed({
    get: () => props.filters,
    set: (value: T) => emit('update:filters', value),
})
watch(
    filters,
    () => {
        const newParams: Record<string, string> = {}
        const routeQuery: Record<
            string,
            LocationQueryValue[] | LocationQueryValue
        > = {}
        Object.keys(route.query).forEach((queryKey) => {
            if (
                !Object.keys(filters.value as string).includes(
                    queryKey as string
                )
            ) {
                routeQuery[queryKey] = route.query[queryKey]
            }
        })
        Object.keys(filters.value as string).forEach((key: string) => {
            if (filters.value[key as keyof typeof filters.value]) {
                newParams[key] = filters.value[
                    key as keyof typeof filters.value
                ] as string
            }
        })  

        router.push({
            ...route,
            query: {
                ...routeQuery,
                ...newParams,
            },
        })
        //fillFilters()
    },
    {
        deep: true,
    }
)
const fillFilters = () => {
    const query = route.query as RouteParamsRaw

    if (Object.keys(query).length) {
        Object.keys(filters.value).forEach((key: string) => {
            if (query[key]) {
                filters.value[key as string] = query[key] as string
            }
        })
    }
}
fillFilters()

onMounted(fillFilters)
</script>
<template>
    <slot></slot>
</template>
