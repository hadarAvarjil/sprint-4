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
      {/* קטע הקטגוריות - מועבר לראש העמוד */}
      <nav className="filter-bar">
        <button className="filter-option">Web Application</button>
        <button className="filter-option">Convert PSD</button>
        <button className="filter-option">Bug Fixes</button>
        <button className="filter-option">Email Template</button>
        <button className="filter-option">API & Integrations</button>
        <button className="filter-option">Desktop Applications</button>
      </nav>

      {/* Header Section */}
      <header className="gig-header">
        <h1>HTML & CSS Developers</h1>
        <p>Find the best HTML & CSS developers services you need...</p>
      </header>

      {/* Filter Controls */}
      <div className="filter-controls">
        <GigFilter
          filterBy={filterBy}
          setMenuFilter={setMenuFilter}
          onHandleChoice={onHandleChoice}
          isRenderedChoice={isRenderedChoice}
          setIsRenderedChoice={setIsRenderedChoice}
          onDeleteFilter={onDeleteFilter}
        />
        <div className="additional-filters">
          <button className="filter-dropdown">Service options</button>
          <button className="filter-dropdown">Seller details</button>
          <button className="filter-dropdown">Budget</button>
          <button className="filter-dropdown">Delivery time</button>
          <div className="pro-toggle">
            <label>
              Pro services
              <input type="checkbox" />
            </label>
          </div>
          <div className="sort-dropdown">
            Sort by:
            <select>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gig List Section */}
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
          <h2>The Page Did Not Load? Try Clearing Filters</h2>
          <button className="clr-filter" onClick={clearAllFilters}>
            Clear all filters
          </button>
        </section>
      )}

      {/* Pagination Footer */}
      {currentGigs.length > 0 && (
        <footer className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </footer>
      )}
    </main>
  );
}
