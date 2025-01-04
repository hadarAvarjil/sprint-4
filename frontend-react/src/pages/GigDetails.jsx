import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGigMsg } from '../store/actions/gig.actions'
import { loadUser } from '../store/actions/user.actions.js'
import { GigDetailsHeader } from '../cmps/GigDetailsHeader'
import { ImageCarousel } from '../cmps/ImageCarousel';


export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [gigOwner, setGigOwner] = useState(null)
  const { gigId } = useParams()
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    loadGigDetails()
  }, [gigId])

  async function loadGigDetails() {
    try {
      const loadedGig = await gigService.getById(gigId)
      console.log('Loaded gig:', loadedGig)
      setGig(loadedGig)
      

      if (loadedGig && loadedGig.owner) {
        const owner = await loadUser(loadedGig.owner._id)
        console.log(owner);
        setGigOwner(owner)
      }
    } catch (err) {
      console.error('Error loading gig:', err)
      showErrorMsg('Cannot load gig')
      navigate('/gig')
    }
  }

  async function onaddGigMsg(gigId) {
    try {
      await addGigMsg(gigId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Gig msg added`)
    } catch (err) {
      showErrorMsg('Cannot add gig msg')
    }

  }

  return (
    <section className="gig-details">
      <Link to="/gig">Back to list</Link>
      {gig && <div>
        <a>{gig.tags}</a>
        <GigDetailsHeader
          gig={gig}
          owner={gigOwner}
        />
         <ImageCarousel
            isFrom="gig-details"
            images={gig.imgUrls || []} 
            gigId={gig._id}
            newImgIndex={currentImageIndex}
            setNewImgIndex={setCurrentImageIndex}
          />
        <h3>About This Gig</h3>
        <p>{gig.description}</p>
      </div>
      }
      <button onClick={() => { onaddGigMsg(gig._id) }}>Add gig msg</button>

    </section>
  )
}