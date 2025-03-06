"use client"
import { Artist } from "@/app/TrackAPI/domain/entity/Artist"
import { useRouter } from "next/navigation";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export function ArtistThumbnail({artist}: { artist: Artist }) {

    const router = useRouter();
    const [storageArtist, setStorageArtist] = useSessionStorage<Artist | null>("artist", null);

    const handleClick = () => {
        setStorageArtist(artist);
        router.push(`/artist/${artist.id}`);
    }

    return (
        <div className="flex gap-3 cursor-pointer" onClick={handleClick}>
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