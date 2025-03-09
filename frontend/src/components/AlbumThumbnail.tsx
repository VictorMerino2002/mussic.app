"use client"
import { Artist } from "@/app/TrackAPI/domain/entity/Artist";

export const AlbumThumbnail = ({ album }: { album: Artist}) => {

    return (
        <div className="p-6 rounded-md flex flex-col gap-5 items-center cursor-pointer" style={{background: "#0009"}}>
            <img src={album.img} alt={album.name} className="w-full rounded-md"/>
            <h4 className="w-full overflow-hidden text-ellipsis whitespace-nowrap">{album.name}</h4>
        </div>
    );
}