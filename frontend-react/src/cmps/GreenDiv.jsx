import React  from "react";
import { useState, useEffect } from "react";
import { AddImg } from "../cmps/AddImg.jsx";
import { setFilter } from "../store/actions/gig.actions.js";
import { useNavigate } from "react-router";
import { useModal } from '../customHooks/ModalContext'
import { SearchBar } from "./SearchBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { loadGigs } from "../store/actions/gig.actions.js";





export function GreenDiv() {
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy);
  const dispatch = useDispatch();

    const { setIsDimmed } = useModal()
    useEffect(() => {
      console.log("Filter changed:", filterBy);
      loadGigs(filterBy);
    }, [filterBy]);
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        setIsDimmed(false)
        onSearchSubmit(e)
      }
    }
    const handleSubmit = (e) => {
      setIsDimmed(false)
      onSearchSubmit(e)
    }
    function handleSearchChange(e) {
        const newSearchQuery = e.target.value;
        setSearchQuery(newSearchQuery);
      }
    
      async function handleSearchSubmit(e) {
        e.preventDefault()
        if (!searchQuery) return
        //Important  *****!@!@!@!#!!@!@!@!@#
        //when switch to server and build 
        // switch this { ...filterBy, txt: searchQuery } to this { ...filterBy, search: searchQuery }
        const newFilterBy = { ...filterBy, txt: searchQuery }
        console.error('NEED TO SWITCH FIELD IN NEW FILTERBY TO SEARCH INSTEAD OF TXT',newFilterBy)
        dispatch(setFilter(newFilterBy))
    
        try {
          await loadGigs(newFilterBy)
          navigate(`/gig`)
          setSearchQuery("")
        } catch (err) {
          console.error("Failed to load filtered gigs:", err)
        }
      }
    const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  // function handleSearchSubmit(e) {
  //   e.preventDefault();
  //   if (!searchQuery) return;
  //   setFilter({ ...filterBy, search: searchQuery });
  //   navigate(`/gig`);
  //   setSearchQuery("");
  // }
  return (
    <section className="green-div-container">
      <div className="green-search-div">
        <div className="pinkGuy-img">
          <AddImg
            picUrl={
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736532566/pinkGuy_olm97w.png"
            }
          />
        </div>
        <div className="yellowGirl-img">
          <AddImg
            picUrl={
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736540342/yellowGirl-img_ibw5hf.png"
            }
          />
        </div>
        <div className="purpleGuy-img">
          <AddImg
            picUrl={
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736540770/purpleGuy-img_xhgyeo.png"
            }
          />
        </div>
        <div className="greenGirl-img">
          <AddImg
            picUrl={
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736539911/greenGirl_dusi9w.png"
            }
          />
        </div>
        <div className="blurredGirl-img">
          <AddImg
            picUrl={
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736543803/blurred_v7mnmx.png"
            }
          />
        </div>
        <div className="trustedBy-img">
          <AddImg
            picUrl={
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1737495634/Screenshot_2025-01-21_233929_rmooee.png"
            }
          />
        </div>

        <div className="green-search-div-inner-box">
          <h1>
            Scale your <br className="small-resp-br" /> professional <br className="big-resp-br"/> <br className=" massive-resp-br" /> workforce<br className="small-resp-br " /> with 
            <span> freelancers</span>
          </h1>
          <div className="search-bar-div">
            <SearchBar
                placeholder="Search for services..."
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
              />
            <div className="search-btn">
              <div className="big-search-img">
                <AddImg
                  picUrl={
                    "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736881540/icon-search_t7onua.svg"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
