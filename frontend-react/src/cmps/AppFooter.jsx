import { useSelector } from 'react-redux'
import { AddImg } from './AddImg.jsx'

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<div className='bottom-footer-div'>
			<div className='left-footer-div'>
			<img className="logo"
          src="src\services\imgs\design.imgs\logo.png" 
          alt="Navigate to Target Page" 
          style={{ width: "90px", height: "70px" }} 
		  />
			{/* <p>Count: {count}</p> */}
		  <div className='copy-rights-div'>© gigster International Ltd. 2025</div>
		  </div>

		  <div className='right-footer-div'>
		  <a href="https://www.tiktok.com"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549407/tiktok_ff6aqm.svg'}/></a>
		  <a href="https://www.instagram.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549417/ig_xogguu.svg'}/></a>
		  <a href="https://www.linkedin.com/" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549413/in_js01lk.svg'}/></a>
		  <a href="https://www.facebook.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549421/f_fdvgsu.svg'}/></a>
		  <a href="https://www.pinterest.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549630/pinterest_a3jnxv.svg'}/></a>
		  <a href="https://www.x.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549399/x_raqcof.svg'}/></a>
		  </div>
		  </div>
        
		</footer>
	)
}