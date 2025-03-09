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
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useSessionStorage } from "usehooks-ts";

type ParamsType = {
    id: string;
}

export default function PlaylistPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [storagePlaylist, setStoragePlaylist] = useSessionStorage<Playlist | null>("playlist", null);
    const [playlist, setPlaylist] = useState<Playlist | null>(storagePlaylist);
    const [tracks, setTracks] = useState<Track[] | null>(null);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");
    const { token, platformAPI, loadPlaylist } = useAudio();


    useEffect(() => {
        if (storagePlaylist) return;
        platformAPI.getPlaylistById(id, token.base)
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
        platformAPI.getPlaylistItems(id, token.user)
            .then(res => setTracks(res.items));
    }, [playlist]);

    return (
        <main>
            <header className="h-80 p-6 relative" style={{background: dominantColor}}>
            <Link href="/" className="absolute top-8 left-8">
                <IoIosArrowBack size={20}/>
            </Link>
                <img className="h-full mx-auto shadow-black shadow-lg relative" src={playlist?.img} alt={playlist?.name} />
            </header>

            <section>
                <div className={"sticky top-0 flex justify-between items-center px-4 py-2"} style={{background: theme.bg}}>
                    <h2 className="!text-2xl font-bold">{playlist?.name}</h2>
                    <button 
                    className={"p-3 rounded-full"} 
                    style={{background: theme.main}}
                    onClick={() => loadPlaylist(tracks)}
                    >
                        <FaPlay size={15} color="#000"/>
                    </button>
                </div>

                <div className="flex flex-col gap-2 p-4" style={{background: theme.bg2}}>
                {tracks ? tracks.map((track: Track) => (
                    <TrackThumbnail key={track.id} track={track} />
                )): null}
                </div>
            </section>
        </main>
    )
}