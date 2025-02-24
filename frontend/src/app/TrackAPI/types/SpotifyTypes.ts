export type SpotifyArtist = {
    id: string;
    name: string;
    href: string;
    uri: string;
  };
  
  export type SpotifyAlbum = {
    id: string;
    name: string;
    releaseDate: string;
    totalTracks: number;
    images: { url: string; height: number; width: number }[];
    href: string;
    uri: string;
  };
  
  export type SpotifyTrack = {
    id: string;
    name: string;
    durationMs: number;
    explicit: boolean;
    popularity: number;
    previewUrl: string | null;
    trackNumber: number;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    href: string;
    uri: string;
  };