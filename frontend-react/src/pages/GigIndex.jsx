import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig } from '../store/actions/gig.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/'
import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'

export function GigIndex() {
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const gigsPerPage = 12

  // calc for future pagination
  const totalPages = Math.ceil(gigs.length / gigsPerPage)
  const startIndex = (currentPage - 1) * gigsPerPage
  const currentGigs = gigs.slice(startIndex, startIndex + gigsPerPage)

  useEffect(() => {
    loadGigs(filterBy).catch(() => showErrorMsg('Cannot load gigs'))
  }, [filterBy])

  function onRemoveGig(gigId) {
    removeGig(gigId)
      .then(() => showSuccessMsg('Gig removed'))
      .catch(() => showErrorMsg('Cannot remove gig'))
  }

  function onAddGig() {
    const gig = gigService.getEmptyGig()
    gig.title = prompt('Title?')
    addGig(gig)
      .then((savedGig) => showSuccessMsg(`Gig added (id: ${savedGig._id})`))
      .catch(() => showErrorMsg('Cannot add gig'))
  }

  function onUpdateGig(gig) {
    const price = +prompt('New price?')
    const gigToSave = { ...gig, price }
    updateGig(gigToSave)
      .then((savedGig) => showSuccessMsg(`Gig updated, new price: ${savedGig.price}`))
      .catch(() => showErrorMsg('Cannot update gig'))
  }

  function onSetFilter(filterBy) {
    dispatch({ type: 'SET_GIGS_FILTER', filterBy })
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage)
  }

  return (
    <main className="gig-index main-layout">
      <GigFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      {currentGigs.length ? (
        <>
          <GigList gigs={currentGigs} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} />
          {/*    Pagination in future   */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <section className="gigless">
          <h2>We couldn't find Gigs that match your search</h2>
          <button className="clr-filter" onClick={() => dispatch({ type: 'SET_GIGS_FILTER', filterBy: {} })}>
            Clear all filters
          </button>
        </section>
      )}
    </main>
  )
}
