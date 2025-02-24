import { Track } from "../entity/Track";
import { SearchResult } from "../../types/searchResult";


export interface PlataformAPI {
    searchTrack(name: string): Promise<SearchResult<Track>>;

    getRelatedTrack(track: Track, limit: number): Promise<Track[]>;
}