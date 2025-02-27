import { Playlist } from "@/app/TrackAPI/domain/entity/Playlist";
import { useRouter } from "next/navigation";

export const PlaylistThumnail = ({ playlist }: { playlist: Playlist}) => {

    const router = useRouter();

    const handleClick = () => {
        sessionStorage.setItem("playlist", JSON.stringify(playlist));
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