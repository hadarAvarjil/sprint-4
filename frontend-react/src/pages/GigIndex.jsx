import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadGigs,
  addGig,
  updateGig,
  removeGig,
  setFilter as setFilterAction,
} from '../store/actions/gig.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/'
import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Pagination } from '../cmps/Pagination.jsx'

export function GigIndex() {
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy) || { page: 1 }
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const dispatch = useDispatch()
  const [isRenderedChoice, setIsRenderedChoice] = useState([true, 'category'])

  const currentPage = parseInt(filterBy.page) || 1
  const totalGigsPerPage = 12
  const totalPages = Math.ceil(gigs.length / totalGigsPerPage)

  const startIndex = (currentPage - 1) * totalGigsPerPage
  const endIndex = startIndex + totalGigsPerPage
  const currentGigs = gigs.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gigs = await gigService.query(filterBy);
        dispatch({ type: 'SET_GIGS', gigs });
      } catch (error) {
        console.error('Failed to load gigs:', error)
        showErrorMsg('Cannot load gigs')
      }
    };
    fetchData()
  }, [filterBy, dispatch])


  const onRemoveGig = async (gigId) => {
    try {
      await removeGig(gigId)
      showSuccessMsg('Gig removed')
    } catch (error) {
      console.error('Failed to remove gig:', error)
      showErrorMsg('Cannot remove gig')
    }
  }

  const onUpdateGig = async (gig) => {
    try {
      const price = +prompt('New price?')
      if (isNaN(price)) return
      const gigToSave = { ...gig, price }
      const savedGig = await updateGig(gigToSave)
      showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
    } catch (error) {
      console.error('Failed to update gig:', error)
      showErrorMsg('Cannot update gig')
    }
  }

  const setFilter = (newFilter) => {
    dispatch(setFilterAction({ ...filterBy, ...newFilter }))
  }

  const clearAllFilters = () => {
    const defaultFilter = gigService.getDefaultFilter() 
    setFilter(defaultFilter);
    setIsRenderedChoice([true, 'category'])
};

  const handlePageChange = (newPage) => {
    setFilter({ page: newPage })
  };

  const setMenuFilter = (event, selectedOption) => {
    let updatedFilterBy = { ...filterBy, page: 1 }
  
    switch (isRenderedChoice[1]) {
      case 'budget':
        if (selectedOption.min) updatedFilterBy.min = selectedOption.min
        if (selectedOption.max) updatedFilterBy.max = selectedOption.max
        break;
      case 'seller_level':
        updatedFilterBy.level = selectedOption
        break;
      case 'category':
        if (typeof selectedOption === 'object' && selectedOption.cat) {
          updatedFilterBy.cat = selectedOption.cat
        } else {
          updatedFilterBy.cat = selectedOption
        }
        break
      default:
        break
    }
  
    console.log('Updated Filter:', updatedFilterBy)
    setFilter(updatedFilterBy)
  }

  const onDeleteFilter = (filterToDelete) => {
    const updatedFilter = { ...filterBy };
    if (filterToDelete === 'min' || filterToDelete === 'max') {
      updatedFilter[filterToDelete] = undefined;
    } else {
      updatedFilter[filterToDelete] = '';
    }
    setFilter(updatedFilter);
  };

  const onHandleChoice = (renderedChoice) => {
    if (isRenderedChoice[1] === renderedChoice && isRenderedChoice[0]) {
      setIsRenderedChoice([false, '']);
      return;
    }
    setIsRenderedChoice([true, renderedChoice]);
  };

  return (
    <main className="gig-index main-layout">
      <GigFilter
        filterBy={filterBy}
        setMenuFilter={setMenuFilter}
        onHandleChoice={onHandleChoice}
        isRenderedChoice={isRenderedChoice}
        setIsRenderedChoice={setIsRenderedChoice}
        onDeleteFilter={onDeleteFilter}
      />
      {currentGigs.length ? (
        <>
          <GigList gigs={currentGigs} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <section className="gigless">
          <h2>The Page Not Load? Try Clear Filter's</h2>
          <button className="clr-filter" onClick={clearAllFilters}>
            Clear all filters
          </button>
        </section>
      )}
    </main>
  )
}
