import { Album } from "@/app/TrackAPI/domain/entity/Album";

export const AlbumThumbnail = ({ album }: { album: Album}) => {

    const handleClick = () => {
        return;
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