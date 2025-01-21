import { useEffect, useState } from 'react'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { MenuFilterContent } from './MenuFilterContent.jsx'
import { CatTagDisplayBar } from './CatTagDisplayBar.jsx'
import { SelectedFilters } from './SelectedFilters.jsx'
import SvgIcon from './SvgIcon.jsx'

export function GigFilter({ filterBy, setMenuFilter, onHandleChoice,
  isRenderedChoice, onDeleteFilter,
  setIsRenderedChoice,
}) {
  const [isSticky, setIsSticky] = useState(false)
  const deviceType = useDeviceType()

  let shadowStart = 139
  const categorySelect = filterBy.cat ? filterBy.cat : 'category'

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleScroll() {
    filterBy.cat ? (shadowStart = 197) : (shadowStart = 139)
    if (window.scrollY >= shadowStart) setIsSticky(true)
    else setIsSticky(false)
  }

  function checkFilter() {
    return (
      filterBy.search !== '' ||
      filterBy.cat !== '' ||
      filterBy.tag !== '' ||
      filterBy.level !== '' ||
      filterBy.min != null ||
      filterBy.max != null ||
      filterBy.time !== ''
    );
  }

  if (deviceType === 'mini-tablet' || deviceType === 'mobile') {
    return (
      <>
        <main className={`gig-filter ${deviceType === 'mini-tablet'
          || deviceType === 'mobile' ? 'mobileStyles' : ''}`}>
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
        </main>
      </>
    )
  }

  return (
    <>
      <div className="gig-results-title layout-row">
        
        {filterBy.search && (
          <section className="search-param">
            <h1>
              {`Results for `}
              <span className="b">{filterBy.search}</span>
            </h1>
          </section>
          
        )}
        {filterBy.cat && (
          <CatTagDisplayBar
            isFrom="explore"
            category={filterBy.cat}
            tag={filterBy.tag}
          />
        )}
      </div>
      <div className="gig-category-title">
  <h1>{filterBy.cat || 'Discover Our Services'}</h1>
</div>
      <main className={`gig-filter ${isSticky ? 'shadow' : ''}`}>
        <section className="floating-top-bar layout-row flex">
          <div className="filter-nav">
            {checkFilter() && (
              <button
                onClick={() => onHandleChoice('clear')}
                className="btn filtered-clr"
                title="Clear all filters"
              >
                Clear filter
              </button>
            )}

            <div
              className={`filter-categories floating-menu ${isRenderedChoice[1] === categorySelect.trim() ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('category')}
                className="btn filtered-sc"
              >
                {categorySelect.charAt(0).toUpperCase() +
                  categorySelect.slice(1)}

                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>
              {(isRenderedChoice[1] === 'category' ||
                isRenderedChoice[1] === categorySelect.trim()) && (
                  <MenuFilterContent
                    renderedChoice={isRenderedChoice[1]}
                    setMenuFilter={setMenuFilter}
                    setIsRenderedChoice={setIsRenderedChoice}
                  />
                )}
            </div>

            <div
              className={`filter-seller-level floating-menu ${isRenderedChoice[1] === 'seller_level' ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('seller_level')}
                className={`btn filtered-sl ${filterBy.level ? 'border' : ''}`}
              >
                Seller level
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>
              {isRenderedChoice[1] === 'seller_level' && (
                <MenuFilterContent
                  renderedChoice={isRenderedChoice[1]}
                  setMenuFilter={setMenuFilter}
                  setIsRenderedChoice={setIsRenderedChoice}
                />
              )}
            </div>

            <div
              className={`filter-budget floating-menu ${isRenderedChoice[1] === 'budget' ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('budget')}
                className={`btn filtered-bg ${filterBy.min || filterBy.max ? 'border' : ''
                  }`}
              >
                Budget
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>
              {isRenderedChoice[1] === 'budget' && (
                <MenuFilterContent
                  renderedChoice={isRenderedChoice[1]}
                  setMenuFilter={setMenuFilter}
                  setIsRenderedChoice={setIsRenderedChoice}
                />
              )}
            </div>

            <div
              className={`filter-delivery-time floating-menu ${isRenderedChoice[1] === 'delivery_time' ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('delivery_time')}
                className={`btn filtered-dt ${filterBy.time ? 'border' : ''}`}
              >
                Delivery time
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>

              {isRenderedChoice[1] === 'delivery_time' && (
                <MenuFilterContent
                  renderedChoice={isRenderedChoice[1]}
                  setMenuFilter={setMenuFilter}
                  setIsRenderedChoice={setIsRenderedChoice}
                />
              )}
            </div>
          </div>
          <div className="pro-services-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={filterBy.proOnly || false}
                  onChange={(e) => setMenuFilter(null, { proOnly: e.target.checked })}
                />
                <span className="toggle-switch"></span>
                <span className="toggle-label">Pro services</span>
              </label>
            </div>
        </section>
      </main>
      <SelectedFilters filterBy={filterBy} onDeleteFilter={onDeleteFilter} />
    </>
  )
}