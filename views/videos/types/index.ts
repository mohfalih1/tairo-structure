export interface Video {
    id?: number
    title?: string;
    file?: string | FileList;
    isMain?: boolean;
}

export interface VideoStatus {
    value: boolean;
    title: string;
    color: string;
}