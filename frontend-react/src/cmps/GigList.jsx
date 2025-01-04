import { userService } from '../services/user'
import { GigPreview } from './GigPreview'
import { useState, useEffect, useMemo } from 'react'
import _ from 'lodash'

export function GigList({ gigs, onRemoveGig, onUpdateGig, onAddGig, isLoading }) {
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [isVisible, setIsVisible] = useState(false)
  const isFrom = "explore"

  useEffect(() => {
    // Delay to show animation when component is loaded
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(criteria)
      setSortOrder('asc')
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const sortedGigs = useMemo(() => {
    return _.orderBy(gigs, sortBy, sortOrder)
  }, [gigs, sortBy, sortOrder])

  function shouldShowActionBtns(gig) {
    const user = userService.getLoggedinUser()
    return user && (user.isAdmin || gig.owner?._id === user._id)
  }

  if (isLoading) return <div className="loader">Loading...</div>

  return (
    <section className="main-gig-list">
      <div className="sort-buttons">
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleSort('createdAt')}>Sort by Date</button>
        <button onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className={`gig-list layout-row ${isVisible ? 'show' : ''}`}>
        {sortedGigs.map((gig) => (
          <GigPreview
            key={gig._id}
            onRemoveGig={onRemoveGig}
            onUpdateGig={onUpdateGig}
            gig={gig}
            canEdit={shouldShowActionBtns(gig)}
            isFrom={isFrom} 
          />
        ))}
      </div>
    </section>
  );
}
