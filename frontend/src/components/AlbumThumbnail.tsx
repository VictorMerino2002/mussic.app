import { Album } from "@/app/TrackAPI/domain/entity/Album";
import { useRouter } from "next/navigation";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export const AlbumThumbnail = ({ album }: { album: Album}) => {

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
        <div className="flex gap-3 cursor-pointer p-3 rounded-md" onClick={handleClick} style={{background: "#0009"}}>
            <img
                src={album.img}
                alt={album.name}
                className="h-16 aspect-square"
            />
            
            <div className="w-full flex flex-col">
                <h3>{album.name}</h3>
                <small>{album.artists.map(a => a.name).join(", ")}</small>
            </div>
        </div>
    );
}