import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  FAVORILERI_TEMIZLE
} from "./actions";
import { toast } from "react-toastify";
const notify2 = () => toast("Favorilerden silindi!");

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
 if(!JSON.parse(localStorage.getItem("s10g4"))) return []
 return JSON.parse(localStorage.getItem("s10g4")) 
}

function LocalTemizle () {

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
      return newState }
      else{return state};

    case FAV_REMOVE:
        const newState2={
          ...state,
          favs:state.favs.filter(item=> item!==action.payload)
        }
        notify2();
        writeFavsToLocalStorage(newState2)
      return newState2;

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
     
    case FAVORILERI_TEMIZLE:
      const newState3={
        ...state,
        favs:[]
      }
      writeFavsToLocalStorage(newState3)
      return newState3;  

      default:
      return state;
  }
  
}
