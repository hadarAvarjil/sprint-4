import { useState, useEffect } from 'react';
import { MenuFilterContent } from './MenuFilterContent.jsx';
import { SelectedFilters } from './SelectedFilters.jsx';
import SvgIcon from './SvgIcon.jsx';

export function GigFilter({filterBy = {}, setMenuFilter = () => {},onHandleChoice = () => {},isRenderedChoice = [false, ''],onDeleteFilter = () => {},setIsRenderedChoice = () => {}}){

  const [filterToEdit, setFilterToEdit] = useState({ ...filterBy });
  const [isSticky, setIsSticky] = useState(false);

  const categorySelect = filterBy?.cat || 'category';


  useEffect(() => {
    const handleScroll = () => {
      const shadowStart = 139;
      setIsSticky(window.scrollY >= shadowStart);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('isRenderedChoice:', isRenderedChoice);
  }, [isRenderedChoice]);

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.type === 'number' ? +ev.target.value || '' : ev.target.value;
    setFilterToEdit({ ...filterToEdit, [field]: value });
  }
  function onHandleChoice(renderedChoice) {
    console.log('onHandleChoice called with:', renderedChoice);
  
    if (isRenderedChoice[1] === renderedChoice && isRenderedChoice[0]) {
      setIsRenderedChoice([false, '']); 
      return;
    }
    setIsRenderedChoice([true, renderedChoice]); 
  }

  function clearFilter() {
    setFilterToEdit({ txt: '', price: '', cat: '', min: '', max: '' });
  }

  function checkFilter() {
    return (
      filterBy?.search ||
      filterBy?.cat ||
      filterBy?.tag ||
      filterBy?.level ||
      filterBy?.min ||
      filterBy?.max ||
      filterBy?.time ||
      filterBy?.page !== 1
    );
  }

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
  className={`filter-categories floating-menu ${
    isRenderedChoice[1] === 'category' ? 'open' : ''
  }`}
>
              <button
                onClick={() => onHandleChoice('category')}
                className="btn filtered-sc"
              >
                {categorySelect.charAt(0).toUpperCase() + categorySelect.slice(1)}
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
          </div>
        </section>
      </main>

      <SelectedFilters filterBy={filterToEdit} onDeleteFilter={onDeleteFilter} />
    </>
  );
}
