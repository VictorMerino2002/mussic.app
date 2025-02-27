import { Track } from "../entity/Track";
import { SearchResult } from "../../types/searchResult";
import { Playlist } from "../entity/Playlist";


export interface PlataformAPI {
    searchTrack(name: string): Promise<SearchResult<Track>>;

    getRelatedTrack(track: Track, limit: number): Promise<Track[]>;

    searchPlaylist(name: string): Promise<SearchResult<Playlist[]>>;

    getPlaylistById(id: string): Promise<Playlist>;

    getPlaylistItems(id: string): Promise<SearchResult<Track>>;
}