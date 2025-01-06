import { useState, useEffect } from 'react'
import { MenuFilterContent } from './MenuFilterContent.jsx'
import { SelectedFilters } from './SelectedFilters.jsx'

export function GigFilter({ filterBy = {}, setMenuFilter = () => {}, onDeleteFilter = () => {}, setIsRenderedChoice = () => {} }) {
  const [filterToEdit, setFilterToEdit] = useState({ ...filterBy })
  const [isSticky, setIsSticky] = useState(false)

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
  }, [])

  return (
    <>
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
            <div className= "filter-categories floating-menu">      
                <MenuFilterContent
                renderedChoice="category"
                setMenuFilter={setMenuFilter}
                setIsRenderedChoice={setIsRenderedChoice}
                />
            </div>
          </div>
        </section>
      </main>
      <SelectedFilters filterBy={filterToEdit} onDeleteFilter={onDeleteFilter} />
    </>
  )
}
