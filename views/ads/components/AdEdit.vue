<script setup lang="ts">
import type { Ad } from '../types'
import { useAdsStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
import AppTextAreaField from '~/components/app-field/AppTextAreaField.vue'
import AppFileField from '~/components/app-field/AppFileField.vue'

const adsStore = useAdsStore()

const editAd = async () => {
    await adsStore.updateAds()
}

const isLoading = computed(() => {
    return adsStore.loading
})
</script>
<template>
    <AppDialog
        size="xl"
        v-model="adsStore.isEditDialogOpen"
        title="تعديل"
        :loading="isLoading"
    >
        <div class="space-y-3 p-2">
            <div class="grid grid-cols-2 gap-3">
                <AppInputField
                    v-model="adsStore.editAd.title"
                    size="md"
                    label="العنوان"
                />
                <AppInputField
                    type="date"
                    v-model="adsStore.editAd.date"
                    size="md"
                    label="التاريخ"
                />
            </div>
            <AppTextAreaField
                v-model="adsStore.editAd.description"
                size="md"
                label="الوصف"
            />
            <AppFileField v-model="adsStore.editAd.file" multiple :urls="adsStore.editAd.file as string[]" />
        </div>
        <template #actions>
            <BaseButton color="warning" @click="editAd" :loading="isLoading">
                تأكيد
            </BaseButton>
        </template>
    </AppDialog>
</template>
