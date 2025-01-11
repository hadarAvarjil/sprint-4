import { useState } from 'react'

export function AddImg({ picUrl }) {
  const [isImgLoading, setImgLoading] = useState(true)

  function handleImageLoad() {
    setImgLoading(false)
  }

  return (
    <>
      {isImgLoading && <div className="skeleton-loader"></div>}
      <div className="img-container">
        <img
          src={`${picUrl}`}
          alt=''
          onLoad={handleImageLoad}
          style={{ display: isImgLoading ? 'none' : 'block' }}
        />
      </div>
    </>
  )
}
