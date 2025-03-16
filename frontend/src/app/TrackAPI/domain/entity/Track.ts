import { Album } from "./Album";
import { Artist } from "./Artist";

export class Track {
    constructor(
        public id: string,
        public name: string,
        public album: Album | null,
        public artists: Artist[],
        public uri: string
    ) {}
}
  