import { useRef, useState, useEffect } from 'react'
import { FilterBtn } from './FilterBtn.jsx'
import { RenderRadioButtons } from './RenderRadioButtons.jsx'
import outsideClick from '../customHooks/outsideClick.js'

import {
  levels,
  deliveryTime,
  category,
  budget,
  subcategories,
} from '../services/gig.service.js'

export function MenuFilterContent({ renderedChoice, setMenuFilter, setIsRenderedChoice }) {
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedFilter, setSelectedFilter] = useState({
    min: '',
    max: '',
  })
  const scrollRef = useRef(null)
  const filterRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  useEffect(() => {
    const handleResize = () => updateArrows()
    window.addEventListener('resize', handleResize)
    // updateArrows()
  
    setTimeout(() => updateArrows(), 0)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [renderedChoice])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const handleScroll = () => updateArrows()
    scrollElement.addEventListener('scroll', handleScroll)
    // updateArrows()
    setTimeout(() => updateArrows(), 0)
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  outsideClick(filterRef, () => {
    if (!filterRef.current) return
    setIsRenderedChoice([false, ''])
  })

  function updateArrows() {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollElement
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth)
  }

  function scrollLeft() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      updateArrows() // עדכון חצים לאחר גלילה
    }
  }

  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      updateArrows() // עדכון חצים לאחר גלילה
    }
  }

  function onHandleBudgetChange(event) {
    if (!event.target.value) return
    switch (event.target.name) {
      case 'min':
        setSelectedFilter({ ...selectedFilter, min: event.target.value })
        break
      case 'max':
        setSelectedFilter({ ...selectedFilter, max: event.target.value })
        break
    }
  }

  return (
    <>
      {renderedChoice && (
        <section className="menu-filter-content" ref={filterRef}>
          {showLeftArrow && (
            <button className="arrow arrow-left" onClick={scrollLeft}>
              ‹
            </button>
          )}
          <div className="content-scroll" ref={scrollRef}>
            {(() => {
              switch (renderedChoice) {
                case 'delivery_time':
                  return (
                    <>
                      <RenderRadioButtons
                        options={deliveryTime}
                        groupName="delivery_time"
                        selectedOption={selectedOption}
                        onOptionChange={(selectedOption) => {
                          console.log('Selected option:', selectedOption)
                          setMenuFilter({ preventDefault: () => {} }, { cat: selectedOption })
                        }}
                      />
                      <FilterBtn setMenuFilter={setMenuFilter} selectedOption={selectedOption} />
                    </>
                  )
                case 'budget':
                  return (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault()
                        setMenuFilter(event, selectedFilter)
                      }}
                    >
                      <div className="budget-filter">
                        {budget.map((type) => (
                          <div className="input-wrapper" key={type}>
                            <label>{`${type.toUpperCase()}.`}</label>
                            <input
                              type="number"
                              name={type}
                              className={type}
                              placeholder="Any"
                              min="0"
                              max="10000"
                              value={selectedFilter[type]}
                              onChange={onHandleBudgetChange}
                            />
                            <i className={type}>$</i>
                          </div>
                        ))}
                      </div>
                    </form>
                  )
                  case 'seller_level':
                return (
                  <>
                    <div className="content-scroll">
                      <RenderRadioButtons
                        options={levels}
                        groupName="seller_level"
                        selectedOption={selectedOption}
                        onOptionChange={(selectedOption) => {
                          console.log('Selected option:', selectedOption);
                          setMenuFilter({ preventDefault: () => {} }, { cat: selectedOption }); 
                        }}
                      />
                    </div>
                    <FilterBtn
                      setMenuFilter={setMenuFilter}
                      selectedOption={selectedOption}
                    />
                  </>
                )
                case 'category':
                  return (
                    <>
                   {/* <div className="content-scroll"> */}
                    <RenderRadioButtons
                      options={category}
                      groupName="category"
                      selectedOption={selectedOption}
                      onOptionChange={(selectedOption) => {
                        console.log('Selected option:', selectedOption);
                        setMenuFilter({ preventDefault: () => {} }, { cat: selectedOption }); 
                      }}
                    />
                    {/* </div> */}
                      <FilterBtn setMenuFilter={setMenuFilter} selectedOption={selectedOption} />
                    </>
                  )
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
                const subcategory = renderedChoice
                  .replace('&', 'And')
                  .split(' ')
                  .join('_')
                return (
                  <>
                    <div className="content-scroll">
                      <RenderRadioButtons
                        options={subcategories[subcategory]}
                        groupName={renderedChoice}
                        selectedOption={selectedOption}
                        onOptionChange={(selectedOption) => {
                          console.log('Selected option:', selectedOption);
                          setMenuFilter({ preventDefault: () => {} }, { cat: selectedOption }); 
                        }}
                      />
                    </div>
                    <FilterBtn
                      setMenuFilter={setMenuFilter}
                      selectedOption={selectedOption}
                    />
                  </>
                )
                default:
                  return (
                    <p>{`This is default in switch in MenuFilterContent with renderChoice: ${renderedChoice}`}</p>
                  )
              }
            })()}
          </div>
          {showRightArrow && (
            <button className="arrow arrow-right" onClick={scrollRight}>
              ›
            </button>
          )}
        </section>
      )}
    </>
  )
}
