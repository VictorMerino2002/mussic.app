"use client"
import { useSearchHistory } from "@/app/hooks/useSearchHistory";
import { Playlist } from "@/app/TrackAPI/domain/entity/Playlist";
import { useRouter } from "next/navigation";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export const PlaylistThumbnail = ({ playlist }: { playlist: Playlist}) => {

    const router = useRouter();

    const playlistHistory = useSearchHistory<Playlist>("playlist");
    const [storagePlaylist, setStoragePlaylist] = useSessionStorage<Playlist | null>("playlist", null);

    const handleClick = () => {
        setStoragePlaylist(playlist);
        playlistHistory.push(playlist);
        router.push(`/playlist/${playlist.id}`);
    }

    return (
        <div className="flex gap-3 cursor-pointer p-2 rounded-md" onClick={handleClick} style={{background: "#0009"}}>
            <img
                src={playlist.img}
                alt={playlist.name}
                className="h-16 aspect-square rounded-md"
            />
            
            <div className="w-full flex flex-col">
                <h3>{playlist.name}</h3>
                <small>Playlist</small>
            </div>
        </div>
    );
}