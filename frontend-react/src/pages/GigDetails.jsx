import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGigMsg } from '../store/actions/gig.actions'
import { loadUser } from '../store/actions/user.actions.js'
import { GigDetailsHeader } from '../cmps/GigDetailsHeader'
import { ImageCarousel } from '../cmps/ImageCarousel'
import { AboutGigSeller } from '../cmps/AboutGigSeller'
import { GigReviewsList } from '../cmps/GigReviewsList'
import { GigDetailsOrder } from '../cmps/GigDetailsOrder'



export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [gigOwner, setGigOwner] = useState(null)
  const { gigId } = useParams()
  const navigate = useNavigate()
  const [newImgIndex, setNewImgIndex] = useState(0)

  useEffect(() => {
    loadGigDetails()
  }, [gigId])

  async function loadGigDetails() {
    try {
      const loadedGig = await gigService.getById(gigId)
      setGig(loadedGig)


      if (loadedGig && loadedGig.ownerId) {
        const owner = await loadUser(loadedGig.ownerId)
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
    <section className="gig-details grid">
      {gig && (
        <>
          <main>
            <GigDetailsHeader
              gig={gig}
              owner={gigOwner}
            />
            <ImageCarousel
              images={gig.imgUrls || []}
              gigId={gig._id}
              newImgIndex={newImgIndex}
              setNewImgIndex={setNewImgIndex}
            />

            <div className='about-gig'>
              <h3 className='gig-details-header-About-Gig'>About this gig</h3>
              <p className='gig-description' > {gig.description}</p>
            </div>

            <AboutGigSeller owner={gigOwner} />
            <GigReviewsList gig={gig} />
          </main>
          <GigDetailsOrder owner={gigOwner} gig={gig} />
        </>
      )}
    </section>
  )
}

