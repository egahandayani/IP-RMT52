import { createSlice } from "@reduxjs/toolkit";
import ipApi from "../../helpers/http-client";

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    list: {
      data: [],
      totalPages: 0,
      currentPage: 1,
      totalData: 0,
      dataPerPage: 0,
    },
    detail: {},
    myCharacters: [],
  },
  reducers: {
    setCharacters: (state, action) => {
      state.list.data = action.payload.data;
      state.list.totalPages = action.payload.totalPages;
      state.list.currentPage = action.payload.page;
      state.list.totalData = action.payload.totalCharacters;
      state.list.dataPerPage = action.payload.pageSize;
    },
    setCharacterDetail: (state, action) => {
      state.detail = action.payload;
    },
    setPage: (state, action) => {
      state.list.currentPage = action.payload;
    },
    setMyCharacters: (state, action) => {
      state.myCharacters = action.payload;
    },
    addMyCharacter: (state, action) => {
      state.myCharacters.push(action.payload);
    },
    removeMyCharacter: (state, action) => {
      state.myCharacters = state.myCharacters.filter(
        (character) => character.id !== action.payload
      );
    },
    updateCharacterImage: (state, action) => {
      if (state.detail.id === action.payload.id) {
        state.detail.imageUrl = action.payload.imageUrl;
      }
    },
  },
});

export const {
  setCharacters,
  setCharacterDetail,
  setPage,
  setMyCharacters,
  addMyCharacter,
  removeMyCharacter,
  updateCharacterImage,
} = characterSlice.actions;

export const fetchCharacters = ({ page = 1, pageSize = 10, q = "" }) => {
  return async (dispatch) => {
    console.log(page, pageSize, q, "<<<<<<<<<<<<<<,ini pageeee");
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await ipApi.get(
        `/characters?q=${q}&pageSize=${pageSize}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "<<<<<<<<<<<<<<< ini di characterSlice");
      dispatch(setCharacters(data));
    } catch (err) {
      console.log("Error fetching characters:", err);
    }
  };
};

export const fetchCharacterDetail = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await ipApi.get(`/characters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCharacterDetail(data));
    } catch (err) {
      console.log("Error fetching character detail:", err);
    }
  };
};

export const fetchMyCharacters = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await ipApi.get(
        `/characters/${localStorage.getItem("userId")}/myCharacters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "<<<<<<<<<<<<<<<<< fetchMyCharacters");
      dispatch(setMyCharacters(data));
    } catch (err) {
      console.log("Error fetching my characters:", err);
    }
  };
};

export const createMyCharacter = (CharacterId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await ipApi.post(
        `/characters/${CharacterId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "<<<<<<<<<<<<<<<<< createMyCharacter");
      dispatch(addMyCharacter(data));
    } catch (err) {
      console.log("Error adding character:", err);
    }
  };
};

export const deleteMyCharacter = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      await ipApi.delete(`/characters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeMyCharacter(id));
    } catch (err) {
      console.log("Error deleting character:", err);
    }
  };
};

export const editCharacterImage = ({ id, formData }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      await ipApi.patch(`/characters/${id}/imageUrl`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(fetchCharacterDetail(id));
      dispatch(fetchMyCharacters());
    } catch (err) {
      console.log("Error updating character image:", err);
    }
  };
};

export default characterSlice.reducer;
