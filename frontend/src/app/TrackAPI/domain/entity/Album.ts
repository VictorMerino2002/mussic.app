import { Artist } from "./Artist";

export class Album {
    constructor(
      public id: string,
      public name: string,
      public img: string,
      public uri: string,
      public artists: Artist[],
    ) {}
}