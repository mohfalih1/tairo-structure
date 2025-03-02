<script setup lang="ts">
import { useAdsStore } from '../stores'

const adsStore = useAdsStore()
const files = computed<string | string[]>(() => {
    return adsStore.filesSrc
})
const isDialogOpen = computed(() => {
    return adsStore.isViewDialogOpen
})
watch(isDialogOpen, () => {
    if (!isDialogOpen) {
        adsStore.filesSrc = ''
    }
})
</script>
<template>
    <AppDialog
        title="عرض المرفقات"
        size="lg"
        v-model="adsStore.isViewDialogOpen"
    >
        <div class="grid grid-cols-2 gap-2">
            <div v-for="(src, index) in files">
                <BaseButton
                    class="w-full"
                    :to="`http://208.85.19.251:8321/${src}`"
                    target="_blank"
                >
                    <BaseLink rel="noopener">
                        {{ `المرفق رقم ${index + 1}` }}
                    </BaseLink>
                </BaseButton>
            </div>
        </div>
    </AppDialog>
</template>
