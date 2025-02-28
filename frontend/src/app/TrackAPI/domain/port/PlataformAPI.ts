import { Track } from "../entity/Track";
import { SearchResult } from "../../types/searchResult";
import { Playlist } from "../entity/Playlist";


export interface PlataformAPI {
    searchTrack(name: string, token: string): Promise<SearchResult<Track>>;

    getRelatedTrack(track: Track, limit: number, token: string): Promise<Track[]>;

    searchPlaylist(name: string, token: string): Promise<SearchResult<Playlist[]>>;

    getPlaylistById(id: string, token: string): Promise<Playlist>;

    getPlaylistItems(id: string, token: string): Promise<SearchResult<Track>>;
}