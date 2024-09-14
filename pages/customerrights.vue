<script setup lang="ts">
import AppInputField from '~/components/app-field/AppInputField.vue'
import AppMarkdownField from '~/components/app-field/AppMarkdownField.vue'
import AppTextAreaField from '~/components/app-field/AppTextAreaField.vue'
import { useCustomerRightsStore } from '~/views/customerrights/stores'

definePageMeta({
    title: 'حقوق المواطنين',
    preview: {
        title: 'Customer Rights Page',
        description: 'manage Customer Rights page and their data',
    },
})

const customerRightsStore = useCustomerRightsStore()

onMounted(async () => {
    customerRightsStore.loading = true
    customerRightsStore.fetchCustomerRights()
    customerRightsStore.loading = false
})

const updateCommercialBanking = async () => {
    await customerRightsStore.updateCustomerRights()
}
</script>

<template>
    <div>
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 gap-3">
                <AppInputField
                    v-model="customerRightsStore.editcustomerRights.title"
                    size="md"
                    class="!border-0"
                    label="العنوان"
                />
                <AppTextAreaField
                    v-model="customerRightsStore.editcustomerRights.description"
                    label="الوصف"
                />
                <AppMarkdownField
                    v-model="customerRightsStore.editcustomerRights.content"
                    label="المحتوى"
                />
            </div>
            <BaseButton
                :loading="customerRightsStore.loading"
                style="width: fit-content; align-self: self-end"
                color="primary"
                @click="updateCommercialBanking"
            >
                حفظ
            </BaseButton>
        </div>
    </div>
</template>
