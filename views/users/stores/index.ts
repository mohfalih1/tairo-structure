import { AxiosError } from 'axios'
import { UsersService } from '../service'
import type { User } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import { useAppToaster } from '~/services/toaster/toaster'
const usersService = new UsersService()
type ApiError = AxiosError<PaginatedResponse<User>>

export const useUsersStore = defineStore('Users-page', () => {
    const users = ref<User[]>([])
    const editUser = ref<User>({} as User)
    const editUserPass = ref<User>({} as User)
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const isEditPassDialogOpen = ref(false)
    const isViewDialogOpen = ref(false)
    const editId = ref()
    const total = ref(0)
    const loading = ref(false)
    const error = ref(null)
    const imgSrc = ref('')
    const toaster = useAppToaster()
    const filters = ref({
        // pageNumber: 1,
    })
    const fetchUsers = async () => {
        users.value = []
        loading.value = true
        try {
            const response = await usersService.getAll(filters.value)
            users.value = response as User[]
            total.value = response.pagesCount
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    const fetchSingleUser = async () => {
        if (!editId.value) throw new Error('editId not set')
        try {
            const response = await usersService.getSingle(editId.value)
            return response
        } catch (e) {
            console.log(e)
        }
    }
    const setEditId = async (id: string | number) => {
        console.log('setting edit id')
        loading.value = true
        isEditDialogOpen.value = true
        editId.value = id
        editUser.value = await fetchSingleUser()
        loading.value = false
    }

    const setEdipasstId = async (id: string | number) => {
        loading.value = true
        isEditPassDialogOpen.value = true
        editId.value = id
        editUserPass.value = await fetchSingleUser()
        loading.value = false
    }

    const updateUserPass = async () => {
        loading.value = true
        try {
            await usersService.updatePass({
                userId: editId.value,
                newPassword: editUserPass.value.password,
            })
            isEditPassDialogOpen.value = false
            editUserPass.value = {}

            await fetchUsers()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }

    const deleteUsers = async (id: string) => {
        try {
            await usersService.delete(id)
            await fetchUsers()
        } catch (e) {
            console.log(e)
        }
    }
    const createUsers = async (User: User) => {
        loading.value = true
        try {
            await usersService.create(User)
            isCreateDialogOpen.value = false
            await fetchUsers()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    const updateUsers = async () => {
        loading.value = true
        try {
            await usersService.update(editId.value, editUser.value)
            isEditDialogOpen.value = false

            await fetchUsers()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }

    const setImg = (src: string) => {
        imgSrc.value = src
        isViewDialogOpen.value = true
    }
    return {
        users,
        editUser,
        loading,
        editId,
        error,
        total,
        filters,
        isCreateDialogOpen,
        isEditDialogOpen,
        isViewDialogOpen,
        imgSrc,
        fetchUsers,
        fetchSingleUser,
        updateUsers,
        createUsers,
        setEditId,
        setImg,
        deleteUsers,
        isEditPassDialogOpen,
        setEdipasstId,
        editUserPass,
        updateUserPass,
    }
})
