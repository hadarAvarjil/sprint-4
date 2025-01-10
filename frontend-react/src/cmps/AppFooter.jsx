import { useSelector } from 'react-redux'

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
		  <a href="https://www.tiktok.com"> <img src="public\img\icons.imgs\tiktok.svg" alt="" /></a>
		  <a href="https://www.instagram.com" ><img src="public\img\icons.imgs\ig.svg" alt="" /></a>
		  <a href="https://www.linkedin.com/" ><img src="public\img\icons.imgs\in.svg" alt="" /></a>
		  <a href="https://www.facebook.com" ><img src="public\img\icons.imgs\f.svg" alt="" /></a>
		  <a href="https://www.pinterest.com" ><img src="public\img\icons.imgs\pinterest.svg" alt="" /></a>
		  <a href="https://www.x.com" ><img src="public\img\icons.imgs\x.svg" alt="" /></a>
		  </div>
		  </div>
        
		</footer>
	)
}