import Movie from "./movie";

class User {
    username: string | null;
    email: string | null;
    profileImg: string | null ;
    likedMovies: Movie[];

    constructor(username: string | null, email: string | null, profileImg: string | null, likedMovies: Movie[]){
        this.username = username;
        this.email = email;
        this.profileImg = profileImg;
        this.likedMovies = likedMovies;
    }
}

export default User;