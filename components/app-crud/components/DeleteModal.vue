<script setup lang="ts">
import { useAppCrudStore } from '../store/AppCrudStore';
const appCrudStore = useAppCrudStore()
const isDeleteModalOpen = computed({
    get: () => appCrudStore.isDeleteModalOpen,
    set: (value) => appCrudStore.isDeleteModalOpen = value
})

const isLoading = ref(false)

const deleteItem = async () => {
    try {
        isLoading.value = true
        console.log('test');
        if (appCrudStore.deleteService)
            await appCrudStore.deleteService(appCrudStore.itemId as string)
        else
            throw new Error("No delete service provided")
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false
        isDeleteModalOpen.value = false;
    }
}
</script>
<template>
    <AppDialog size="sm" title="تأكيد الحذف" v-model="isDeleteModalOpen" :loading="isLoading">
        هل انت متأكد من حذف هذا العنصر؟
        <template #actions>
            <BaseButton @click="deleteItem" color="primary" :loading="isLoading">
                <Icon name="ph:trash" />
                حذف
            </BaseButton>
        </template>
    </AppDialog>
</template>
