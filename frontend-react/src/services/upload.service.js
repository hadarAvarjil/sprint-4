export const uploadService = {
	uploadImg,
}

async function uploadImg(ev) {

	const file = ev.target.files[0]

	if(!file){
		console.error("No file selected")
		return null
	}

	const CLOUD_NAME = 'vanilla-test-images'
	const UPLOAD_PRESET = 'stavs_preset'
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	const formData = new FormData()
	
    // Building the request body
	formData.append('file', file)

	formData.append('upload_preset', UPLOAD_PRESET)
	
    // Sending a post method request to Cloudinary API
	try {
		const res = await fetch(UPLOAD_URL, { 
			method: 'POST', 
			body: formData 
		})
		if(!res.ok){
			console.error("Upload failed:",res.statusText)
		}
		const imgData = await res.json()
		return imgData.secure_url
	} catch (err) {
		console.error("Error uploading image:",err)
		return null

	}
}