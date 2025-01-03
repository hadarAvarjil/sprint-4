import { useState, useEffect } from 'react'

export function GigFilter({ filterBy, onSetFilter }) {
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

    useEffect(() => {
        onSetFilter(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const field = ev.target.name
        let value

        switch (ev.target.type) {
            case 'text':
                value = ev.target.value
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ txt: '', price: '' })
    }

    return (
        <section className="gig-filter">
            <h3>Filter:</h3>
            <input
                type="text"
                name="txt"
                value={filterBy ? filterBy.txt : ''}
                onChange={handleChange}
                placeholder="Search gigs"
            />
            <input
                type="number"
                name="price"
                value={filterBy ? filterBy.price : ''}
                onChange={handleChange}
                placeholder="Max Price"
            />
            <button 
                className="btn-clear" 
                onClick={clearFilter}>Clear</button>
        </section>
    )
}
