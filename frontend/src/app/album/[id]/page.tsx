"use client"
import { useAudio } from "@/app/AudioPlayer";
import { Album } from "@/app/TrackAPI/domain/entity/Album";
import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import ColorThief from "colorthief";
import { IoIosArrowBack } from "react-icons/io";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import { TrackThumbnail } from "@/components/TrackThumbnail";
import { theme } from "@/app/config";
import { FaPlay } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type ParamsType = {
    id: string;
}

export default function AlbumPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [storageAlbum, setStorageAlbum] = useSessionStorage<Album | null>("album", null);
    const [album, setAlbum] = useState<Album | null>(storageAlbum);
    const [tracks, setTracks] = useState<Track[] | null>(null);
    const [dominantColor, setDominantColor] = useState("rgb(0,0,0)");
    const { token, platformAPI, loadPlaylist } = useAudio();
    const router = useRouter();

    useEffect(() => {
        if (storageAlbum && storageAlbum.id === id) return;
        platformAPI.getAlbumById(id, token.user)
            .then(res => {
                setStorageAlbum(res);
                setAlbum(res);
            });
    },[]);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        if (!album) return;
        img.src = album.img;
    
        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
    }, [album]);

    useEffect(() => {
        platformAPI.getAlbumItems(id, token.user)
            .then(res => {
                const tracksWithAlbums = res.items.map(track => {
                    track.album = album
                    return track;
                });
                setTracks(tracksWithAlbums);
            });
    }, [album]);

    return (
        <main>
            <header className="h-80 p-6 relative" style={{background: dominantColor}}>
            <button onClick={() => router.back()} className="absolute top-8 left-8">
                <IoIosArrowBack size={20}/>
            </button>
                <img className="h-full mx-auto shadow-black shadow-lg relative" src={album?.img} alt={album?.name} />
            </header>

            <section>
                <div className={"sticky top-0 flex justify-between items-center px-4 py-2"} style={{background: theme.bg}}>
                    <h2 className="!text-2xl font-bold">{album?.name}</h2>
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
    );
}