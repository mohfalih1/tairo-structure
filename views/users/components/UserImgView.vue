<script setup lang="ts">
const userStore = useUsersStore()
const isDialogOpen = computed(() => {
    return userStore.isViewDialogOpen
})
watch(isDialogOpen, () => {
    if(!isDialogOpen){
        userStore.imgSrc = ''
    }
})
</script>
<template>
    <AppDialog
        title="عرض الصورة"
        size="xl"
        v-model="userStore.isViewDialogOpen"
    >
        <div class="flex justify-center items-center">
            <img :src="`http://208.85.19.251:8321/Attachments/dd80c1b1-02eb-4068-884c-080e27d04da5.jpg`" height="400" width="600"/>
        </div>
    </AppDialog>
</template>
