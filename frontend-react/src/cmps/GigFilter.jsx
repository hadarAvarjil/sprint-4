import { useState, useEffect } from 'react'
import { MenuFilterContent } from './MenuFilterContent.jsx'
import { SelectedFilters } from './SelectedFilters.jsx'
import { CategoryBreadcrumb } from './Breadcrumb.jsx'
import SvgIcon from './SvgIcon.jsx'

export function GigFilter({ filterBy = {}, setMenuFilter = () => {}, onDeleteFilter = () => {}, setIsRenderedChoice = () => {} }) {
  const [filterToEdit, setFilterToEdit] = useState({ ...filterBy })
  const [isSticky, setIsSticky] = useState(false)
   const categorySelect = filterBy.cat ? filterBy.cat : 'category'

  useEffect(() => {
    const handleScroll = () => {
      const shadowStart = 139
      setIsSticky(window.scrollY >= shadowStart)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setIsRenderedChoice([true, 'category'])
  }, [setIsRenderedChoice])

  function checkFilter() {
    return (
      filterBy.search ||
      filterBy.cat ||
      filterBy.tag ||
      filterBy.level ||
      filterBy.min ||
      filterBy.max ||
      filterBy.time ||
      filterBy.page !== 1
    )
  }
  return (
    <>
      <section className="floating-top-bar layout-row">
        {checkFilter() && (
          <button
            onClick={() => onHandleChoice('clear')}
            className="btn clear-filter"
            title="Clear all filters"
          >
            Clear filter
          </button>
        )}
      </section>
  
      <div className="gig-results-title layout-row">
        {filterBy?.search && (
          <section className="search-param">
            <h1>
              {`Results for `}
              <span className="b">{filterBy.search}</span>
            </h1>
          </section>
        )}
      </div>
  
      <main className={`gig-filter ${isSticky ? 'shadow' : ''}`}>
        <section className="floating-top-bar layout-row">
          <div className="filter-nav">
            <div className="filter-categories floating-menu">
              <MenuFilterContent
                renderedChoice="category"
                setMenuFilter={setMenuFilter}
                setIsRenderedChoice={setIsRenderedChoice}
              />
            </div>
          </div>
        </section>
  
        <section className="breadcrumb-wrapper">
          <CategoryBreadcrumb
            isFrom="explore"
            category={filterBy.cat || 'Explore Categories'}
            tag={filterBy.tag || null}
          />
        </section>
      </main>
  
      <SelectedFilters filterBy={filterToEdit} onDeleteFilter={onDeleteFilter} />
    </>
  );
  
}
