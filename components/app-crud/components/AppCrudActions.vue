<script setup lang="ts" generic="T">
import { useAppCrudStore } from '../store/AppCrudStore'
type Item = T & { id: string | number }
interface Props {
    item: T
    deleteService?: (id: string) => Promise<void>
    editButtonAction?: (id: string) => void
    hideDelete?: boolean
    hideUpdate?: boolean
}
const props = defineProps<Props>()
const item = computed(() => props.item)
const appCrudStore = useAppCrudStore()
if (props.deleteService) appCrudStore.setDeleteService(props.deleteService)

const onEdit = (currentItem: Item) => {
    if (props.editButtonAction) props.editButtonAction(currentItem.id)
}
const onDelete = (currentItem: Item) => {
    appCrudStore.setItemId(currentItem.id)
    appCrudStore.isDeleteModalOpen = true
}
</script>
<template>
    <div class="items-center flex gap-1 justify-center">
        <BaseButton
            v-if="!hideUpdate"
            variant="pastel"
            class="size-9"
            color="warning"
            size="sm"
            rounded="full"
            :disabled="props.editButtonAction ? false : true"
            @click="onEdit(item as Item)"
        >
            <span class="flex size-9 items-center justify-center rounded-full">
                <Icon name="ph:pen" class="text-warning-500 size-5" />
            </span>
        </BaseButton>
        <BaseButton
            v-if="!hideDelete"
            variant="pastel"
            class="size-9"
            color="danger"
            size="sm"
            rounded="full"
            @click="onDelete(item as Item)"
        >
            <span class="flex size-9 items-center justify-center rounded-full">
                <Icon name="ph:trash" class="text-danger-400 size-5" />
            </span>
        </BaseButton>
    </div>
</template>
