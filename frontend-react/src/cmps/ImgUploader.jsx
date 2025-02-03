import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded }) {
  const [isUploading, setIsUploading] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)

  async function uploadImg(ev) {
    setIsUploading(true)
    const uploadedImgUrl = await uploadService.uploadImg(ev)
    setIsUploading(false)

    if (uploadedImgUrl) {
      setImgUrl(uploadedImgUrl)
      onUploaded && onUploaded(uploadedImgUrl)
    } else {
      console.error("Failed to upload image.")
    }
  }

  return (
    <div className="upload-preview">
      {imgUrl && <img src={imgUrl} style={{ maxWidth: '200px' }} alt="Uploaded" />}
      <input type="file" onChange={uploadImg} accept="image/*" />
      {isUploading && <p>Uploading...</p>}
    </div>
  )
}