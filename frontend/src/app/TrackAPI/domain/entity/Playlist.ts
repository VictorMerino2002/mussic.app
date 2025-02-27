export class Playlist {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public img: string,
        public owner: {
            display_name: string;
            id: string;
            type: string;
        },
        public isPublic: boolean,
        public tracks: { total: number },
        public uri: string
    ) {}
  }
  