<script setup lang="ts">
import type { User } from '../types'
import { useUsersStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
const usersStore = useUsersStore()
const user = ref<User>(usersStore.editUserPass)
const editUser = async () => {
    await usersStore.updateUserPass()
    user.value = {} as User
}
</script>
<template>
    <AppDialog
        size="xl"
        v-model="usersStore.isEditPassDialogOpen"
        title="تعديل الرمز السري"
        overflow-y="visible"
    >
        <div class="space-y-3 p-2">
            <div class="grid grid-cols-1 gap-2">
                <AppInputField
                    v-model="usersStore.editUserPass.password"
                    type="password"
                    label="الرمز السري"
                />
            </div>
        </div>
        <template #actions>
            <BaseButton color="warning" :loading="usersStore.loading" @click="editUser"> تأكيد </BaseButton>
        </template>
    </AppDialog>
</template>
