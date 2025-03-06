"use client"
import { Playlist } from "@/app/TrackAPI/domain/entity/Playlist";
import { useRouter } from "next/navigation";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export const PlaylistThumbnail = ({ playlist }: { playlist: Playlist}) => {

    const router = useRouter();

    const [searchPlaylistHistory, setSearchPlaylistHistory] = useLocalStorage<Playlist[]>("searchPlaylistHistory", []);
    const [storagePlaylist, setStoragePlaylist] = useSessionStorage<Playlist | null>("playlist", null);

    const handleClick = () => {
        setStoragePlaylist(playlist);
        setSearchPlaylistHistory((prev) => {
            if (!prev.some((t) => t.id === playlist.id)) {
                return [...prev, playlist];
            }
            return prev;
        });
        router.push(`/playlist/${playlist.id}`);
    }

    return (
        <div className="flex gap-3 cursor-pointer" onClick={handleClick}>
            <img
                src={playlist.img}
                alt={playlist.name}
                className="h-16 aspect-square"
            />
            
            <div className="w-full flex flex-col">
                <h3>{playlist.name}</h3>
                <small>Playlist</small>
            </div>
        </div>
    );
}