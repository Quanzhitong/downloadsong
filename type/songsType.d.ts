import { artistsType } from './namesType';
export declare type albumType = {
    id: number;
    name: string;
    artist: {};
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    alia: string[];
    mark: number;
};
export interface songType {
    id: number;
    name: string;
    artists: artistsType;
    album: albumType;
    duration: number;
    copyrightId: number;
    status: number;
    alias: string[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl: string;
    mark: number;
}
