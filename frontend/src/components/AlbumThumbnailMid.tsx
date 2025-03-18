"use client"
import { Album } from "@/app/TrackAPI/domain/entity/Album";
import { useRouter } from "next/navigation";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export const AlbumThumbnailMid = ({ album }: { album: Album}) => {

    const router = useRouter();
    const [storageAlbum, setStorageAlbum] = useSessionStorage<Album | null>("album", null);
    const [searchAlbumHistory, setSearchAlbumHistory] = useLocalStorage<Album[]>("searchAlbumHistory", []);

    const handleClick = () => {
        setStorageAlbum(album);
        setSearchAlbumHistory((prev) => {
            if (!prev.some((t) => t.id === album.id)) {
                return [...prev, album];
            }
            return prev;
        });
        router.push(`/album/${album.id}`);
    }


    return (
        <div onClick={handleClick} className="p-2 rounded-md flex flex-col gap-2 items-center cursor-pointer" style={{background: "#0009"}}>
            <img src={album.img} alt={album.name} className="w-full rounded-md"/>
            <h4 className="w-full overflow-hidden text-ellipsis whitespace-nowrap">{album.name}</h4>
        </div>
    );
}