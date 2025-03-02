<script setup lang="ts">
import type { Video } from '../types'
import { useVideosStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue'
import { videoStatus } from '../service/utils'
import AppFileField from '~/components/app-field/AppFileField.vue'
const videosStore = useVideosStore()
const video = ref<Video>(videosStore.editVideo)
const editVideo = async () => {
    await videosStore.updateVideos()
    video.value = {} as Video
}
const isLoading = computed(() => {
    return videosStore.loading
})
</script>
<template>
    <AppDialog size="xl" v-model="videosStore.isEditDialogOpen" title="تعديل" :loading="isLoading">
        <div class="space-y-3 p-2">
            <div class="grid grid-cols-2 gap-3">
                <AppInputField
                    v-model="videosStore.editVideo.title"
                    size="md"
                    label="العنوان"
                />
                <AppAutoCompleteField
                    v-model="videosStore.editVideo.isMain"
                    :items="videoStatus"
                    item-label="title"
                    item-value="value"
                    size="md"
                    label="الاولوية"
                />
            </div>
        </div>
        <AppFileField v-model="videosStore.editVideo.file" accept="video/*" :urls="videosStore.editVideo.file as string[]" />
        <template #actions>
            <BaseButton color="warning" @click="editVideo" :loading="isLoading">
                تأكيد
            </BaseButton>
        </template>
    </AppDialog>
</template>
