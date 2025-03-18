import { Track } from "../entity/Track";
import { SearchResult } from "../../types/searchResult";
import { Playlist } from "../entity/Playlist";
import { Artist } from "../entity/Artist";
import { Album } from "../entity/Album";


export interface PlatformAPI {
    searchTrack(name: string, token: string): Promise<SearchResult<Track>>;
    
    searchPlaylist(name: string, token: string): Promise<SearchResult<Playlist[]>>;

    searchArtist(name: string, token: string): Promise<SearchResult<Artist[]>>;

    searchAlbum(name: string, token: string): Promise<SearchResult<Album[]>>;
    
    getRelatedTrack(track: Track, limit: number, token: string): Promise<Track[]>;

    getPlaylistById(id: string, token: string): Promise<Playlist>;

    getArtistById(id: string, token: string): Promise<Artist>;

    getAlbumById(id: string, token: string): Promise<Album>;

    getPlaylistItems(id: string, token: string): Promise<SearchResult<Track>>;

    getAlbumItems(id: string, token: string): Promise<SearchResult<Album>>;

    getArtistAlbums(artistId: string, token: string): Promise<Album[]>;

    getArtistTopTracks(artistId: string, token: string): Promise<Track[]>;

    getCurrentUserPlaylists(token: string): Promise<Playlist[]>;

    getCurrentUserTopArtists(token: string): Promise<Artist[]>;

    getCurrentUserTopTracks(token: string): Promise<Track[]>;
}