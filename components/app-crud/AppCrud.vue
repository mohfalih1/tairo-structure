<script setup lang="ts">
import DeleteModal from './components/DeleteModal.vue'
import { useAppCrudStore } from './store/AppCrudStore'
import type { BaseCrudProps } from './types'
interface Props {
    title: string
    addButtonText?: string
    description?: string
    pagination?: boolean
    totalItems?: number
    hideCreate?: boolean
    addBtnAction?: () => void
}
const props = defineProps<Props>()

const emits = defineEmits(['update:currentPage'])
const pagination = computed(() => props.pagination)
const appCrudStore = useAppCrudStore()
const route = useRoute()
const currentPage = computed(() => {
    try {
        return Number.parseInt(route.query.page as string) || 1
    } catch {
        return 1
    }
})
</script>
<template>
    <TairoContentWrapper>
        <template #left>
            <slot name="filters" />
        </template>
        <template #right>
                <BaseButton
                    class="gap-1"
                    color="primary"
                    @click="addBtnAction"
                    v-if="!hideCreate"
                >
                    <Icon name="ph:plus-circle" size="20"></Icon>
                    {{ addButtonText || 'Add new' }}
                </BaseButton>
                <slot name="headerActions" />
        </template>
        <slot></slot>

        <BasePagination
            v-if="pagination"
            :item-per-page="10"
            :total-items="totalItems!"
            @update:current-page="(val: number) => emits('update:currentPage', val)"
            :current-page="currentPage"
            :max-links-displayed="5"
            rounded="lg"
        />
    </TairoContentWrapper>
    <DeleteModal />
</template>
