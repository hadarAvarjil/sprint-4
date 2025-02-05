import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


import { useGigForm } from '../customHooks/useGigForm.js'
import { saveGig } from '../store/actions/gig.actions.js'
import { defaultImgUrls } from '../services/ImgTemp.service.js'
import { deliveryTime, category, subcategories, gigService } from '../services/gig.service.js'

import { GigEditPreview } from '../cmps/GigEditPreview.jsx'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'

export function GigEdit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)


    useEffect(() => {
        if (!id || id === 'edit') return
        else if (!loggedInUser || id.length !== 24) {
            navigate('/explore')
            return
        }
        loadGig()
    }, [id, navigate, loggedInUser])

    async function loadGig() {
        try {
            const gig = await gigService.getById(id)
            setFields(gig)
        } catch (err) {
            console.error('Failed to load gig', err)
            navigate('/explore')
        }
    }

    const initialValues = {
        title: "Untitled Gig",
        category: category[0],
        tags: ['Logo & Brand Identity', 'Visual Design', 'Art & Illustration'],
        price: 0,
        description: "No description provided.",
        daysToMake: "Express 24H",
        ownerId: loggedInUser._id,
        imgUrls: defaultImgUrls,
        likedByUsers: [],
        reviews: [],
        createdAt: Date.now(),
    }

    const { fields, handleChange, handleSubmit, availableTags,
        updateAvailableTags, setFields } = useGigForm(
            initialValues, saveGig, navigate, loggedInUser,
            id, gigService, subcategories)

    function handleCategoryChange(e) {
        handleChange(e);
        updateAvailableTags(e.target.value)
    }

    function handleTagsChange(e) {
        const selectedTags = Array.from(e.target.selectedOptions, option => option.value)
        setFields(prevFields => ({ ...prevFields, tags: selectedTags }))
    }


    function handleImageUpload(newImgUrl, index) {
        if (!newImgUrl) {
            console.error("No image URL received from uploader.")
            return
        }
        setFields(prevFields => {
            const updatedImgUrls = [...prevFields.imgUrls]
            if (index !== undefined && index < updatedImgUrls.length) {
                updatedImgUrls[index] = newImgUrl
            } else {
                updatedImgUrls.push(newImgUrl)
            }
            return { ...prevFields, imgUrls: updatedImgUrls }
        })
    }

    return (
        <main className="gig-edit-container flex full">
            <section className="gig-edit flex layout-row">
                <form className="flex column" onSubmit={handleSubmit}>


                    <div className="form-inputs flex column">
                        <div className="input-group grid title-input-group">
                            <div className=" add-title info flex column">
                                <div className='add-title-text'>
                                    <label htmlFor="title">Gig Title</label>
                                    <p>As your gig storefront,<strong> your title is the most important place</strong> to include keywords that buyers would likely use to search for a service like yours.</p>
                                </div>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="I will..."
                                    value={fields.title}
                                    onChange={handleChange}
                                    maxLength={80}
                                />
                                <p className="character-counter">{fields.title.length} / 80</p>
                            </div>
                        </div>

                        <div className="input-group grid description-input-group">
                            <div className="info flex column description-container">
                                <div className='Description-form-text'>
                                    <label htmlFor="description">Description</label>
                                    <p>Briefly Describe Your Gig</p>
                                </div>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description here..."
                                    value={fields.description}
                                    onChange={handleChange}
                                    maxLength={1200}
                                ></textarea>
                                <p className="character-counter">{fields.description.length} / 1200</p>
                            </div>
                        </div>

                        <div className="input-group grid input-group-category">
                            <div className="info flex column" style={{ width: '242px', paddingRight: "32px" }}>
                                <label htmlFor="category">Category</label>
                                <p>Choose the category most suitable for your Gig.</p>

                                <select
                                    id="category"
                                    name="category"
                                    value={fields.category}
                                    onChange={handleCategoryChange}

                                >
                                    {category.map((cat, idx) => (
                                        <option key={idx} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="info flex column Subcategories-info">
                                <label htmlFor="tags">Subcategories</label>
                                <p>Choose the sub-category most suitable for your Gig.</p>

                                <select
                                    id="tags"
                                    name="tags"
                                    className="multi-select"
                                    multiple
                                    value={fields.tags}
                                    onChange={handleTagsChange}
                                >
                                    {availableTags.map((tag, idx) => (
                                        <option key={idx} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input-group grid delivery-price-container">
                            <div className="info flex column delivery-container">
                                <label htmlFor="days">Delivery Time</label>
                                <select
                                    id="days"
                                    name="daysToMake"
                                    value={fields.daysToMake}
                                    onChange={handleChange}
                                >
                                    {deliveryTime.map((time, idx) => (
                                        <option key={idx} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="info flex column">
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    min={0}
                                    max={10000}
                                    placeholder='Price'
                                    value={fields.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group grid gallery-input-group">
                            <h3>Showcase Your Services In A Gig Gallery </h3>

                            <div className="info grid">
                                <p>Encourage buyers to choose your Gig by featuring a variety of your work.
                                </p>
                                {fields.imgUrls.map((url, index) => (
                                    <ImgUploader
                                        key={index}
                                        index={index}
                                        defaultImgUrl={url}
                                        onUploaded={handleImageUpload}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="actions flex row">
                        <button type="button" className="flex row"
                            onClick={() => navigate(`/profile/${loggedInUser._id}`)}>
                            <SvgIcon iconName={'arrowDown'} />
                            Back
                        </button>
                        <button type="submit" className="flex row">
                            Save & Continue
                        </button>
                    </div>
                </form>
                <GigEditPreview gig={fields} loggedInUser={loggedInUser} />
            </section>
        </main>
    )
}