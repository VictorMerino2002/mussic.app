"use client"
import { useEffect, useState } from "react";
import { useAudio } from "./AudioPlayer";
import { useMinimize } from "./hooks/useMinimize";
import { Track } from "./TrackAPI/domain/entity/Track";
import { Artist } from "./TrackAPI/domain/entity/Artist";
import { theme } from "./config";
import { ArtistThumbnail } from "@/components/ArtistThumbnail";
import { TrackThumbnail } from "@/components/TrackThumbnail";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const { platformAPI, token } = useAudio();

  useMinimize();

  useEffect(() => {
    if (!token.user) return;
    platformAPI.getCurrentUserTopArtists(token.user)
    .then(res => setArtists(res));

    platformAPI.getCurrentUserTopTracks(token.user)
    .then(res => setTracks(res));
  },[token.user]);

  return (
    <main className="flex flex-col gap-2 p-4 min-h-screen" style={{ background: theme.bg2 }}>
        <h2 className="pl-2 font-bold text-2xl">Artists</h2>
        <header className="grid grid-cols-2 gap-1">
            {artists.map(artist => (
              <ArtistThumbnail key={artist.id} artist={artist} />
            ))}
        </header>
          
        <h2 className="pl-2 font-bold text-2xl">Songs</h2>
        <section className="flex flex-col gap-1 pb-20">
          {tracks.map(track => (
            <TrackThumbnail key={track.id} track={track} />
          ))}
        </section>
    </main>
  );
}
