import { makeAutoObservable } from "mobx";
import axios from "axios";
import User from "../models/user";
import { FIREBASE_API_KEY } from "../globals";

class UserStore {
  user: User = {
    username: null,
    email: null,
    profileImg: null,
    likedMovies: [],
  };
  token: string | null = null;
  expiresTimeout: string | null = null;
  timeout: any;

  logout = () => {
    this.token = null;
    this.user.email = null;
    this.expiresTimeout = null;
    localStorage.removeItem("token");
    localStorage.removeItem("expiresDate");
    localStorage.removeItem("userEmail");

    this.resetUserDetails();

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  login = async (token: string, expiresIn: string, email: string) => {
    const expiresTime = +expiresIn * 24000; //86 400 000 => one day
    const expiresDate = new Date(
      new Date().getTime() + expiresTime
    ).toISOString();

    this.token = token;
    this.expiresTimeout = expiresDate;
    this.user.email = email;

    localStorage.setItem("token", token);
    localStorage.setItem("expiresDate", expiresDate);
    localStorage.setItem("userEmail", email);

    const isUserDetailsFind = await this.fetchUserDetails(email, true);

    if (!!isUserDetailsFind) {
      this.timeout = setTimeout(() => {
        this.logout();
      }, expiresTime);
      return {success: true};
    } else {
      this.logout(); // user not found;
      return {success: false};
    }    
  };

  createAcount = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      if (response.statusText === "OK") {
        const createProfileDetails: {data: {}, success: boolean } = await this.createProfileDetails(
          response.data.email
        );

        if (createProfileDetails.success) {
          await this.login(
            response.data.idToken,
            response.data.expiresIn,
            response.data.email
          );
          
          return {
            message:
              "Your account has been created! We are redirecting you to your profile.",
            isSuccess: true,
          };
        } else {
          return {
            message: "Account creation is failed. Please try again,",
            isSuccess: false,
          };
        }
      } else {
        return {
          message: "Account creation is failed. Please try again,",
          isSuccess: false,
        };
      }
    } catch (error: any) {
      return { message: error.message, isSuccess: false };
    }
  };

  createProfileDetails = async (email: string) => {
    const requestBody: User = {
      email,
      likedMovies: [],
      username: "",
      profileImg: "",
    };
    try {
      const response = await axios.post(
        "https://my-movies-db-875e8-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        requestBody
      );
      if(response.statusText === "OK"){
        return {...response.data, success: true};
      }else{
        return {...response.data, success: false}
      }
    } catch (error: any) {
      return {...error, success: false}
    }
  };

  fetchUserDetails = async (email: string, isSettedDetails: boolean) => {
    try {
      const response = await axios.get(
        "https://my-movies-db-875e8-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );

      const list: User[] = [];
      for(const key in response.data){
        list.push(response.data[key]);
      }

      const user: User | null = this.findUser(list, email);

      if (!isSettedDetails) {
        return { isUserExist: !!user };
      }

      if (user) {
        this.setUserDetails(user);
        return "User data is setted";
      } else {
        throw new Error("User not found. Please contact to support.");
      }
    } catch (error: any) {
      return error.message;
    }
  };

  findUser(list: User[], email: string) {
    const findUser = list.filter((user: User) => user.email === email);
    if (findUser.length > 0) {
      return findUser[0];
    } else {
      return null;
    }
  }

  setUserDetails = (findedUser: User) => {
    this.user.username = findedUser.username;
    this.user.email = findedUser.email;
    this.user.profileImg = findedUser.profileImg;
    this.user.likedMovies = findedUser.likedMovies;
  };

  resetUserDetails = () => {
    this.user.username = null;
    this.user.email = null;
    this.user.profileImg = null;
    this.user.likedMovies = [];
  };

  constructor() {
    makeAutoObservable(this);
    const token = localStorage.getItem("token");
    const expiresDate = localStorage.getItem("expiresDate");
    const email = localStorage.getItem("userEmail");

    if (expiresDate) {
      const expiresTime =
        new Date(expiresDate).getTime() - new Date().getTime();

      if (expiresTime >= 60_000 && !!email) {
        this.fetchUserDetails(email, true);
        this.token = token;
        this.expiresTimeout = expiresDate;
        this.timeout = setTimeout(() => {
          this.logout();
        }, expiresTime);
      } else {
        this.logout();
      }
    }
  }
}

const store = new UserStore();
export default store;
