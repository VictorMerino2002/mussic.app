"use client"

import { theme } from "@/app/config";
import { SpotifyAPI } from "@/app/TrackAPI/adapter/SpotifyAPI";
import { Playlist } from "@/app/TrackAPI/domain/entity/Playlist";
import { Track } from "@/app/TrackAPI/domain/entity/Track";
import React from "react";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import ColorThief from "colorthief";
import { TrackThumbnail } from "@/components/TrackThumbnail";

type ParamsType = {
    id: string;
}

export default function PlaylistPage({ params }: { params: ParamsType }) {
    const { id } = React.use<ParamsType>(params);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [tracks, setTracks] = useState<Track[] | null>([
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "0ONHkAv9pCAFxb0zJwDNTy",
              "name": "Pusha T",
              "uri": "spotify:artist:0ONHkAv9pCAFxb0zJwDNTy"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "1sBkRIssrMs1AbVkOJbc7a",
              "name": "Rick Ross",
              "uri": "spotify:artist:1sBkRIssrMs1AbVkOJbc7a"
            }
          ]
        },
        {
          "album": {
            "id": "3SZr5Pco2oqKFORCP3WNj9",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b273675561f3defd1d5a551936a8",
            "uri": "spotify:album:3SZr5Pco2oqKFORCP3WNj9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2HPaUgqeutzr3jx5a9WyDV",
              "name": "PARTYNEXTDOOR",
              "uri": "spotify:artist:2HPaUgqeutzr3jx5a9WyDV"
            }
          ]
        },
        {
          "album": {
            "id": "4Uv86qWpGTxf7fU7lG5X6F",
            "name": "The College Dropout",
            "img": "https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78",
            "uri": "spotify:album:4Uv86qWpGTxf7fU7lG5X6F"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "1lE6SEy8f84Zhjvp7r8yTD",
              "name": "Syleena Johnson",
              "uri": "spotify:artist:1lE6SEy8f84Zhjvp7r8yTD"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7D2NdGvBHIavgLhmcwhluK",
            "name": "Yeezus",
            "img": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
            "uri": "spotify:album:7D2NdGvBHIavgLhmcwhluK"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7D2NdGvBHIavgLhmcwhluK",
            "name": "Yeezus",
            "img": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
            "uri": "spotify:album:7D2NdGvBHIavgLhmcwhluK"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "2Ek1q2haOnxVqhvVKqMvJe",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b2730cd942c1a864afa4e92d04f2",
            "uri": "spotify:album:2Ek1q2haOnxVqhvVKqMvJe"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2HPaUgqeutzr3jx5a9WyDV",
              "name": "PARTYNEXTDOOR",
              "uri": "spotify:artist:2HPaUgqeutzr3jx5a9WyDV"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7D2NdGvBHIavgLhmcwhluK",
            "name": "Yeezus",
            "img": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
            "uri": "spotify:album:7D2NdGvBHIavgLhmcwhluK"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "2ar6Yxkh6psvQOrGqk248v",
            "name": "Only One",
            "img": "https://i.scdn.co/image/ab67616d0000b273f2209e63affaa48af1b0a3b5",
            "uri": "spotify:album:2ar6Yxkh6psvQOrGqk248v"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "4STHEaNw4mPZ2tzheohgXB",
              "name": "Paul McCartney",
              "uri": "spotify:artist:4STHEaNw4mPZ2tzheohgXB"
            }
          ]
        },
        {
          "album": {
            "id": "6Xu470gdLgDOnFDj5qND1N",
            "name": "Kamikaze",
            "img": "https://i.scdn.co/image/ab67616d0000b273e8e3c040bfc38a08c65a5f77",
            "uri": "spotify:album:6Xu470gdLgDOnFDj5qND1N"
          },
          "artists": [
            {
              "id": "6vbY3hOaCAhC7VjucswgdS",
              "name": "Twista",
              "uri": "spotify:artist:6vbY3hOaCAhC7VjucswgdS"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "7LnaAXbDVIL75IVPnndf7w",
              "name": "Jamie Foxx",
              "uri": "spotify:artist:7LnaAXbDVIL75IVPnndf7w"
            }
          ]
        },
        {
          "album": {
            "id": "3gFzpNzh1Kb48CwztWkeLu",
            "name": "New God Flow",
            "img": "https://i.scdn.co/image/ab67616d0000b27325b48af98f6a17dce6ca5082",
            "uri": "spotify:album:3gFzpNzh1Kb48CwztWkeLu"
          },
          "artists": [
            {
              "id": "0ONHkAv9pCAFxb0zJwDNTy",
              "name": "Pusha T",
              "uri": "spotify:artist:0ONHkAv9pCAFxb0zJwDNTy"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "2Wiyo7LzdeBCsVZiRA6vVZ",
            "name": "Donda (Deluxe)",
            "img": "https://i.scdn.co/image/ab67616d0000b273c5663e50de353981ed2b1a37",
            "uri": "spotify:album:2Wiyo7LzdeBCsVZiRA6vVZ"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "20qISvAhX20dpIbOOzGK3q",
              "name": "Nas",
              "uri": "spotify:artist:20qISvAhX20dpIbOOzGK3q"
            },
            {
              "id": "69m0yjx8ruKebsRvbNuEDz",
              "name": "Really Doe",
              "uri": "spotify:artist:69m0yjx8ruKebsRvbNuEDz"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "01QTIT5P1pFP3QnnFSdsJf",
              "name": "Lupe Fiasco",
              "uri": "spotify:artist:01QTIT5P1pFP3QnnFSdsJf"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "0k7Xl1pqI3tu8sSEjo5oEg",
              "name": "Paul Wall",
              "uri": "spotify:artist:0k7Xl1pqI3tu8sSEjo5oEg"
            },
            {
              "id": "2hZ6jVi1cao5VlJHAEPzU7",
              "name": "GLC",
              "uri": "spotify:artist:2hZ6jVi1cao5VlJHAEPzU7"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2GHclqNVjqGuiE5mA7BEoc",
              "name": "Common",
              "uri": "spotify:artist:2GHclqNVjqGuiE5mA7BEoc"
            }
          ]
        },
        {
          "album": {
            "id": "0EXLFY4NFNx4FlpAlFO7ly",
            "name": "Graduation (UK Version)",
            "img": "https://i.scdn.co/image/ab67616d0000b2738c9c18cd0509e90c5d5e3c52",
            "uri": "spotify:album:0EXLFY4NFNx4FlpAlFO7ly"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "0EXLFY4NFNx4FlpAlFO7ly",
            "name": "Graduation (UK Version)",
            "img": "https://i.scdn.co/image/ab67616d0000b2738c9c18cd0509e90c5d5e3c52",
            "uri": "spotify:album:0EXLFY4NFNx4FlpAlFO7ly"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "2hTxwsnzU7h15XcAUWSME8",
            "name": "Lift Yourself",
            "img": "https://i.scdn.co/image/ab67616d0000b27341c5c57a8cbba3f5c10ed99e",
            "uri": "spotify:album:2hTxwsnzU7h15XcAUWSME8"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5xLxlrkwSh0gMp6LhpvzsC",
            "name": "Touch The Sky",
            "img": "https://i.scdn.co/image/ab67616d0000b27341324b28296150c4a81e5363",
            "uri": "spotify:album:5xLxlrkwSh0gMp6LhpvzsC"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "01QTIT5P1pFP3QnnFSdsJf",
              "name": "Lupe Fiasco",
              "uri": "spotify:artist:01QTIT5P1pFP3QnnFSdsJf"
            }
          ]
        },
        {
          "album": {
            "id": "0Ds6i3h0F9RcYIKAD5Olum",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273d79ba8ad2be777bad0e9924b",
            "uri": "spotify:album:0Ds6i3h0F9RcYIKAD5Olum"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "4bYPcJP5jwMhSivRcqie2n",
              "name": "Adam Levine",
              "uri": "spotify:artist:4bYPcJP5jwMhSivRcqie2n"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "5KkgZ31b9eDwkvo9oMIrSm",
              "name": "Consequence",
              "uri": "spotify:artist:5KkgZ31b9eDwkvo9oMIrSm"
            },
            {
              "id": "7iMvwE8qANp3aIfAGKEAwS",
              "name": "Cam'ron",
              "uri": "spotify:artist:7iMvwE8qANp3aIfAGKEAwS"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "6pwuKxMUkNg673KETsXPUV",
            "name": "KIDS SEE GHOSTS",
            "img": "https://i.scdn.co/image/ab67616d0000b273013c00ee367dd85396f79c82",
            "uri": "spotify:album:6pwuKxMUkNg673KETsXPUV"
          },
          "artists": [
            {
              "id": "2hPgGN4uhvXAxiXQBIXOmE",
              "name": "KIDS SEE GHOSTS",
              "uri": "spotify:artist:2hPgGN4uhvXAxiXQBIXOmE"
            }
          ]
        },
        {
          "album": {
            "id": "7qc7uP4et4ATd9YYUN2Azh",
            "name": "Homecoming",
            "img": "https://i.scdn.co/image/ab67616d0000b273600d0e710760a53f9f419166",
            "uri": "spotify:album:7qc7uP4et4ATd9YYUN2Azh"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "0LQoZQIV0mIs0y0XQb0Sw2",
              "name": "Chris Martin",
              "uri": "spotify:artist:0LQoZQIV0mIs0y0XQb0Sw2"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "0fA0VVWsXO9YnASrzqfmYu",
              "name": "Kid Cudi",
              "uri": "spotify:artist:0fA0VVWsXO9YnASrzqfmYu"
            },
            {
              "id": "2yQf6b8hxahZaT5dHlWaB1",
              "name": "Raekwon",
              "uri": "spotify:artist:2yQf6b8hxahZaT5dHlWaB1"
            }
          ]
        },
        {
          "album": {
            "id": "2S8AWAM0nxyFy66YnUfIs3",
            "name": "Man On The Moon: The End Of Day (Deluxe)",
            "img": "https://i.scdn.co/image/ab67616d0000b273a487deeecb334b6619489d74",
            "uri": "spotify:album:2S8AWAM0nxyFy66YnUfIs3"
          },
          "artists": [
            {
              "id": "0fA0VVWsXO9YnASrzqfmYu",
              "name": "Kid Cudi",
              "uri": "spotify:artist:0fA0VVWsXO9YnASrzqfmYu"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2GHclqNVjqGuiE5mA7BEoc",
              "name": "Common",
              "uri": "spotify:artist:2GHclqNVjqGuiE5mA7BEoc"
            }
          ]
        },
        {
          "album": {
            "id": "4Uv86qWpGTxf7fU7lG5X6F",
            "name": "The College Dropout",
            "img": "https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78",
            "uri": "spotify:album:4Uv86qWpGTxf7fU7lG5X6F"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2hZ6jVi1cao5VlJHAEPzU7",
              "name": "GLC",
              "uri": "spotify:artist:2hZ6jVi1cao5VlJHAEPzU7"
            },
            {
              "id": "5KkgZ31b9eDwkvo9oMIrSm",
              "name": "Consequence",
              "uri": "spotify:artist:5KkgZ31b9eDwkvo9oMIrSm"
            }
          ]
        },
        {
          "album": {
            "id": "7D2NdGvBHIavgLhmcwhluK",
            "name": "Yeezus",
            "img": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
            "uri": "spotify:album:7D2NdGvBHIavgLhmcwhluK"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "0qRMvJxoxAQr9a2rYxJuLq",
            "name": "Mercy",
            "img": "https://i.scdn.co/image/ab67616d0000b273ec63192fc69b69174445aae5",
            "uri": "spotify:album:0qRMvJxoxAQr9a2rYxJuLq"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "0c173mlxpT3dSFRgMO8XPh",
              "name": "Big Sean",
              "uri": "spotify:artist:0c173mlxpT3dSFRgMO8XPh"
            },
            {
              "id": "0ONHkAv9pCAFxb0zJwDNTy",
              "name": "Pusha T",
              "uri": "spotify:artist:0ONHkAv9pCAFxb0zJwDNTy"
            },
            {
              "id": "17lzZA2AlOHwCwFALHttmp",
              "name": "2 Chainz",
              "uri": "spotify:artist:17lzZA2AlOHwCwFALHttmp"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5ll74bqtkcXlKE7wwkMq4g",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
            "uri": "spotify:album:5ll74bqtkcXlKE7wwkMq4g"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "7LnaAXbDVIL75IVPnndf7w",
              "name": "Jamie Foxx",
              "uri": "spotify:artist:7LnaAXbDVIL75IVPnndf7w"
            }
          ]
        },
        {
          "album": {
            "id": "4Uv86qWpGTxf7fU7lG5X6F",
            "name": "The College Dropout",
            "img": "https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78",
            "uri": "spotify:album:4Uv86qWpGTxf7fU7lG5X6F"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "4LEiUm1SRbFMgfqnQTwUbQ",
              "name": "Bon Iver",
              "uri": "spotify:artist:4LEiUm1SRbFMgfqnQTwUbQ"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "6pwuKxMUkNg673KETsXPUV",
            "name": "KIDS SEE GHOSTS",
            "img": "https://i.scdn.co/image/ab67616d0000b273013c00ee367dd85396f79c82",
            "uri": "spotify:album:6pwuKxMUkNg673KETsXPUV"
          },
          "artists": [
            {
              "id": "2hPgGN4uhvXAxiXQBIXOmE",
              "name": "KIDS SEE GHOSTS",
              "uri": "spotify:artist:2hPgGN4uhvXAxiXQBIXOmE"
            },
            {
              "id": "6r2niOTnexy9xss5g8GWXH",
              "name": "Yasiin Bey",
              "uri": "spotify:artist:6r2niOTnexy9xss5g8GWXH"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "3nFkdlSjzX9mRTtwJOzDYB",
              "name": "JAY-Z",
              "uri": "spotify:artist:3nFkdlSjzX9mRTtwJOzDYB"
            },
            {
              "id": "1sBkRIssrMs1AbVkOJbc7a",
              "name": "Rick Ross",
              "uri": "spotify:artist:1sBkRIssrMs1AbVkOJbc7a"
            },
            {
              "id": "0hCNtLu0JehylgoiP8L4Gh",
              "name": "Nicki Minaj",
              "uri": "spotify:artist:0hCNtLu0JehylgoiP8L4Gh"
            },
            {
              "id": "4LEiUm1SRbFMgfqnQTwUbQ",
              "name": "Bon Iver",
              "uri": "spotify:artist:4LEiUm1SRbFMgfqnQTwUbQ"
            }
          ]
        },
        {
          "album": {
            "id": "2WS0vm6OCNjgqoiODew1TQ",
            "name": "Don't Quit Your Day Job",
            "img": "https://i.scdn.co/image/ab67616d0000b2733055d5243f82b2e0d0cf5585",
            "uri": "spotify:album:2WS0vm6OCNjgqoiODew1TQ"
          },
          "artists": [
            {
              "id": "5KkgZ31b9eDwkvo9oMIrSm",
              "name": "Consequence",
              "uri": "spotify:artist:5KkgZ31b9eDwkvo9oMIrSm"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "340MjPcVdiQRnMigrPybZA",
            "name": "Donda",
            "img": "https://i.scdn.co/image/ab67616d0000b2736ba1cffc9b2c5469503430b3",
            "uri": "spotify:album:340MjPcVdiQRnMigrPybZA"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "340MjPcVdiQRnMigrPybZA",
            "name": "Donda",
            "img": "https://i.scdn.co/image/ab67616d0000b2736ba1cffc9b2c5469503430b3",
            "uri": "spotify:album:340MjPcVdiQRnMigrPybZA"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "5y2Xq6xcjJb2jVM54GHK3t",
              "name": "John Legend",
              "uri": "spotify:artist:5y2Xq6xcjJb2jVM54GHK3t"
            }
          ]
        },
        {
          "album": {
            "id": "4Uv86qWpGTxf7fU7lG5X6F",
            "name": "The College Dropout",
            "img": "https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78",
            "uri": "spotify:album:4Uv86qWpGTxf7fU7lG5X6F"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "4Uv86qWpGTxf7fU7lG5X6F",
            "name": "The College Dropout",
            "img": "https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78",
            "uri": "spotify:album:4Uv86qWpGTxf7fU7lG5X6F"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7D2NdGvBHIavgLhmcwhluK",
            "name": "Yeezus",
            "img": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
            "uri": "spotify:album:7D2NdGvBHIavgLhmcwhluK"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "20r762YmB5HeofjMCiPMLv",
            "name": "My Beautiful Dark Twisted Fantasy",
            "img": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
            "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "7gsWAHLeT0w7es6FofOXk1",
            "name": "The Life Of Pablo",
            "img": "https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4",
            "uri": "spotify:album:7gsWAHLeT0w7es6FofOXk1"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "0FgZKfoU2Br5sHOfvZKTI9",
            "name": "JESUS IS KING",
            "img": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964",
            "uri": "spotify:album:0FgZKfoU2Br5sHOfvZKTI9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "0FgZKfoU2Br5sHOfvZKTI9",
            "name": "JESUS IS KING",
            "img": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964",
            "uri": "spotify:album:0FgZKfoU2Br5sHOfvZKTI9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "0FgZKfoU2Br5sHOfvZKTI9",
            "name": "JESUS IS KING",
            "img": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964",
            "uri": "spotify:album:0FgZKfoU2Br5sHOfvZKTI9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "0FgZKfoU2Br5sHOfvZKTI9",
            "name": "JESUS IS KING",
            "img": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964",
            "uri": "spotify:album:0FgZKfoU2Br5sHOfvZKTI9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2ndyVAdV9UqF1XjyTJt484",
              "name": "Fred Hammond",
              "uri": "spotify:artist:2ndyVAdV9UqF1XjyTJt484"
            }
          ]
        },
        {
          "album": {
            "id": "0FgZKfoU2Br5sHOfvZKTI9",
            "name": "JESUS IS KING",
            "img": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964",
            "uri": "spotify:album:0FgZKfoU2Br5sHOfvZKTI9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2J257euzcjnDLipsyJH3F2",
              "name": "Clipse",
              "uri": "spotify:artist:2J257euzcjnDLipsyJH3F2"
            },
            {
              "id": "6I3M904Y9IwgDjrQ9pANiB",
              "name": "Kenny G",
              "uri": "spotify:artist:6I3M904Y9IwgDjrQ9pANiB"
            }
          ]
        },
        {
          "album": {
            "id": "0FgZKfoU2Br5sHOfvZKTI9",
            "name": "JESUS IS KING",
            "img": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964",
            "uri": "spotify:album:0FgZKfoU2Br5sHOfvZKTI9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "1zV9UjTUevjp5VUddqIUUn",
              "name": "Mr Hudson",
              "uri": "spotify:artist:1zV9UjTUevjp5VUddqIUUn"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "6GEykX11lQqp92UVOQQCC7",
              "name": "DJ Premier",
              "uri": "spotify:artist:6GEykX11lQqp92UVOQQCC7"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "55Aa2cqylxrFIXC767Z865",
              "name": "Lil Wayne",
              "uri": "spotify:artist:55Aa2cqylxrFIXC767Z865"
            }
          ]
        },
        {
          "album": {
            "id": "0Ds6i3h0F9RcYIKAD5Olum",
            "name": "Late Registration",
            "img": "https://i.scdn.co/image/ab67616d0000b273d79ba8ad2be777bad0e9924b",
            "uri": "spotify:album:0Ds6i3h0F9RcYIKAD5Olum"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "4SZko61aMnmgvNhfhgTuD3",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a",
            "uri": "spotify:album:4SZko61aMnmgvNhfhgTuD3"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "3aQeKQSyrW4qWr35idm0cy",
              "name": "T-Pain",
              "uri": "spotify:artist:3aQeKQSyrW4qWr35idm0cy"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "55Aa2cqylxrFIXC767Z865",
              "name": "Lil Wayne",
              "uri": "spotify:artist:55Aa2cqylxrFIXC767Z865"
            }
          ]
        },
        {
          "album": {
            "id": "7D2NdGvBHIavgLhmcwhluK",
            "name": "Yeezus",
            "img": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
            "uri": "spotify:album:7D2NdGvBHIavgLhmcwhluK"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "08eM9GRdr5BCCHNqS3Wwud",
            "name": "Man On The Moon II: The Legend Of Mr. Rager",
            "img": "https://i.scdn.co/image/ab67616d0000b27359e842b6a3566a141f27f815",
            "uri": "spotify:album:08eM9GRdr5BCCHNqS3Wwud"
          },
          "artists": [
            {
              "id": "0fA0VVWsXO9YnASrzqfmYu",
              "name": "Kid Cudi",
              "uri": "spotify:artist:0fA0VVWsXO9YnASrzqfmYu"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5EBGCvO6upi3GNknMVe9x9",
            "name": "ye",
            "img": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44",
            "uri": "spotify:album:5EBGCvO6upi3GNknMVe9x9"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "4SZko61aMnmgvNhfhgTuD3",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a",
            "uri": "spotify:album:4SZko61aMnmgvNhfhgTuD3"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "6GEykX11lQqp92UVOQQCC7",
              "name": "DJ Premier",
              "uri": "spotify:artist:6GEykX11lQqp92UVOQQCC7"
            }
          ]
        },
        {
          "album": {
            "id": "7jQPy8GhgSuT5A54pb5sHx",
            "name": "Wash Us In The Blood",
            "img": "https://i.scdn.co/image/ab67616d0000b2732b2de7835bc93f1e368cee6d",
            "uri": "spotify:album:7jQPy8GhgSuT5A54pb5sHx"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "0Y5tJX1MQlPlqiwlOH1tJY",
              "name": "Travis Scott",
              "uri": "spotify:artist:0Y5tJX1MQlPlqiwlOH1tJY"
            }
          ]
        },
        {
          "album": {
            "id": "5y4Ikuc4sLtNOpanoKKqwo",
            "name": "Shine",
            "img": "https://i.scdn.co/image/ab67616d0000b273b0b30ef77be3523c8018810c",
            "uri": "spotify:album:5y4Ikuc4sLtNOpanoKKqwo"
          },
          "artists": [
            {
              "id": "5T0MSzX9RC5NA6gAI6irSn",
              "name": "Estelle",
              "uri": "spotify:artist:5T0MSzX9RC5NA6gAI6irSn"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "5fPglEDz9YEwRgbLRvhCZy",
            "name": "Graduation",
            "img": "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
            "uri": "spotify:album:5fPglEDz9YEwRgbLRvhCZy"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "3WFTGIO6E3Xh4paEOBY9OU",
            "name": "808s & Heartbreak",
            "img": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18",
            "uri": "spotify:album:3WFTGIO6E3Xh4paEOBY9OU"
          },
          "artists": [
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            }
          ]
        },
        {
          "album": {
            "id": "2P2Xwvh2xWXIZ1OWY9S9o5",
            "name": "Watch The Throne (Deluxe)",
            "img": "https://i.scdn.co/image/ab67616d0000b2735c837cc621c1ec82bf3c81ac",
            "uri": "spotify:album:2P2Xwvh2xWXIZ1OWY9S9o5"
          },
          "artists": [
            {
              "id": "3nFkdlSjzX9mRTtwJOzDYB",
              "name": "JAY-Z",
              "uri": "spotify:artist:3nFkdlSjzX9mRTtwJOzDYB"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "2h93pZq0e7k5yf4dywlkpM",
              "name": "Frank Ocean",
              "uri": "spotify:artist:2h93pZq0e7k5yf4dywlkpM"
            },
            {
              "id": "1W3FSF1BLpY3hlVIgvenLz",
              "name": "The-Dream",
              "uri": "spotify:artist:1W3FSF1BLpY3hlVIgvenLz"
            }
          ]
        },
        {
          "album": {
            "id": "0OcMap99vLEeGkBCfCwRwS",
            "name": "Watch The Throne",
            "img": "https://i.scdn.co/image/ab67616d0000b27352e61456aa4995ba48d94e30",
            "uri": "spotify:album:0OcMap99vLEeGkBCfCwRwS"
          },
          "artists": [
            {
              "id": "3nFkdlSjzX9mRTtwJOzDYB",
              "name": "JAY-Z",
              "uri": "spotify:artist:3nFkdlSjzX9mRTtwJOzDYB"
            },
            {
              "id": "5K4W6rqBFWDnAN6FQUkS6x",
              "name": "Kanye West",
              "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
            },
            {
              "id": "1zV9UjTUevjp5VUddqIUUn",
              "name": "Mr Hudson",
              "uri": "spotify:artist:1zV9UjTUevjp5VUddqIUUn"
            }
          ]
        }
      ]);
    const [dominantColor, setDominantColor] = useState("rgb(0, 0, 0)");
    const plataformAPI = new SpotifyAPI();

    useEffect(() => {
        const sessionStoragePlaylist = sessionStorage.getItem("playlist");
        if (sessionStoragePlaylist) {
            setPlaylist(JSON.parse(sessionStoragePlaylist));
            return;
        }

        plataformAPI.getPlaylistById(id)
            .then(res => setPlaylist(res));
    }, []);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        if (!playlist) return;
        img.src = playlist.img;
    
        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
    }, [playlist]);

    // useEffect(() => {
    //     plataformAPI.getPlaylistItems(id)
    //         .then(res => console.log(res.items));
    // }, [playlist]);

    return (
        <main>
            <header className="h-80 p-6 relative" style={{background: dominantColor}}>
                <img className="h-full mx-auto" src={playlist?.img} alt={playlist?.name} />
            </header>

            <section className="flex flex-col">
                <div className={"sticky top-0 flex justify-between items-center w-full p-6 h-20 " + `bg-${theme.bg}`}>
                    <h2>{playlist?.name}</h2>
                    <button className={"p-4 rounded-full " + `bg-${theme.main}-500`}>
                        <FaPlay size={20} color="#000"/>
                    </button>
                </div>
                {tracks ? tracks.map((track: Track) => (
                    <TrackThumbnail key={track.id} track={track} />
                )): null}
            </section>
        </main>
    )
}