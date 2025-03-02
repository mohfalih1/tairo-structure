<script setup lang="ts">
import AppCrudActions from '~/components/app-crud/components/AppCrudActions.vue'
import { tableHeader } from '~/views/videos'
import { useAppTableStore } from '~/components/app-table/stores/AppTableStore'
import type { Video } from '~/views/videos/types'
import { useVideosStore } from '~/views/videos/stores'
import VideoCreate from '~/views/videos/components/VideoCreate.vue'
import VideoEdit from '~/views/videos/components/VideoEdit.vue'
import VideoViewDialog from '~/views/videos/components/VideoViewDialog.vue'
import { videoStatus } from '~/views/videos/service/utils'
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue'

definePageMeta({
    title: 'الفيديوهات التعريفية ',
    preview: {
        title: 'Videos Page',
        description: 'Manage Videos and their data',
    },
})

const videosStore = useVideosStore()
const appTableStore = useAppTableStore()
const videos = computed(() => videosStore.videos || [])
onMounted(async () => {
    appTableStore.setLoading(true)
    await videosStore.fetchVideos()
    appTableStore.setLoading(false)
})
const filters = computed(() => {
    return videosStore.filters
})
const total = computed(() => {
    return videosStore.total * 10
})
watch(
    () => filters.value,
    async () => {
        appTableStore.setLoading(true)
        await videosStore.fetchVideos()
        appTableStore.setLoading(false)
    },
    { deep: true }
)
</script>

<template>
    <div>
        <AppCrud
            title="Videos"
            :pagination="true"
            :total-items="total"
            add-button-text="اضافة فيديو"
            :add-btn-action="() => (videosStore.isCreateDialogOpen = true)"
            v-model:current-page="videosStore.filters.pageNumber"
        >
            <template #filters>
                <AppFilters :filters="filters">
                    <AppAutoCompleteField
                        v-model="videosStore.filters.isMain"
                        :items="videoStatus"
                        item-label="title"
                        item-value="value"
                        label="فلتر الحالة"
                    />
                </AppFilters>
            </template>
            <AppTable :headers="tableHeader" :items="videos">
                <template #data-id="data">
                    <span> {{ data.index + 1 }} </span>
                </template>
                <template #data-actions="data">
                    <div class="items-center justify-center flex gap-2">
                        <AppCrudActions
                            :item="data.item"
                            :delete-service="videosStore.deleteVideos"
                            :edit-button-action="
                                () => videosStore.setEditId(data.item.id)
                            "
                        />
                    </div>
                </template>
                <template #data-file="{ item }">
                    <BaseButtonIcon
                        variant="pastel"
                        class="size-9"
                        color="primary"
                        size="sm"
                        rounded="full"
                        @click="videosStore.setVideo(item.file as string)"
                    >
                        <Icon name="ph:eye" class="w-5 h-5" />
                    </BaseButtonIcon>
                </template>
                <template #data-isMain="data">
                    <span
                        class="bg-muted-400 rounded-2xl p-2"
                        :class="`text-${
                            videoStatus.find(
                                (U) => data.item.isMain === U.value
                            )?.color
                        }-500`"
                    >
                        {{
                            videoStatus.find(
                                (U) => data.item.isMain === U.value
                            )?.title
                        }}
                    </span>
                </template>
            </AppTable>
        </AppCrud>
        <VideoCreate />
        <VideoEdit />
        <VideoViewDialog />
    </div>
</template>
