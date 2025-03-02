<script setup lang="ts">
import type { User } from '../types'
import { useUsersStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
import AppFileField from '~/components/app-field/AppFileField.vue'
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue'
import { userRole } from '../service/utils'
import { genders } from '../service/utils'
const usersStore = useUsersStore()
const user = ref<User>(usersStore.editUser)
const editUser = async () => {
    await usersStore.updateUsers()
    user.value = {} as User
}
</script>
<template>
    <AppDialog
        size="xl"
        v-model="usersStore.isEditDialogOpen"
        title="تعديل"
        overflow-y="visible"
    >
        <div class="space-y-3 p-2">
            <div class="grid grid-cols-2 gap-2">
                <AppInputField
                    v-model="usersStore.editUser.fullName"
                    size="md"
                    label="الاسم الكامل"
                />
                <AppInputField
                    v-model="usersStore.editUser.email"
                    size="md"
                    label="البريد الالكتروني"
                />
                <!-- <AppInputField
                    v-model="usersStore.editUser.password"
                    type="password"
                    label="الرمز السري"
                /> -->
                <AppInputField
                    v-model="usersStore.editUser.phoneNumber"
                    size="md"
                    label="رقم الهاتف"
                />
                <AppAutoCompleteField
                    v-model="usersStore.editUser.gender"
                    :items="genders"
                    item-label="label"
                    item-value="value"
                    label="الجنس"
                />
                <AppAutoCompleteField
                    v-model="usersStore.editUser.role"
                    :items="userRole"
                    item-label="title"
                    item-value="value"
                    label="الدور"
                />
                <AppInputField
                    v-model="usersStore.editUser.birthDay"
                    type="date"
                    label="تاريخ الميلاد"
                />
            </div>
        </div>
        <template #actions>
            <BaseButton color="warning" :loading="usersStore.loading" @click="editUser"> تأكيد </BaseButton>
        </template>
    </AppDialog>
</template>
