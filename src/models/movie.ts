class Movie {
    id: string;
    name: string;
    imagePath: string;

    constructor(movieId: string, movieName: string, movieImagePath: string){
        this.id = movieId;
        this.name = movieName;
        this.imagePath = movieImagePath
    }
}

export default Movie;