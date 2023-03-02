import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: "Rastgele Hobi Seçebilirsin",
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if(state.favs.filter(item=> item===action.payload).length<1){
        const newState={
          ...state,
          favs:[...state.favs,action.payload]
        }
        writeFavsToLocalStorage(newState)
      return newState }else{return state};

    case FAV_REMOVE:
        const newState={
          ...state,
          favs:state.favs.filter(item=> item!==action.payload)
        }
        writeFavsToLocalStorage(newState)
      return newState;

    case FETCH_SUCCESS:
      return {
        ...state,
        current:action.payload,
        loading:false
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading:true
      };

    case FETCH_ERROR:
      return {
        ...state,
        error:action.payload
      };

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs:readFavsFromLocalStorage()
      }

      default:
      return state;
  }
  
}
