import { toFormData } from 'axios'
import axios from './axios'

interface IFileUploaderClient {
    fileUploadUrl: string
    postMulti: (data: FileList) => Promise<string[]>
    post: (data: FileList) => Promise<string>
}

export class FileUploaderClient implements IFileUploaderClient {
    fileUploadUrl = '/file/multi'
    async post(data: FileList): Promise<string> {
        const response = await axios.post(
            this.fileUploadUrl,
            toFormData({ files: data[0] })
        )
        return response.data[0]
    }
    async postMulti(data: FileList): Promise<string[]> {
        const paths = ref<string[]>([])
        for (const file of data) {
            const formData = new FormData()
            formData.append('files', file)
            try {
                const response = await axios.post(this.fileUploadUrl, formData)
                paths.value.push(response.data[0])
            } catch (error) {
                console.error('File upload failed', error)
            }
        }
        return paths.value
    }
}
