<script setup lang="ts">
import AppCrudActions from '~/components/app-crud/components/AppCrudActions.vue'
import AdCreate from '~/views/ads/components/AdCreate.vue'
import AdEdit from '~/views/ads/components/AdEdit.vue'
import { tableHeader } from '~/views/ads'
import { useAdsStore } from '~/views/ads/stores'
import { useAppTableStore } from '~/components/app-table/stores/AppTableStore'
import type { Ad } from '~/views/ads/types'
import AdFilesView from '~/views/ads/components/AdFilesView.vue'

definePageMeta({
    title: 'الاعلانات',
    preview: {
        title: 'Ads Page',
        description: 'Manage Ads and their data',
        categories: ['layouts', 'lists'],
    },
})

const adsStore = useAdsStore()
const appTableStore = useAppTableStore()
const ads = computed(() => adsStore.ads || [])
onMounted(async () => {
    appTableStore.setLoading(true)
    await adsStore.fetchAds()
    appTableStore.setLoading(false)
})
const filters = computed(() => {
    return adsStore.filters
})
const total = computed(() => {
    return adsStore.total * 10
})
watch(
    () => filters.value,
    async () => {
        appTableStore.setLoading(true)
        await adsStore.fetchAds()
        appTableStore.setLoading(false)
    },
    { deep: true }
)
</script>

<template>
    <div>
        <AppCrud
            title="Ads"
            :pagination="true"
            :total-items="total"
            add-button-text="اضافة اعلان"
            :add-btn-action="() => (adsStore.isCreateDialogOpen = true)"
            v-model:current-page="adsStore.filters.pageNumber"
        >
            <!-- <template #filters>
                    <AppFilters :filters="filters">
                        <BaseInput v-model="filters.name" placeholder="اسم الاعلان"></BaseInput>
                    </AppFilters>
                </template> -->
            <AppTable :headers="tableHeader" :items="ads">
                <template #data-actions="data">
                    <div class="items-center justify-center flex gap-2">
                        <AppCrudActions
                            :item="data.item"
                            :delete-service="adsStore.deleteAds"
                            :edit-button-action="
                                () => adsStore.setEditId(data.item.id)
                            "
                        />
                    </div>
                </template>
                <template #data-id="data">
                    <span> {{ data.index + 1 }} </span>
                </template>
                <template #data-date="data">
                    <span>
                        {{
                            new Date(data.item.date)?.toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })
                        }}
                    </span>
                </template>
                <template #data-file="{ item }">
                    <BaseButtonIcon
                        v-if="item.file?.length > 1"
                        variant="pastel"
                        class="size-9"
                        color="primary"
                        size="sm"
                        rounded="full"
                        @click="adsStore.setFiles(item.file as string[])"
                    >
                        <Icon name="ph:eye" class="w-5 h-5" />
                    </BaseButtonIcon>

                    <BaseButtonIcon
                        v-else
                        variant="pastel"
                        class="size-9"
                        color="primary"
                        size="sm"
                        rounded="full"
                        :to="`http://208.85.19.251:8321/${item.file}`"
                        target="_blank"
                    >
                        <Icon name="ph:eye" class="w-5 h-5" />
                    </BaseButtonIcon>
                </template>
            </AppTable>
        </AppCrud>
        <AdCreate />
        <AdEdit />
        <AdFilesView />
    </div>
</template>
