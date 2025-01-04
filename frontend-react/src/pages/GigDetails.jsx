import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig, addGigMsg } from '../store/actions/gig.actions'


export function GigDetails() {

  const { gigId } = useParams()
  const gig = useSelector(storeState => storeState.gigModule.gig)

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

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
      <h1>Gig Details</h1>
      {gig && <div>
        <a>{gig.tags}</a>
        <h2>{gig.title}</h2>
        <img
          className="avatar"
          src={gig.owner.imgUrl}
          alt={`${gig.owner.fullName} gig avatar`}
        />
        <h3>About This Gig</h3>
        <p>{gig.description}</p>
      </div>
      }
      <button onClick={() => { onaddGigMsg(gig._id) }}>Add gig msg</button>

    </section>
  )
}