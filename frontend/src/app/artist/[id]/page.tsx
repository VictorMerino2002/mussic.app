"use client"

import { useAudio } from "@/app/AudioProvider";
import { Artist } from "@/app/TrackAPI/domain/entity/Artist";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSessionStorage } from "usehooks-ts";
import ColorThief from "colorthief";
import { theme } from "@/app/config";
import { FaPlay } from "react-icons/fa6";
import { Album } from "@/app/TrackAPI/domain/entity/Album";
import { ArtistThumbnail } from "@/components/ArtistThumbnail";
import { AlbumThumbnail } from "@/components/AlbumThumbnail";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import { TrackThumbnail } from "@/components/TrackThumbnail";

type ParamsType = {
    id: string;
}

export default function ArtistPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [storageArtist, setStorageArtist] = useSessionStorage<Artist | null>("artist", null);
    const [artist, setArtist] = useState<Artist | null>(storageArtist);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");
    const [topTracks, setTopTracks] = useState<Track[] | null>(null);
    const [albums, setAlbums] = useState<Album[] | null>(null);
    const { platformAPI, token, loadPlaylist } = useAudio();

    useEffect(() => {
        if (storageArtist) return;
        platformAPI.getArtistById(id, token.base)
            .then((res: Artist) => setArtist(res));
    }, []);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        if (!artist) return;
        img.src = artist.img;
    
        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
    }, [artist]);

    
    useEffect(() => {
        const getTopTracks = async () => {
            const artistTopTracks = await platformAPI.getArtistTopTracks(id, token.base);
            setTopTracks(artistTopTracks);
        }

        const getAlbums = async () => {
            const artistAlbums = await platformAPI.getArtistAlbums(id, token.base);
            setAlbums(artistAlbums);
        }

        getTopTracks();
        getAlbums();
    },[]);

    return (
        <main>
            <header className="h-80 p-6 relative" style={{background: dominantColor}}>
            <Link href="/" className="absolute top-8 left-8">
                <IoIosArrowBack size={20}/>
            </Link>
                <img className="h-full aspect-square object-cover mx-auto shadow-black shadow-lg relative" src={artist?.img} alt={artist?.name} />
            </header>

            <section className="sticky top-0">
                <div className={"flex justify-between items-center px-4 py-2 w-full"} style={{background: theme.bg}}>
                        <h2 className="!text-2xl font-bold">{artist?.name}</h2>
                        <button 
                        className={"p-3 rounded-full"} 
                        style={{background: theme.main}}
                        >
                            <FaPlay size={15} color="#000" onClick={() => loadPlaylist(topTracks)}/>
                        </button>
                    </div>
            </section>

            <section className="p-4 flex flex-col gap-2" style={{background: theme.bg2}}>
                <h3 className="font-bold !text-xl">Top Songs</h3>
                {topTracks ? topTracks.slice(0,5).map((track: Track) => (
                    <TrackThumbnail key={track.id} track={track} />
                )) : null}
            </section>

            <section className="p-4 grid grid-cols-2 gap-2 items-center" style={{background: theme.bg2}}>
                <h3 className="font-bold !text-xl col-span-2">Albums</h3>
                {albums ? albums.map((album: Album) => (
                    <AlbumThumbnail key={album.id} album={album}/>
                )) : null}
            </section>
        </main>
    )
}