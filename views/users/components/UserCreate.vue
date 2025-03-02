<script setup lang="ts">
import type { User } from '../types'
import { useUsersStore } from '../stores'
import AppInputField from '~/components/app-field/AppInputField.vue'
import { userBody, userRole } from '../service/utils'
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue'
import AppFileField from '~/components/app-field/AppFileField.vue'
import { genders } from '../service/utils'
import { useAppToaster } from '~/services/toaster/toaster'

const usersStore = useUsersStore()
const toaster = useAppToaster()
const user = ref<User>({
    ...userBody,
})
const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

const validatePhoneNumber = (phone: string) => {
    const re = /^\d{11,}$/
    return re.test(phone)
}
const createUser = async () => {
    if (!user.value.email || !user.value.password) {
        toaster.show('danger', 'يرجى ملئ الحقول مطلوبة')
        return
    }
    if (!validateEmail(user.value.email)) {
        toaster.show('danger', 'البريد الإلكتروني غير صالح')
        return
    }
    if (user.value.password.length < 6) {
        toaster.show('danger', 'كلمة المرور يجب أن تكون على الأقل 6 أحرف')
        return
    }
    if (!validatePhoneNumber(user.value.phoneNumber)) {
        toaster.show(
            'danger',
            'رقم الهاتف يجب أن يكون على الأقل 11 رقمًا ويحتوي على أرقام فقط'
        )
        return
    }
    await usersStore.createUsers(user.value)
    user.value = { ...userBody }
}
</script>
<template>
    <AppDialog
        title="اضافة مستخدم جديد"
        size="xl"
        v-model="usersStore.isCreateDialogOpen"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
                <AppInputField
                    v-model="user.fullName"
                    size="md"
                    label="الاسم الكامل"
                />
                <AppInputField
                    v-model="user.email"
                    size="md"
                    label="البريد الالكتروني"
                />
                <AppInputField
                    v-model="user.password"
                    type="password"
                    label="الرمز السري"
                />
                <AppInputField
                    v-model="user.phoneNumber"
                    size="md"
                    label="رقم الهاتف"
                />
                <AppAutoCompleteField
                    v-model="user.gender"
                    :items="genders"
                    item-label="label"
                    item-value="value"
                    label="الجنس"
                />
                <AppAutoCompleteField
                    v-model="user.role"
                    :items="userRole"
                    item-label="title"
                    item-value="value"
                    label="الدور"
                />
            </div>
            <AppInputField
                v-model="user.birthDay"
                type="date"
                label="تاريخ الميلاد"
            />
        </div>
        <template #actions>
            <BaseButton color="primary" :loading="usersStore.loading" @click="createUser"> حفظ </BaseButton>
        </template>
    </AppDialog>
</template>
