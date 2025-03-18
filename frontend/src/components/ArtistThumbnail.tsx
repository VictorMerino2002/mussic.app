"use client"
import { useAudio } from "@/app/AudioPlayer";
import { useSearchHistory } from "@/app/hooks/useSearchHistory";
import { Artist } from "@/app/TrackAPI/domain/entity/Artist"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export function ArtistThumbnail({artist}: { artist: Artist }) {

    const router = useRouter();
    const [storageArtist, setStorageArtist] = useSessionStorage<Artist | null>("artist", null);
    const artistHistory = useSearchHistory<Artist>("artist");

    const handleClick = () => {
        setStorageArtist(artist);
        artistHistory.push(artist);
        router.push(`/artist/${artist.id}`);
    }

    return (
        <div className="flex gap-3 cursor-pointer p-2 rounded-md" onClick={handleClick} style={{background: "#0009"}}>
            <img
                src={artist.img}
                alt={artist.name}
                className="h-16 aspect-square rounded-md"
            />
            
            <div className="w-full flex flex-col">
                <h3>{artist.name}</h3>
                <small>Artist</small>
            </div>
        </div>
    )
}