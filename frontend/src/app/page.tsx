"use client"
import { useEffect, useState } from "react";
import { useAudio } from "./AudioPlayer";
import { useMinimize } from "./hooks/useMinimize";
import { Track } from "./TrackAPI/domain/entity/Track";
import { Artist } from "./TrackAPI/domain/entity/Artist";
import { theme } from "./config";
import { ArtistThumbnail } from "@/components/ArtistThumbnail";
import { TrackThumbnail } from "@/components/TrackThumbnail";
import { useSessionStorage } from "usehooks-ts";

export default function Home() {
  const { platformAPI, token } = useAudio();
  
  const [artistTotal, setArtistTotal] = useSessionStorage("top-artists-total-count", null); 
  const [trackTotal, setTrackTotal] = useSessionStorage("top-tracks-total-count", null); 
  
  const [sessionTracks, setSessionTracks] = useSessionStorage("track-recommendations", null);
  const [sessionArtists, setSessionArtists] = useSessionStorage("artist-recommendations", null);
  
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  
  useMinimize();

  useEffect(() => {
    if (!sessionArtists || !sessionTracks) return;
    setArtists(sessionArtists);
    setTracks(sessionTracks);
  } ,[sessionArtists, sessionTracks]);

  useEffect(() => {
    const fetTopItems = async () => {
      if (!token.user || (sessionArtists && sessionTracks)) return;
      if (!artistTotal) {
        const aTotal = await platformAPI.getCurrentUserTopArtistsNumOfItems(token.user);
        setArtistTotal(aTotal);
      }
      if (!trackTotal) {
        const tTotal = await platformAPI.getCurrentUserTopTracksNumOfItems(token.user);
        setTrackTotal(tTotal);
      } 

      platformAPI.getRandomCurrentUserTopArtists(artistTotal, token.user)
      .then(res => {
        setArtists(res);
        setSessionArtists(res);
      });

      platformAPI.getRandomCurrentUserTopTracks(trackTotal, token.user)
      .then(res => {
        setTracks(res);
        setSessionTracks(res);
      });
    }
    fetTopItems();
  },[token.user]);

  return (
    <main className="flex flex-col gap-2 p-4 min-h-screen" style={{ background: theme.bg2 }}>
        <h1 className="p-4 pl-6 font-bold text-2xl w-full absolute left-0 top-0" style={{background: theme.bg}}>Recommendations:</h1>
        <h2 className="pl-2 font-bold text-2xl pt-16">Artists</h2>
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
