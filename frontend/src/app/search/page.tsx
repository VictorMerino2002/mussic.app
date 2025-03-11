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
import { PlaylistThumbnail } from "@/components/PlaylistThumbnail";
import { theme } from "../config";
import { useLocalStorage } from "usehooks-ts";
import { Artist } from "../TrackAPI/domain/entity/Artist";
import { ArtistThumbnail } from "@/components/ArtistThumbnail";
import { Album } from "../TrackAPI/domain/entity/Album";
import { AlbumThumbnail } from "@/components/AlbumThumbnail";

const ContentType = {
    TRACK: "Song",
    PLAYLIST: "Playlist",
    ARTIST: "Artist",
    ALBUM: "Album"
}

export default function SearchPage() {

    const { platformAPI, token } = useAudio();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTrackHistory, setSearchTrackHistory] = useLocalStorage<Track[]>("searchTrackHistory", []);
    const [searchPlaylistHistory, setSearchPlaylistHistory] = useLocalStorage<Playlist[]>("searchPlaylistHistory", []);
    const [searchArtistHistory, setSearchArtistHistory] = useLocalStorage<Playlist[]>("searchArtistHistory", []);
    const [searchAlbumHistory, setSearchAlbumHistory] = useLocalStorage<Playlist[]>("searchAlbumHistory", []);

    const [serchTrackResult, setSearchTrackResult] = useState<SearchResult<Track> | null>({items: searchTrackHistory, next: ""});
    const [searchPlaylistResult, setSearchPlaylistResult] = useState<SearchResult<Playlist> | null>({items: searchPlaylistHistory, next: ""});
    const [searchArtistResult, setSearchArtistResult] = useState<SearchResult<Artist> | null>({items: searchArtistHistory, next: ""});
    const [searchAlbumResult, setSearchAlbumResult] = useState<SearchResult<Album> | null>({items: searchAlbumHistory, next: ""});    
    const [selectedContentType, setSelectedContentType ] = useState(ContentType.TRACK);

    useMinimize();

    const handleChange = (option: string) => {
        setSelectedContentType(option);
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!inputRef.current || !platformAPI) return;
        const name = inputRef.current.value;
        inputRef.current.value = "";

        if (selectedContentType === ContentType.TRACK) {
            platformAPI.searchTrack(name, token.base)
                .then((res: SearchResult<Track>) => setSearchTrackResult(res));
            return;
        }

        if (selectedContentType === ContentType.PLAYLIST) {
            platformAPI.searchPlaylist(name, token.base)
                .then((res: SearchResult<Playlist>) => setSearchPlaylistResult(res));
        }

        if (selectedContentType === ContentType.ARTIST) {
            platformAPI.searchArtist(name, token.base)
                .then((res: SearchResult<Artist>) => setSearchArtistResult(res));
        }

        if (selectedContentType === ContentType.ALBUM) {
            platformAPI.searchAlbum(name, token.base)
                .then((res: SearchResult<Album>) => setSearchAlbumResult(res));
        }
    }

    let labelClassName = "px-4 py-2 rounded-md cursor-pointer bg-white text-black font-semibold transition";
    return (
        <main className="flex flex-col gap-5 p-4 min-h-screen" style={{background: theme.bg2}}>
            <form className="flex flex-col gap-4" onSubmit={handleSearch}>
                <div className="flex items-center" >
                    <Input ref={inputRef} type="text" placeholder="What do you want to listen?" className="h-12 border-none"/>
                    <IoIosSearch size={30} color="black" className="absolute right-8"/>
                </div>
                <div className="flex justify-center gap-2">
                    {Object.values(ContentType).map(contentType => (
                        <>
                        <input
                            type="radio"
                            id={contentType}
                            name={contentType}
                            value={contentType}
                            checked={selectedContentType === contentType}
                            onChange={() => handleChange(contentType)}
                            className={`hidden peer/${contentType}`}
                        />
                        <label
                            htmlFor={contentType}
                            className={labelClassName}
                            style={
                                selectedContentType === contentType ? { background: theme.main, color: "white"} : {} 
                            }
                        >
                            {contentType}
                        </label>
                        </>
                    ))}
                </div>
            </form>

            <div className="flex flex-col gap-2 p-2">
                {serchTrackResult && selectedContentType === ContentType.TRACK ? serchTrackResult?.items.map(track => (
                    <TrackThumbnail key={track.id} track={track} />
                )) : null}

                {searchPlaylistResult && selectedContentType === ContentType.PLAYLIST ? searchPlaylistResult?.items.map(playlist => (
                    <PlaylistThumbnail key={playlist.id} playlist={playlist} />
                )): null}

                {searchArtistResult && selectedContentType === ContentType.ARTIST ? searchArtistResult?.items.map(artist => (
                    <ArtistThumbnail key={artist.id} artist={artist} />
                )): null}

                {searchAlbumResult && selectedContentType === ContentType.ALBUM ? searchAlbumResult?.items.map(album => (
                    <AlbumThumbnail key={album.id} album={album} />
                )): null}
            </div>
        </main>
    )
}