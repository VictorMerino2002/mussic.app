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

type ParamsType = {
    id: string;
}

export default function ArtistPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [storageArtist, setStorageArtist] = useSessionStorage<Artist | null>("artist", null);
    const [artist, setArtist] = useState<Artist | null>(storageArtist);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");
    const { platformAPI, token } = useAudio();

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

    return (
        <main>
            <header className="h-80 p-6 relative" style={{background: dominantColor}}>
            <Link href="/" className="absolute top-8 left-8">
                <IoIosArrowBack size={20}/>
            </Link>
                <img className="h-full aspect-square object-cover mx-auto shadow-black shadow-lg relative" src={artist?.img} alt={artist?.name} />
            </header>

            <section>
                <div className={"sticky top-0 flex justify-between items-center px-4 py-2 border-b-gray-500 border w-full"} style={{background: theme.bg}}>
                        <h2 className="!text-2xl font-bold">{artist?.name}</h2>
                        <button 
                        className={"p-3 rounded-full"} 
                        style={{background: theme.main}}
                        >
                            <FaPlay size={15} color="#000"/>
                        </button>
                    </div>
            </section>
        </main>
    )
}