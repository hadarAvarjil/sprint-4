import React, { useState } from "react";
import { AddImg } from "../cmps/AddImg.jsx";
import { setFilter } from "../store/actions/gig.actions.js";
import { useNavigate } from "react-router";
import { useModal } from '../customHooks/ModalContext'



export function GreenDiv() {
    const { setIsDimmed } = useModal()
  
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
    
    const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    setFilter({ ...filterBy, search: searchQuery });
    navigate(`/gig`);
    setSearchQuery("");
  }
  return (
    <section>
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
              "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736548563/trustedBy-img_q3gqes.png"
            }
          />
        </div>

        <div className="green-search-div-inner-box">
          <h1>
            Scale your<br className="small-resp-br"/> professional <br className="big-resp-br" /> workforce <br className="small-resp-br"/> with{" "}
            <span>freelancers</span>
          </h1>
          <div className="search-bar-div">
            <input
              type="search"
              className="long-placeholder"
              placeholder="Search for any service..."
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              onFocus={() => controlDimming && setIsDimmed(true)}
              onBlur={() => controlDimming && setIsDimmed(false)}
              onKeyPress={handleKeyPress}

            ></input>
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
