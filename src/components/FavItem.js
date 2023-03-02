import React from "react";
import { useSelector } from "react-redux";
import { removeFav} from "../actions";
import { writeFavsToLocalStorage } from "../reducers";
import { useDispatch } from "react-redux";

function FavItem() {
  const dispatch=useDispatch()
  const favItems=useSelector((store)=> store.favs)
  
  return (
    <>{favItems.map((item)=> (
    <div className="bg-white shadow hover:shadow-lg p-3 pl-5 flex items-center group transition-all">
      <div className="flex-1 pr-4">{item.activity}</div>
      <button
        onClick={() => {dispatch(removeFav(item));
          }}
        className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100" 
      >
        Çıkar
      </button>
    </div>))}
    </>
  );
}

export default FavItem;
