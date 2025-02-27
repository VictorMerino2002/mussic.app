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
export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

