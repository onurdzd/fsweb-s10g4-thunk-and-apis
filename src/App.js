import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { addFav, fetchAnother, getFavsFromLocalStorage } from "./actions";
import { useDispatch ,useSelector} from "react-redux";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const loading = useSelector((store)=> store.loading);
  const dispatch=useDispatch()
  const current=useSelector((store)=> store.current)
  const favs = useSelector((store)=>store.favs);
  const notify = () => toast("Favorilere eklendi!");

  function addToFavs() {
    dispatch(addFav(current))
  }

  useEffect(()=>{
    dispatch(getFavsFromLocalStorage())
  },[])

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
         
          {loading ? <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div> : current.activity ? <Item/> :  <div className="bg-orange-300 p-6 text-center shadow-md font-bold">{current}</div>}

          <div className="flex gap-3 justify-end py-3">
            <button onClick={()=>dispatch(fetchAnother())}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={()=>{addToFavs();
                notify()
             }}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
              disabled={!current.activity}
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ?
                <FavItem />
              : <div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok</div>
            }
          </div>
        </Route>
      </Switch>
      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
    </div>
  );
}
