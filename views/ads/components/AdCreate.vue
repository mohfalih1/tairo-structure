<script setup lang="ts">
import type { Ad } from '../types'
import { useAdsStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
import { AdBody } from '../service/utils'
import AppTextAreaField from '~/components/app-field/AppTextAreaField.vue'
import AppFileField from '~/components/app-field/AppFileField.vue'
import { useAppToaster } from '~/services/toaster/toaster'
const adsStore = useAdsStore()
const ad = ref<Ad>({
    ...AdBody,
})
const toaster = useAppToaster()

const createAd = async () => {
    if (!ad.value.title || !ad.value.date || !ad.value.description) {
        toaster.show('danger', 'يرجى ملئ الحقول مطلوبة')
        return
    }
    await adsStore.createAds(ad.value)
    ad.value = { ...AdBody }
}

const isDialogOpen = computed(() => {
    return adsStore.isCreateDialogOpen
})
watch(isDialogOpen, () => {
    ad.value = { ...AdBody }
})

const isLoading = computed(() => {
    return adsStore.loading
})
</script>
<template>
    <AppDialog
        title="اضافة اعلان جديد"
        size="xl"
        v-model="adsStore.isCreateDialogOpen"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
                <AppInputField v-model="ad.title" size="md" label="العنوان" />
                <AppInputField
                    type="date"
                    v-model="ad.date"
                    size="md"
                    label="التاريخ"
                />
            </div>
            <AppTextAreaField
                v-model="ad.description"
                size="md"
                label="الوصف"
            />
            <AppFileField v-model="ad.file" multiple />
        </div>
        <template #actions>
            <BaseButton color="primary" @click="createAd" :loading="isLoading">
                حفظ
            </BaseButton>
        </template>
    </AppDialog>
</template>
