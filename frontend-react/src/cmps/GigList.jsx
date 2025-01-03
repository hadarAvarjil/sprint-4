import { userService } from '../services/user'
import { GigPreview } from './GigPreview'
import { useState, useEffect } from 'react'
import _ from 'lodash'

export function GigList({ gigs, onRemoveGig, onUpdateGig, onAddGig }) {
    const [sortBy, setSortBy] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
  
    const handleSort = (criteria) => {
      if (sortBy === criteria) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
        setSortBy(criteria)
        setSortOrder('asc')
      }
    }
  
    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }
  
    const sortedGigs = _.orderBy(gigs, sortBy, sortOrder)

    console.log('Hi')
    
    function shouldShowActionBtns(gig) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return gig.owner?._id === user._id
    }

    return (
        <section className="main-gig-list">
          <ul className="gig-list">
            {sortedGigs.map((gig) => (
              <li className="gig-preview" key={gig._id}>
                   <GigPreview
              onRemoveGig={onRemoveGig}
              onUpdateGig={onUpdateGig}
              gig={gig}
            />
              </li>
            ))}
          </ul>
        </section>
      )
}