import { useSelector } from 'react-redux'
import { AddImg } from './AddImg.jsx' 
import SvgIcon from './SvgIcon.jsx';

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)
 
	return (
		<footer className="app-footer full">
			<div className='bottom-footer-div'>
			<div className='left-footer-div'>
			<h1 style={{ color: '#7A7D85' }} className="logo flex row">
                gigster
                <span className="small-img">
				<AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736973928/R-icon_rlohg0.png" />
                </span>
              </h1>
			{/* <h1 style={{ color: '#7A7D85' }} className="flex row">
  gigster
  <span className="small-img">
    <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736973928/R-icon_rlohg0.png" />
  </span>
</h1> */}

			{/* <p>Count: {count}</p> */}
		  <div className='copy-rights-div'>© gigster International Ltd. 2025</div>
		  </div>

		  <div className='right-footer-div'>
		  <a className='grey-icon' href="https://www.tiktok.com"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549407/tiktok_ff6aqm.svg'}/></a>
		  <a className='grey-icon' href="https://www.instagram.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736895538/instagram_lpfme5.svg'}/></a>
		  <a className='grey-icon' href="https://www.linkedin.com/" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736895529/linkedin_mlp4dv.svg'}/></a>
		  <a className='grey-icon' href="https://www.facebook.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736895531/facebook_p7mx4e.svg'}/></a>
		  <a className='grey-icon' href="https://www.pinterest.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736895535/pinterest_vjvbap.svg'}/></a>
		  <a className='grey-icon' href="https://www.x.com" ><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736549399/x_raqcof.svg'}/></a>
		  </div>
		  </div>
        
		</footer>
	)
}