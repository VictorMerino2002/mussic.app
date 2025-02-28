"use client"

import { theme } from "../../config";
import { Playlist } from "@/app/TrackAPI/domain/entity/Playlist";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import React from "react";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import ColorThief from "colorthief";
import { TrackThumbnail } from "@/components/TrackThumbnail";
import { useAudio } from "@/app/AudioProvider";

type ParamsType = {
    id: string;
}

export default function PlaylistPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [tracks, setTracks] = useState<Track[] | null>(null);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");
    const { token, plataformAPI, loadPlaylist } = useAudio();

    useEffect(() => {
        const sessionStoragePlaylist = sessionStorage.getItem("playlist");
        if (sessionStoragePlaylist) {
            setPlaylist(JSON.parse(sessionStoragePlaylist));
            return;
        }

        plataformAPI.getPlaylistById(id, token.base)
            .then(res => setPlaylist(res));
    }, []);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        if (!playlist) return;
        img.src = playlist.img;
    
        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
    }, [playlist]);

    useEffect(() => {
        plataformAPI.getPlaylistItems(id, token.user)
            .then(res => setTracks(res.items));
    }, [playlist]);

    return (
        <main>
            <header className="h-80 p-6 relative" style={{background: dominantColor}}>
                <img className="h-full mx-auto" src={playlist?.img} alt={playlist?.name} />
            </header>

            <section>
                <div className={"sticky top-0 flex justify-between items-center p-4 h-20 border-b-white border w-full"} style={{background: theme.bg}}>
                    <h2>{playlist?.name}</h2>
                    <button 
                    className={"p-3 rounded-full"} 
                    style={{background: theme.main}}
                    onClick={() => loadPlaylist(tracks)}
                    >
                        <FaPlay size={20} color="#000"/>
                    </button>
                </div>

                <div className="flex flex-col gap-5 p-4">
                {tracks ? tracks.map((track: Track) => (
                    <TrackThumbnail key={track.id} track={track} />
                )): null}
                </div>
            </section>
        </main>
    )
}