<script setup lang="ts">
import { AppClient } from '~/services/app-client'
import AppDialog from '~/components/app-dialog/AppDialog.vue'
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue'
import AppInputField from '~/components/app-field/AppInputField.vue'
import { genders } from '~/views/users/service/utils'
import { useAppToaster } from '~/services/toaster/toaster'
import { useAuthStore } from '~/views/auth/stores'

const email = ref()
const authStore = useAuthStore()
const toaster = useAppToaster()
const isLogIn = ref(true)
const isLoading = ref(false)
definePageMeta({
    layout: 'empty',
    title: 'Login',
    preview: {
        title: 'Login',
        description: 'For authentication and sign in',
        categories: ['layouts', 'authentication'],
    },
})

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

const validatePhoneNumber = (phone: string) => {
    const re = /^\d+$/
    return re.test(phone)
}

const onLogin = async () => {
    if (!authStore.user.email || !authStore.user.password) {
        toaster.show('danger', 'جميع الحقول مطلوبة')
        return
    }
    if (!validateEmail(authStore.user.email)) {
        toaster.show('danger', 'البريد الإلكتروني غير صالح')
        return
    }
    if (authStore.user.password.length < 6) {
        toaster.show('danger', 'كلمة المرور يجب أن تكون على الأقل 6 أحرف')
        return
    }
    authStore.login()
}
</script>

<template>
    <div
        class="flex h-screen w-full bg-cover flex-col items-center md:flex-row bg-[url('public/login-bg.png')]"
    >
        <div class="hidden h-screen w-full lg:block xl:w-1/2">
            <div
                class="mx-auto flex size-full max-w-2xl items-center justify-center"
            >
                <!--Media image-->
                <img
                    class="mx-auto max-w-xl"
                    src="~public/logo.png"
                    width="300"
                    height="450"
                />
            </div>
        </div>

        <div
            class="flex bg-transparent h-screen w-full items-center justify-center px-6 md:mx-auto lg:max-w-full lg:px-16 xl:w-1/2 xl:px-12"
        >
            <div
                class="mx-auto flex size-full max-w-md md:max-w-lg lg:max-w-sm flex-col items-center justify-start gap-10 py-8"
            >
                <div class="w-full flex-grow flex flex-col justify-center">
                    <div v-if="isLogIn">
                        <div class="pb-5 border-b border-b-[#7B8798]">
                            <BaseParagraph
                                size="3xl"
                                class="text-muted-50 mb-4"
                            >
                                تسجيل الدخول لحسابك
                            </BaseParagraph>
                            <BaseParagraph size="lg" class="text-muted-50">
                                أذا كنت عضوا بالفعل , فيمكنك تسجيل الدخول
                                باستخدام عنوان البريد الالكتروني وكلمة المرور
                                الخاصين بك.
                            </BaseParagraph>
                        </div>

                        <form
                            v-if="isLogIn"
                            method="POST"
                            action=""
                            class="mt-5 text-center"
                            @submit.prevent="onLogin"
                        >
                            <div class="space-y-4">
                                <BaseInput
                                    v-model="authStore.user.email"
                                    type="text"
                                    label="عنوان البريد الالكتروني"
                                />
                                <BaseInput
                                    v-model="authStore.user.password"
                                    type="password"
                                    label="الرمز السري"
                                />
                            </div>
                            <!--Submit-->
                            <div class="mt-6">
                                <div
                                    class="grid grid-cols-1 gap-2 w-full rounded-md shadow-sm"
                                >
                                    <BaseButton
                                        :disabled="false"
                                        :loading="authStore.loading"
                                        type="submit"
                                        color="primary"
                                        class="!h-10"
                                    >
                                        تسجيل الدخول
                                    </BaseButton>
                                </div>
                            </div>
                            <!-- <BaseParagraph class="mt-10">
                                ليس لديك حساب ؟
                                <span
                                    class="text-primary-500 cursor-pointer"
                                    @click="() => (isLogIn = false)"
                                    >سجل هنا</span
                                >
                            </BaseParagraph> -->
                        </form>
                    </div>
                    <div v-if="!isLogIn" class="w-full">
                        <BaseParagraph size="2xl" class="text-muted-50 mb-1">
                            انشاء حساب
                        </BaseParagraph>

                        <form
                            method="POST"
                            action=""
                            class="mt-6"
                            @submit.prevent="onSignup"
                        >
                            <div class="grid grid-cols-1 gap-2">
                                <BaseInput
                                    v-model="registerBody.fullName"
                                    type="text"
                                    label="الاسم الكامل"
                                    class="!border !border-[#E2E8F0]"
                                />
                                <BaseInput
                                    v-model="registerBody.email"
                                    type="text"
                                    label="عنوان البريد الالكتروني"
                                    class="!border !border-[#E2E8F0]"
                                />
                                <BaseInput
                                    v-model="registerBody.phoneNumber"
                                    type="text"
                                    label="رقم الهاتف"
                                    class="!border !border-[#E2E8F0]"
                                />
                                <BaseInput
                                    v-model="registerBody.password"
                                    type="password"
                                    label="الرمز السري"
                                    class="!border !border-[#E2E8F0]"
                                />
                                <AppAutoCompleteField
                                    v-model="registerBody.gender"
                                    type="text"
                                    label="الجنس"
                                    :items="genders"
                                    item-label="label"
                                    item-value="value"
                                />
                                <AppInputField
                                    v-model="registerBody.birthDay"
                                    type="date"
                                    label="تاريخ الميلاد"
                                />
                            </div>
                            <!--Submit-->
                            <div class="mt-6">
                                <div
                                    class="grid grid-cols-1 gap-2 w-full rounded-md shadow-sm"
                                >
                                    <BaseButton
                                        :disabled="false"
                                        :loading="isLoading"
                                        type="submit"
                                        color="primary"
                                        class="!h-10"
                                    >
                                        انشاء الحساب
                                    </BaseButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
