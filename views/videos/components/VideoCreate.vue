<script setup lang="ts">
import type { Video } from '../types'
import { useVideosStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
import { VideoBody, videoStatus } from '../service/utils'
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue'
import AppFileField from '~/components/app-field/AppFileField.vue'
const videosStore = useVideosStore()
const video = ref<Video>({
    ...VideoBody,
})
const createVideo = async () => {
    await videosStore.createVideos(video.value)
    video.value = { ...VideoBody }
}

const isLoading = computed(() => {
    return videosStore.loading
})
</script>
<template>
    <AppDialog
        title="اضافة فيديو تعريفي"
        size="xl"
        v-model="videosStore.isCreateDialogOpen"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
                <AppInputField
                    v-model="video.title"
                    size="md"
                    label="العنوان"
                />
                <AppAutoCompleteField
                    v-model="video.isMain"
                    :items="videoStatus"
                    item-label="title"
                    item-value="value"
                    size="md"
                    label="الاولوية"
                />
            </div>
            <AppFileField v-model="video.file" accept="video/*" />
        </div>
        <template #actions>
            <BaseButton
                color="primary"
                @click="createVideo"
                :loading="isLoading"
            >
                حفظ
            </BaseButton>
        </template>
    </AppDialog>
</template>
