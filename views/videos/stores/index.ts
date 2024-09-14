import { AxiosError } from 'axios'
import { VideosService } from '../service'
import type { Video } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import { useAppToaster } from '~/services/toaster/toaster'
const videosService = new VideosService()
type ApiError = AxiosError<PaginatedResponse<Video>>

export const useVideosStore = defineStore('Videos-page', () => {
    const videos = ref<Video[]>([])
    const editVideo = ref<Video>({} as Video)
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const isViewDialogOpen = ref(false)
    const videoSrc = ref('')
    const editId = ref()
    const total = ref(0)
    const loading = ref(false)
    const error = ref(null)
    const toaster = useAppToaster()
    const filters = ref({
        pageNumber: 1,
        isMain: null,
    })
    const fetchVideos = async () => {
        videos.value = []
        loading.value = true
        try {
            const response = await videosService.getAll(filters.value)
            videos.value = response.data as Video[]
            total.value = response.pagesCount
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    const fetchSingleVideo = async () => {
        if (!editId.value) throw new Error('editId not set')
        try {
            const response = await videosService.getSingle(editId.value)
            return response
        } catch (e) {
            console.log(e)
        }
    }
    const setEditId = async (id: string) => {
        console.log('setting edit id')
        loading.value = true
        isEditDialogOpen.value = true
        editId.value = id
        editVideo.value = await fetchSingleVideo()
        loading.value = false
    }
    const deleteVideos = async (id: string) => {
        try {
            await videosService.delete(id)
            await fetchVideos()
        } catch (e) {
            console.log(e)
        }
    }
    const createVideos = async (video: Video) => {
        loading.value = true
        try {
            await videosService.create(video)
            isCreateDialogOpen.value = false
            await fetchVideos()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    const updateVideos = async () => {
        loading.value = true
        try {
            await videosService.update(editId.value, editVideo.value)
            isEditDialogOpen.value = false

            await fetchVideos()
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }

    const setVideo = (src: string) => {
        videoSrc.value = src
        isViewDialogOpen.value = true
    }
    return {
        videos,
        editVideo,
        loading,
        editId,
        error,
        videoSrc,
        filters,
        total,
        isCreateDialogOpen,
        isEditDialogOpen,
        isViewDialogOpen,
        fetchVideos,
        fetchSingleVideo,
        updateVideos,
        createVideos,
        setEditId,
        setVideo,
        deleteVideos,
    }
})
