class MovieContent {
  id: string;
  title: string;
  description: string;
  image: string;
  genre: Array<string>;
  trailer: string;

  constructor(
    id: string,
    title: string,
    description: string,
    image: string,
    genre: Array<string>,
    trailer: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.genre = genre;
    this.trailer = trailer
  }
}

export default MovieContent;
