import type { VideoStatus } from "../types";
import type { Video } from "../types";

export const VideoBody: Video = {
    title: '',
    file: '',
    isMain: false,
}


export const videoStatus: VideoStatus[] = [
    {
        value: true,
        title: "رئيسي",
        color: 'success'
    },
    {
        value: false,
        title: "ثانوي",
        color: 'danger'
    }
]