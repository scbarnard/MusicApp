import {
  // createAsyncThunk,
  createSlice,
  //  PayloadAction
} from "@reduxjs/toolkit";
import Playlists from "../pages/Playlists";
import {
  RootState,
  //  AppThunk
} from "./store";

export interface MusicAppState {
  album: { albumId: string; title: string; cover: string };
  artist: { artistId: string; name: string; picture: string };
  playlists: Array<{
    username: string;
    playlistName: string;
    songs: Array<{
      trackId: string;
      title: string;
      preview: string;
      artist: { artistId: string; name: string; picture: string };
      album: { albumId: string; title: string; cover: string };
    }>;
  }>;
  playlist: {
    username: string;
    playlistName: string;
    songs: Array<{
      trackId: string;
      title: string;
      preview: string;
      artist: { artistId: string; name: string; picture: string };
      album: { albumId: string; title: string; cover: string };
    }>;
  };
  track: {
    trackId: string;
    title: string;
    preview: string;
    artist: { artistId: string; name: string; picture: string };
    album: { albumId: string; title: string; cover: string };
  };
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  };
  searchInput: string;
  loginForm: { username: string | null; password: string | null };
  deezerData: object;
}

const initialState: MusicAppState = {
  album: { albumId: "", title: "", cover: "" },
  artist: { artistId: "", name: "", picture: "" },
  playlist: {
    username: "",
    playlistName: "",
    songs: [],
  },
  playlists: [],
  track: {
    trackId: "",
    title: "",
    preview: "",
    artist: { artistId: "", name: "", picture: "" },
    album: { albumId: "", title: "", cover: "" },
  },
  user: {
    userId: "testuserid",
    firstName: "testfirstname",
    lastName: "testlastname",
    username: "testusername",
    password: "testpassword",
  },
  searchInput: "",
  loginForm: { username: "", password: "" },
  deezerData: {},
};

export const musicAppSlice = createSlice({
  name: "musicApp",
  initialState,
  reducers: {
    setAlbum: (
      state,
      action: { payload: { albumId: string; title: string; cover: string } }
    ) => {
      state.album = action.payload;
    },
    setArtist: (
      state,
      action: { payload: { artistId: string; name: string; picture: string } }
    ) => {
      state.artist = action.payload;
    },
    addPlaylist: (
      state,
      action: {
        payload: {
          username: string;
          playlistName: string;
          songs: Array<{
            trackId: string;
            title: string;
            preview: string;
            artist: { artistId: string; name: string; picture: string };
            album: { albumId: string; title: string; cover: string };
          }>;
        };
      }
    ) => {
      state.playlists = [...state.playlists, action.payload];
    },
    setTrack: (
      state,
      action: {
        payload: {
          trackId: string;
          title: string;
          preview: string;
          artist: { artistId: string; name: string; picture: string };
          album: { albumId: string; title: string; cover: string };
        };
      }
    ) => {
      state.track = action.payload;
    },
    setUser: (
      state,
      action: {
        payload: {
          userId: string;
          firstName: string;
          lastName: string;
          username: string;
          password: string;
        };
      }
    ) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      };
    },
    setLoginForm: (
      state,
      action: { payload: { fieldName: string; value: string } }
    ) => {
      const fieldName = action.payload.fieldName;
      const value = action.payload.value;
      state.loginForm = { ...state.loginForm, [fieldName]: value };
    },
    resetLoginForm: (state) => {
      state.loginForm.username = null;
      state.loginForm.password = null;
    },
    setSearchInput: (state, action: { payload: string }) => {
      state.searchInput = action.payload;
    },
    setDeezerData: (state, action: { payload: object }) => {
      state.deezerData = action.payload;
    },
  },
});

export const {
  setAlbum,
  setArtist,
  addPlaylist,
  setTrack,
  setUser,
  logoutUser,
  setLoginForm,
  resetLoginForm,
  setSearchInput,
  setDeezerData,
} = musicAppSlice.actions;

export const selectMusicApp = (state: RootState) => state.musicApp;

export default musicAppSlice.reducer;
