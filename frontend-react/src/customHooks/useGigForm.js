import { useState, useEffect } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Custom hook to manage the gig form's state and behavior
export function useGigForm(initialValues, saveGig, navigate, loggedInUser, id, gigService, subcategories) {
    const [fields, setFields] = useState(initialValues) // Form fields state
    const [availableTags, setAvailableTags] = useState([]) // Available tags based on the selected category

    // Handles input changes in the form
    function handleChange(e) {
        const { name, value } = e.target
        const updatedValue = name === 'price' ? Number(value) : value
        if (name === 'title' && value.length > 80) return // Limits title length to 80 characters
        if (name === 'description' && value.length > 1200) return // Limits description length to 1200 characters
        setFields(prevFields => ({ ...prevFields, [name]: updatedValue })) // Updates the form field
        console.log('Updated fields:', updatedFields)
    }

    // Handles form submission
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // Prepares gig data for saving
            const gigToSave = (!id || id === 'edit') ?
                { ...fields, ownerId: loggedInUser._id } : fields

            console.log('Gig to save:', gigToSave);
            await saveGig(gigToSave) // Calls the saveGig function to save the gig
            navigate(`/profile/${loggedInUser._id}`) // Navigates to the user's profile

            // Displays success message
            showSuccessMsg(
                {
                    title: 'GIG SAVED',
                    body: `Gig saved successfully!`,
                },
                {
                    userMsgLeft: '55%',
                    messageAreaPadding: '2em 1.5em 2em 8em',
                    msgStatusTranslateX: '-12em',
                }
            )
        } catch (err) {
            // Displays error message
            showErrorMsg(
                {
                    title: 'FAILED TO SAVE',
                    body: `Please try again later.`,
                },
                {
                    userMsgLeft: '55%',
                    messageAreaPadding: '2em 1.5em 2em 8em',
                    msgStatusTranslateX: '-12em',
                }
            )
        }
    }

    // Updates the available tags based on the selected category
    function updateAvailableTags(selectedCategory) {
        const categoryKey = selectedCategory.replace(/\s+/g, '_').replace('&', 'And') // Formats category key
        setAvailableTags(subcategories[categoryKey] || []) // Updates available tags
    }

    // Fetches gig details if editing an existing gig
    useEffect(() => {
        async function fetchGig() {
            if (id) {
                try {
                    console.log('Fetched gig:', gig);
                    const gig = await gigService.getById(id)
                    if (gig) setFields(gig) // Sets the fetched gig details in the form
                } catch (err) {
                    console.error('Failed to load gig:', err)
                }
            }
        }
        fetchGig()
    }, [id, gigService])

    // Updates available tags when the category changes
    useEffect(() => {
        updateAvailableTags(fields.category)
    }, [fields.category])

    // Returns form fields, handlers, and helpers
    return { fields, handleChange, handleSubmit, availableTags, updateAvailableTags, setFields }
}
