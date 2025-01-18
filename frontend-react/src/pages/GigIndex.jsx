import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'

import { loadGigs, setFilter } from '../store/actions/gig.actions.js'
import { gigService } from '../services/gig.service.js'

const noResultsImg = 'https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701539881/Giggler/other/bzqrborygalzssnmogax.png'

export function GigIndex() {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  const isLoading = useSelector((storeState) => storeState.gigModule.isLoading)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy) || gigService.getDefaultFilter()
  const [isRenderedChoice, setIsRenderedChoice] = useState([false, ''])
  const dispatch = useDispatch()

  const currentPage = filterBy.page || 1
  const totalGigsPerPage = 12
  const totalPages = Math.ceil(gigs.length / totalGigsPerPage)

  const startIndex = (currentPage - 1) * totalGigsPerPage
  const endIndex = startIndex + totalGigsPerPage
  const currentGigs = gigs.slice(startIndex, endIndex)

  useEffect(() => {
    loadsGigs()
  }, [filterBy])

  async function loadsGigs() {
    try {
      // console.log('Loading gigs with filter:', filterBy);// Debugging
      await loadGigs(filterBy)
    } catch (err) {
      console.error('Error getting gigs to GigIndex: ', err)
    }
  }

  function setMenuFilter(event, selectedOption) {
    if (event) event.preventDefault();
    let updatedFilterBy = { ...filterBy, page: 1 }

    if (selectedOption.proOnly !== undefined) {
      updatedFilterBy = { ...updatedFilterBy, proOnly: selectedOption.proOnly };
    }

    switch (isRenderedChoice[1]) {
      case 'delivery_time':
        updatedFilterBy = { ...filterBy, time: selectedOption }
        break;

      case 'budget':
        if (selectedOption.min) {
          updatedFilterBy = { ...updatedFilterBy, min: selectedOption.min }
        }
        if (selectedOption.max) {
          updatedFilterBy = { ...updatedFilterBy, max: selectedOption.max }
        }
        break;

      case 'seller_level':
        updatedFilterBy = { ...updatedFilterBy, level: selectedOption }
        break;

      case 'category':
        updatedFilterBy = { ...updatedFilterBy, cat: selectedOption }
        break;

      case 'Graphics & Design':
      case 'Programming & Tech':
      case 'Digital Marketing':
      case 'Video & Animation':
      case 'Writing & Translation':
      case 'Music & Audio':
      case 'Business':
      case 'Data':
      case 'Photography':
      case 'AI Services':
        updatedFilterBy = { ...updatedFilterBy, tag: selectedOption }
        break;

      case 'clear':
        updatedFilterBy = gigService.getDefaultFilter()
        break;

      default:
        break;
    }
    console.log('Updated filterBy:', updatedFilterBy) // Debugging
    dispatch(setFilter(updatedFilterBy))
    setIsRenderedChoice([false, ''])
  }

  function onDeleteFilter(filterToDelete) {
    const updatedFilterBy = { ...filterBy }
    if (filterToDelete === 'min' || filterToDelete === 'max') {
      delete updatedFilterBy[filterToDelete]
    } else {
      updatedFilterBy[filterToDelete] = ''
    }
    dispatch(setFilter(updatedFilterBy))
  }

  function onHandleChoice(renderedChoice) {
    if (
      (renderedChoice === isRenderedChoice[1] && isRenderedChoice[0]) ||
      (renderedChoice === 'category' && isRenderedChoice[0])
    ) {
      setIsRenderedChoice([false, ''])
      return;
    }

    switch (renderedChoice) {
      case 'seller_level':
        setIsRenderedChoice([true, 'seller_level'])
        break;
      case 'delivery_time':
        setIsRenderedChoice([true, 'delivery_time'])
        break;
      case 'budget':
        setIsRenderedChoice([true, 'budget'])
        break;
      case 'category':
        setIsRenderedChoice([true, 'category'])
        break;
      case 'clear':
        dispatch(setFilter(gigService.getDefaultFilter()))
        setIsRenderedChoice([false, 'clear'])
        break;
      default:
        console.log('Default case in onHandleChoice')
        break;
    }
  }

  function clearAllFilters() {
    console.log('Clearing filters - old filterBy:', filterBy)
    dispatch(setFilter(gigService.getDefaultFilter()))
    console.log('Clearing filters - new filterBy:', gigService.getDefaultFilter())
  }

  function handlePageChange(newPage) {
    dispatch(setFilter({ ...filterBy, page: newPage }))
  }

  return (
    <main
      className="gig-index flex column full"
    >
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
          <GigList gigs={currentGigs} isLoading={isLoading} />
          <Pagination
            currentPage={filterBy.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <section className="gigless">
          <h2>We couldn't find Gigs that match your search</h2>
          <button className="clr-filter" onClick={() => clearAllFilters()}>
            clear all filters
          </button>
          <img src={noResultsImg} alt="No Results" />
        </section>
      )}
    </main>
  )
}