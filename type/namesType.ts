import { serverType } from './serverType';
export type artistsType = {
    id: number,
    name: string,
    picUrl: string,
    alias: unknown[],
    albumSize: number,
    picId: number,
    img1v1Url: string,
    img1v1: number,
    trans: null
}[]

export interface songType {
    name: string,
    artists: artistsType,
    id: number,
    server: serverType
}

