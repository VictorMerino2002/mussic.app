"use client"
import { useAudio } from "@/app/AudioProvider";
import { Artist } from "@/app/TrackAPI/domain/entity/Artist"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export function ArtistThumbnail({artist}: { artist: Artist }) {

    const router = useRouter();
    const [storageArtist, setStorageArtist] = useSessionStorage<Artist | null>("artist", null);
    const [searchArtistHistory, setSearchArtistHistory] = useLocalStorage<Artist[]>("searchArtistHistory", []);

    const handleClick = () => {
        setStorageArtist(artist);
        setSearchArtistHistory((prev) => {
            if (!prev.some((t) => t.id === artist.id)) {
                return [...prev, artist];
            }
            return prev;
        });
        router.push(`/artist/${artist.id}`);
    }

    return (
        <div className="flex gap-3 cursor-pointer p-3 rounded-md" onClick={handleClick} style={{background: "#0009"}}>
            <img
                src={artist.img}
                alt={artist.name}
                className="h-16 aspect-square"
            />
            
            <div className="w-full flex flex-col">
                <h3>{artist.name}</h3>
                <small>Artist</small>
            </div>
        </div>
    )
}