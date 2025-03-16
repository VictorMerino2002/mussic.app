"use client"
import { Album } from "../domain/entity/Album";
import { Artist } from "../domain/entity/Artist";
import { Playlist } from "../domain/entity/Playlist";
import { Track } from "../domain/entity/Track";
import { PlatformAPI } from "../domain/port/PlatformAPI";
import { SearchResult } from "../types/searchResult";
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
import { SpotifyTrack, SpotifyArtist, SpotifyPlaylist, SpotifyAlbum } from "../types/SpotifyTypes";
import { defaultImg } from "@/app/config";

export class SpotifyAPI implements PlatformAPI {
    
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
        return json.access_token;
    }

    getAuthorizeURL(redirectURI: string) {
        const url = "https://accounts.spotify.com/authorize";
        const scope = "playlist-modify-private user-library-modify playlist-modify-public";

        return url + `?client_id=${CLIENT_ID}` + "&response_type=token" + `&redirect_uri=${redirectURI}` + `&scope=${scope}`
    }

    async searchTrack(name: string, token: string): Promise<SearchResult<Track>> {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=track`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch tracks from Spotify API.");
        }

        const data = await res.json();
        const tracks = data.tracks.items.map((track: SpotifyTrack) => {
            const artists = track.artists.map(artist => {
                const img = artist?.images?.[0]?.url || defaultImg;
                return new Artist(artist.id, artist.name, img, artist.uri);
            });
            const album = new Album(
                track.album.id,
                track.album.name,
                track.album.images?.[0]?.url || '',
                track.album.uri,
                artists
            );

            return new Track(track.id, track.name, album, artists, track.uri);
        });

        const next = data.tracks.next;

        return { items: tracks, next };
    }

    async searchPlaylist(name: string, token: string): Promise<SearchResult<Playlist[]>> {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=playlist`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch playlists.");
        }

        const data = await res.json();
        const playlists = data.playlists.items
        .filter((playlist: SpotifyPlaylist) => playlist !== undefined && playlist !== null)
        .map((playlist: SpotifyPlaylist) => {
            return new Playlist(playlist.id, playlist.name, playlist.description, playlist.images[0].url, playlist.owner, playlist.public, playlist.tracks, playlist.uri);
        });
        const next = data.playlists.next;

        return { items: playlists, next };
    }

    async searchArtist(name: string, token: string): Promise<SearchResult<Artist[]>> {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Artists.");
        }

        const data = await res.json();
        const artists = data.artists.items
        .filter((artist: SpotifyArtist) => artist !== undefined && artist !== null)
        .map((artist: SpotifyArtist) => {
            const img = artist.images.length > 0 ? artist.images[0].url : defaultImg;
            return new Artist(artist.id, artist.name, img, artist.uri)
        })

        const next = data.artists.next;

        return { items: artists, next };
    }

    async searchAlbum(name: string, token: string): Promise<SearchResult<Album[]>> {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=album`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Failed to fetch Albums");

        const data = await res.json();

        const albums = data.albums.items.map((album) => {
            const artists = album.artists.map((artist) => new Artist(artist.id, artist.name, "", artist.uri));
            const img = album?.images?.[0]?.url || defaultImg;
            return new Album(album.id, album.name, img, album.uri, artists);
        });

        const next = data.albums.next;

        return { items: albums, next };
    }

    async getAlbumById(id: string, token: string): Promise<Album> {
        const url = `https://api.spotify.com/v1/albums/${id}`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Failed to fetch album");

        const data = await res.json();
        const img = data?.images?.[0]?.url || defaultImg;

        const artists = data.artists.map(artist => new Artist(artist.id, artist.name, img, artist.uri));
        return new Album(data.id, data.name, img, data.uri, artists);
    }
    
    async getPlaylistById(id: string, token: string): Promise<Playlist> {
        const url = `https://api.spotify.com/v1/playlists/${id}`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch playlists.");
        }
        
        const data = await res.json();
        
        return new Playlist(data.id, data.name, data.description, data.images[0].url, data.owner, data.public, data.tracks, data.uri);
    }
    
    async getArtistById(id: string, token: string): Promise<Artist> {
        const url = `https://api.spotify.com/v1/artists/${id}`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }); 
        
        if (!res.ok) {
            throw new Error("Failed to fetch playlists from Spotify API.");
        }
        
        const data = await res.json();
        const img = data?.images?.[0]?.url || defaultImg;
        
        return new Artist(data.id, data.name, img, data.uri); 
    }

    async getAlbumItems(id: string, token: string): Promise<SearchResult<Album>> {
        const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Failed to fetch album tracks.");

        const data = await res.json();
        console.log(data);

        const tracks = data.items.map((track) => {
            if (!track) return;
            const artists = track.artists.map((artist: SpotifyArtist) => {
                const img = artist?.images?.[0]?.url || defaultImg;
                return new Artist(artist.id, artist.name, img, artist.uri);
            });


            return new Track(track.id, track.name, null, artists, track.uri);
        })
        .filter((track: null | undefined) => track != undefined && track != null);
        const next = data.next;
        return { items: tracks, next };
    }

    async getPlaylistItems(id: string, token: string): Promise<SearchResult<Track>> {
        const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch playlist tracks.");
        }

        const data = await res.json();

        const tracks = data.items.map((track: { track: { album: { id: string; name: string; images: { url: any; }[]; uri: string; }; artists: SpotifyArtist[]; id: string; name: string; uri: string; }; }) => {
            if (!track.track) return;
            const artists = track.track.artists.map((artist: SpotifyArtist) => {
                const img = artist?.images?.[0]?.url || defaultImg;
                return new Artist(artist.id, artist.name, img, artist.uri);
            });
            const album = new Album(
                track.track.album.id,
                track.track.album.name,
                track.track.album.images?.[0]?.url || defaultImg,
                track.track.album.uri,
                artists
            );

            return new Track(track.track.id, track.track.name, album, artists, track.track.uri);
        })
        .filter((track: null | undefined) => track != undefined && track != null);
        const next = data.next;
        return { items: tracks, next };
    }

    async getRelatedTrack(track: Track, limit: number = 5, token: string): Promise<Track[]> {
        if (!track.artists || track.artists.length === 0) {
            return [];
        }
    
        const albums = await this.getArtistAlbums(track.artists[0].id, token);
        const randomAlbums = albums.sort(() => Math.random() - 0.5);
        const relatedTracks: Track[] = [];
    
        let index = 0;
        while (relatedTracks.length < limit && index < randomAlbums.length) {
            const album = randomAlbums[index];
            const albumTracks = await this.getAlbumTracks(album.id, token);
    
            for (const trackData of albumTracks) {
                if (relatedTracks.length >= limit) break;
    
                const artistsInstance = trackData.artists.map((artist: SpotifyArtist) => {
                    const img = artist?.images?.[0]?.url || defaultImg;
                    return new Artist(artist.id, artist.name, img,artist.uri);
                }
                );
    
                const newTrack = new Track(
                    trackData.id,
                    trackData.name,
                    album,
                    artistsInstance,
                    trackData.uri
                );
    
                relatedTracks.push(newTrack);
            }
    
            index++;
        }
    
        return relatedTracks;
    }

    async getArtistAlbums(artistId: string, token: string): Promise<Album[]> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=album,single`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch albums.");
        }

        const json = await res.json();
        const albums = json.items.map((album: SpotifyAlbum) => {
            const img = album?.images?.[0]?.url || defaultImg;
            return new Album(album.id, album.name, img, album.uri, []);
        });

        return albums;
    }

    async getArtistTopTracks(artistId: string, token: string): Promise<Track[]> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }   
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Top Tracks.");
        }

        const data = await res.json();

        const tracks = data.tracks.map((track: SpotifyTrack) => {
            const artists = track.artists.map(artist => {
                const img = artist?.images?.[0]?.url || defaultImg;
                return new Artist(artist.id, artist.name, img, artist.uri);
            });
            const album = new Album(
                track.album.id,
                track.album.name,
                track.album.images?.[0]?.url || '',
                track.album.uri,
                artists
            );

            return new Track(track.id, track.name, album, artists, track.uri);
        });

        return tracks;
    }

    async getAlbumTracks(albumId: string, token: string) {
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch album tracks from Spotify API.");
        }

        const json = await res.json();
        return json.items;
    }
}
