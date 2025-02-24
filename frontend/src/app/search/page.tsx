"use client"
import { Input } from "@/components/ui/input"
import { FormEvent, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { SearchResult } from "../TrackAPI/types/searchResult";
import { Track } from "../TrackAPI/domain/entity/Track";
import { TrackThumbnail } from "@/components/TrackThumbnail";
import { useAudio } from "../AudioProvider";

export default function SearchPage() {

    const audioPlayerService = useAudio();

    const inputRef = useRef<HTMLInputElement>(null);
    const [serchResult, setSearchResult] = useState<SearchResult<Track> | null>(null);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputRef.current || !audioPlayerService) return;
        const name = inputRef.current.value;
        inputRef.current.value = "";

        audioPlayerService.searchTrack(name)
            .then((res: SearchResult<Track>) => setSearchResult(res));
    }

    return (
        <main className="flex flex-col gap-5">
            <form className="flex items-center" onSubmit={handleSearch}>
                <Input ref={inputRef} type="text" placeholder="What do you want to listen?" className="h-12 border-none"/>
                <IoIosSearch size={30} color="black" className="absolute right-8"/>
            </form>

            <div className="flex flex-col gap-5 p-2">
                {serchResult ? serchResult?.items.map(track => (
                    <TrackThumbnail key={track.id} track={track} />
                )) : null}
            </div>
        </main>
    )
}