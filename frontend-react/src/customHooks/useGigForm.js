import { useState, useEffect } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function useGigForm(initialValues, saveGig, navigate, loggedInUser, id, gigService, subcategories) {
    const [fields, setFields] = useState(initialValues) 
    const [availableTags, setAvailableTags] = useState([]) 

    function handleChange(e) {
        const { name, value } = e.target
        const updatedValue = name === 'price' ? Number(value) : value
        if (name === 'title' && value.length > 80) return // Limits title length to 80 characters
        if (name === 'description' && value.length > 1200) return // Limits description length to 1200 characters
        setFields(prevFields => ({ ...prevFields, [name]: updatedValue })) // Updates the form field
    }

 async function handleSubmit(e) {
    e.preventDefault()
    try {    
        const gigToSave = (!id || id === 'edit') ?
            { ...fields, ownerId: loggedInUser._id } : fields
        if (!gigToSave.imgUrls || gigToSave.imgUrls.length === 0) {
        }

        console.log('Gig to save:', gigToSave);
        await saveGig(gigToSave) 
        navigate(`/profile/${loggedInUser._id}`) 
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


    function updateAvailableTags(selectedCategory) {
        const categoryKey = selectedCategory.replace(/\s+/g, '_').replace('&', 'And') 
        setAvailableTags(subcategories[categoryKey] || []) 
    }

    useEffect(() => {
        async function fetchGig() {
            if (id) {
                try {
                    console.log('Fetched gig:', gig)
                    const gig = await gigService.getById(id)
                    if (gig) setFields(gig) 
                } catch (err) {
                    console.error('Failed to load gig:', err)
                }
            }
        }
        fetchGig()
    }, [id, gigService])

    useEffect(() => {
        updateAvailableTags(fields.category)
    }, [fields.category])

    return { fields, handleChange, handleSubmit, availableTags, updateAvailableTags, setFields }
}
