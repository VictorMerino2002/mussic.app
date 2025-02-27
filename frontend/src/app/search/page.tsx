"use client"
import { Input } from "@/components/ui/input"
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { SearchResult } from "../TrackAPI/types/searchResult";
import { Track } from "../TrackAPI/domain/entity/Track";
import { TrackThumbnail } from "@/components/TrackThumbnail";
import { useAudio } from "../AudioProvider";
import { useMinimize } from "../hooks/useMinimize";
import { Playlist } from "../TrackAPI/domain/entity/Playlist";
import { PlaylistThumnail } from "@/components/PlaylistThumbnail";
import { theme } from "../config";

const contentType = {
    TRACK: "track",
    PLAYLIST: "playlist"
}

export default function SearchPage() {

    const { plataformAPI } = useAudio();
    const inputRef = useRef<HTMLInputElement>(null);
    const [serchTrackResult, setSearchTrackResult] = useState<SearchResult<Track> | null>(null);
    const [searchPlaylistResult, setSearchPlaylistResult] = useState<SearchResult<Playlist> | null>(null);
    const [selectedContentType, setSelectedContentType ] = useState(contentType.TRACK);
    
    useMinimize();

    const handleChange = (option: string) => {
        setSelectedContentType(option);
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!inputRef.current || !plataformAPI) return;
        const name = inputRef.current.value;
        inputRef.current.value = "";

        if (selectedContentType === contentType.TRACK) {
            plataformAPI.searchTrack(name)
                .then((res: SearchResult<Track>) => setSearchTrackResult(res));
        } else if (selectedContentType === contentType.PLAYLIST) {
            plataformAPI.searchPlaylist(name)
                .then((res: SearchResult<Playlist>) => setSearchPlaylistResult(res));
        }
    }

    const labelClassName = (option: string) => `px-4 py-2 rounded-full cursor-pointer bg-white text-black font-semibold transition ${selectedContentType === option ? `bg-${theme.main}-500 text-white` : ""}`

    return (
        <main className="flex flex-col gap-5 p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSearch}>
                <div className="flex items-center" >
                    <Input ref={inputRef} type="text" placeholder="What do you want to listen?" className="h-12 border-none"/>
                    <IoIosSearch size={30} color="black" className="absolute right-8"/>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="radio"
                        id="track"
                        name="contentType"
                        value={contentType.TRACK}
                        checked={selectedContentType === contentType.TRACK}
                        onChange={() => handleChange(contentType.TRACK)}
                        className="hidden peer/track"
                    />
                    <label
                        htmlFor="track"
                        className={labelClassName(contentType.TRACK)}
                    >
                        Song
                    </label>

                    <input
                        type="radio"
                        id="playlist"
                        name="contentType"
                        value={contentType.PLAYLIST}
                        checked={selectedContentType === contentType.PLAYLIST}
                        onChange={() => handleChange(contentType.PLAYLIST)}
                        className="hidden peer/playlist"
                    />
                    <label
                        htmlFor="playlist"
                        className={labelClassName(contentType.PLAYLIST)}
                    >
                        Playlist
                    </label>
                </div>
            </form>

            <div className="flex flex-col gap-5 p-2">
                {serchTrackResult && selectedContentType === contentType.TRACK ? serchTrackResult?.items.map(track => (
                    <TrackThumbnail key={track.id} track={track} />
                )) : null}

                {searchPlaylistResult && selectedContentType === contentType.PLAYLIST ? searchPlaylistResult?.items.map (playlist => (
                    <PlaylistThumnail key={playlist.id} playlist={playlist} />
                )): null}
            </div>
        </main>
    )
}