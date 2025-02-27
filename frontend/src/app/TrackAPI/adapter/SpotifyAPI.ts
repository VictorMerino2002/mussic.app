import { Album } from "../domain/entity/Album";
import { Artist } from "../domain/entity/Artist";
import { Playlist } from "../domain/entity/Playlist";
import { Track } from "../domain/entity/Track";
import { PlataformAPI } from "../domain/port/PlataformAPI";
import { SearchResult } from "../types/searchResult";
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
import { SpotifyTrack, SpotifyAlbum, SpotifyArtist, SpotifyPlaylist } from "../types/SpotifyTypes";

export class SpotifyAPI implements PlataformAPI {
    token: string;

    constructor() {
        this.token = "";
    }

    
    async getToken() {
        if (!CLIENT_ID || !CLIENT_SECRET) {
            throw new Error("Spotify client ID or client secret is not defined.");
        }

        const url = "https://accounts.spotify.com/api/token";
        const headers = {
            'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            "Content-Type": "application/x-www-form-urlencoded"
        };

        const res = await fetch(url, {
            method: "POST",
            headers,
            body: "grant_type=client_credentials"
        });

        if (!res.ok) {
            throw new Error("Failed to get token from Spotify API.");
        }

        const json = await res.json();
        this.token = json.access_token;
    }

    async searchTrack(name: string): Promise<SearchResult<Track>> {
        if (!this.token) {
            await this.getToken();
        }
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=track`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch tracks from Spotify API.");
        }

        const data = await res.json();
        const tracks = data.tracks.items.map((track: SpotifyTrack) => {
            const album = new Album(
                track.album.id,
                track.album.name,
                track.album.images?.[0]?.url || '',
                track.album.uri
            );
            const artists = track.artists.map(artist => new Artist(artist.id, artist.name, artist.uri));

            return new Track(track.id, track.name, album, artists, track.uri);
        });

        const next = data.tracks.next;

        return { items: tracks, next };
    }

    async searchPlaylist(name: string): Promise<SearchResult<Playlist[]>> {
        if (!this.token) {
            await this.getToken();
        }
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=playlist`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch playlists from Spotify API.");
        }

        const data = await res.json();
        const playlists = data.playlists.items
        .filter((playlist: Playlist) => playlist !== undefined && playlist !== null)
        .map((playlist: SpotifyPlaylist) => {
            if (!playlist) return;
            return new Playlist(playlist.id, playlist.name, playlist.description, playlist.images[0].url, playlist.owner, playlist.public, playlist.tracks, playlist.uri);
        });
        const next = data.playlists.next;

        return { items: playlists, next };
    }

    async getPlaylistById(id: string): Promise<Playlist> {
        if (!this.token) {
            await this.getToken();
        }
        const url = `https://api.spotify.com/v1/playlists/${id}`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch playlists from Spotify API.");
        }

        const data = await res.json();

        return new Playlist(data.id, data.name, data.description, data.images[0].url, data.owner, data.public, data.tracks, data.uri);
    }

    async getPlaylistItems(id: string): Promise<SearchResult<Track>> {
        if (!this.token) {
            await this.getToken();
        }
        const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch playlists from Spotify API.");
        }

        const data = await res.json();

        const tracks = data.items.map((track) => {
            if (!track.track) return;
            const album = new Album(
                track.track.album.id,
                track.track.album.name,
                track.track.album.images?.[0]?.url || '',
                track.track.album.uri
            );
            const artists = track.track.artists.map(artist => new Artist(artist.id, artist.name, artist.uri));

            return new Track(track.id, track.name, album, artists, track.uri);
        })
        .filter(track => track != undefined && track != null);

        const next = data.next;

        return { items: tracks, next };
    }

    async getRelatedTrack(track: Track, limit: number = 5): Promise<Track[]> {
        if (!this.token) {
            await this.getToken();
        }
        if (!track.artists || track.artists.length === 0) {
            return [];
        }
    
        const albums = await this.getArtistAlbums(track.artists[0].id);
        const randomAlbums = albums.sort(() => Math.random() - 0.5);
        const relatedTracks: Track[] = [];
    
        let index = 0;
        while (relatedTracks.length < limit && index < randomAlbums.length) {
            const album = randomAlbums[index];
            const albumTracks = await this.getAlbumTracks(album.id);
    
            for (const trackData of albumTracks) {
                if (relatedTracks.length >= limit) break;
                
                
                const albumInstance = new Album(
                    album.id,
                    album.name,
                    album.images?.[0]?.url || '',
                    album.uri
                );
    
                const artistsInstance = trackData.artists.map((artist: SpotifyArtist) => 
                    new Artist(artist.id, artist.name, artist.uri)
                );
    
                const newTrack = new Track(
                    trackData.id,
                    trackData.name,
                    albumInstance,
                    artistsInstance,
                    trackData.uri
                );
    
                relatedTracks.push(newTrack);
            }
    
            index++;
        }
    
        return relatedTracks;
    }

    async getArtistAlbums(artistId: string) {
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=album,single`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch albums from Spotify API.");
        }

        const json = await res.json();
        return json.items;
    }

    async getAlbumTracks(albumId: string) {
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch album tracks from Spotify API.");
        }

        const json = await res.json();
        return json.items;
    }
}
