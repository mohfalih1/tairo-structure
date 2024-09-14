import { AxiosError } from 'axios'
import { AdsService } from '../service'
import type { Ad } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import { useAppToaster } from '~/services/toaster/toaster'
const adsService = new AdsService()
type ApiError = AxiosError<PaginatedResponse<Ad>>

export const useAdsStore = defineStore('Ads-page', () => {
    const ads = ref<Ad[]>([])
    const editAd = ref<Ad>({} as Ad)
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const editId = ref()
    const total = ref(0)
    const filesSrc = ref<string | string[]>('')
    const isViewDialogOpen = ref(false)
    const loading = ref(false)
    const error = ref(null)
    const toaster = useAppToaster()
    const filters = ref({
        pageNumber: 1,
    })
    const fetchAds = async () => {
        ads.value = []
        loading.value = true
        try {
            const response = await adsService.getAll(filters.value)
            ads.value = response.data as Ad[]
            total.value = response.pagesCount
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    const fetchSingleAd = async () => {
        if (!editId.value) throw new Error('editId not set')
        try {
            const response = await adsService.getSingle(editId.value)
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const setFiles = (data: string | string[]) => {
        filesSrc.value = data
        isViewDialogOpen.value = true
    }

    const setEditId = async (id: string) => {
        console.log('setting edit id')
        loading.value = true
        isEditDialogOpen.value = true
        editId.value = id
        editAd.value = await fetchSingleAd()
        loading.value = false
    }
    const deleteAds = async (id: string) => {
        try {
            await adsService.delete(id)
            await fetchAds()
        } catch (e) {
            console.log(e)
        }
    }
    const createAds = async (ad: Ad) => {
        loading.value = true
        try {
            await adsService.create(ad)
            isCreateDialogOpen.value = false
            await fetchAds()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    const updateAds = async () => {
        loading.value = true
        try {
            await adsService.update(editId.value, editAd.value)
            editAd.value = {}
            isEditDialogOpen.value = false

            await fetchAds()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    return {
        ads,
        editAd,
        loading,
        editId,
        error,
        total,
        filters,
        filesSrc,
        isCreateDialogOpen,
        isEditDialogOpen,
        isViewDialogOpen,
        fetchAds,
        fetchSingleAd,
        updateAds,
        createAds,
        setEditId,
        setFiles,
        deleteAds,
    }
})
