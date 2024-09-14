<script setup lang="ts">
import { useVideosStore } from '../stores'

const videoStore = useVideosStore()
const isDialogOpen = computed(() => {
    return videoStore.isViewDialogOpen
})
watch(isDialogOpen, () => {
    if(!isDialogOpen){
        videoStore.videoSrc = ''
    }
})
</script>
<template>
    <AppDialog
        title="عرض الفيديو"
        size="2xl"
        v-model="videoStore.isViewDialogOpen"
    >
        <div class="flex justify-center items-center">
            <iframe :src="`http://208.85.19.251:8321/${videoStore.videoSrc}`" height="400" width="700"/>
        </div>
    </AppDialog>
</template>
