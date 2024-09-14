<script setup lang="ts">
import AppCrudActions from '~/components/app-crud/components/AppCrudActions.vue'
import { tableHeader } from '~/views/users'
import { useAppTableStore } from '~/components/app-table/stores/AppTableStore'
import type { User } from '~/views/users/types'
import UserCreate from '~/views/users/components/UserCreate.vue'
import UserEdit from '~/views/users/components/UserEdit.vue'
import { genders, userRole } from '~/views/users/service/utils'
import UserEditPass from '~/views/users/components/UserEditPass.vue'

definePageMeta({
    title: 'المستخدمين',
    preview: {
        title: 'Users Page',
        description: 'Manage users and their data',
    },
})

const usersStore = useUsersStore()
const appTableStore = useAppTableStore()
const users = computed(() => usersStore.users || [])
onMounted(async () => {
    appTableStore.setLoading(true)
    await usersStore.fetchUsers()
    appTableStore.setLoading(false)
})
const filters = computed(() => {
    return usersStore.filters
})
const total = computed(() => {
    return usersStore.total * 10
})
watch(
    () => filters.value,
    async () => {
        appTableStore.setLoading(true)
        await usersStore.fetchUsers()
        appTableStore.setLoading(false)
    },
    { deep: true }
)
</script>

<template>
    <div>
        <AppCrud
            title="users"
            :pagination="true"
            :total-items="total"
            add-button-text="اضافة مستخدم"
            :add-btn-action="() => (usersStore.isCreateDialogOpen = true)"
            v-model:current-page="usersStore.filters.pageNumber"
        >
            <template #filters>
                    <AppFilters :filters="filters">
                        <BaseInput v-model="filters.name" placeholder="اسم الفرع"> </BaseInput>
                    </AppFilters>
                </template>
            <AppTable :headers="tableHeader" :items="users">
                <template #data-id="data">
                    <span> {{ data.index + 1 }} </span>
                </template>
                <template #data-actions="data">
                    <div class="items-center justify-center flex gap-2">
                        <AppCrudActions
                            :item="data.item"
                            :deleteService="usersStore.deleteUsers"
                            :edit-button-action="
                                () => usersStore.setEditId(data.item.id)
                            "
                        />
                        <!-- <BaseButton
                            variant="pastel"
                            class="size-9"
                            color="danger"
                            size="sm"
                            rounded="full"
                            @click="() => usersStore.setEditId(data.item.id)"
                        >
                            <span
                                class="flex size-9 items-center justify-center rounded-full"
                            >
                                <Icon
                                    name="ph:password-duotone"
                                    class="text-danger-600 size-5"
                                />
                            </span>
                        </BaseButton> -->
                    </div>
                </template>

                <!-- <template #data-role="data">
                    <span
                        class="bg-muted-400 rounded-2xl p-2"
                        :class="`text-${
                            userRole.find((U) => data.item.role === U.value)
                                ?.color
                        }-500`"
                    >
                        {{
                            userRole.find((U) => data.item.role === U.value)
                                ?.title
                        }}
                    </span>
                </template> -->

                <!-- <template #data-gender="data">
                    <span
                        class="bg-muted-400 rounded-2xl p-2"
                        :class="`text-${
                            genders.find((U) => data.item.gender === U.value)
                                ?.color
                        }-500`"
                    >
                        {{
                            genders.find((U) => data.item.gender === U.value)
                                ?.label
                        }}
                    </span>
                </template> -->
            </AppTable>
        </AppCrud>
        <UserCreate />
        <UserEdit />
        <UserEditPass />
    </div>
</template>
