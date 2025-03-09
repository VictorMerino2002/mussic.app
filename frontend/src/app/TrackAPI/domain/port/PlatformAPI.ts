import { Track } from "../entity/Track";
import { SearchResult } from "../../types/searchResult";
import { Playlist } from "../entity/Playlist";
import { Artist } from "../entity/Artist";
import { Album } from "../entity/Album";


export interface PlatformAPI {
    searchTrack(name: string, token: string): Promise<SearchResult<Track>>;
    
    searchPlaylist(name: string, token: string): Promise<SearchResult<Playlist[]>>;

    searchArtist(name: string, token: string): Promise<SearchResult<Artist[]>>;
    
    getRelatedTrack(track: Track, limit: number, token: string): Promise<Track[]>;

    getPlaylistById(id: string, token: string): Promise<Playlist>;

    getArtistById(id: string, token: string): Promise<Artist>;

    getPlaylistItems(id: string, token: string): Promise<SearchResult<Track>>;

    getArtistAlbums(artistId: string, token: string): Promise<Album[]>;

    getArtistTopTracks(artistId: string, token: string): Promise<Track[]>;
}