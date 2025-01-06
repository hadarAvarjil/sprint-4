import { useSelector } from 'react-redux'

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			{/* <p>Coffeerights &copy; 2024</p> */}
			<img className="logo"
          src="src\services\imgs\design.imgs\logo.png" 
          alt="Navigate to Target Page" 
          style={{ width: "90px", height: "70px" }} 
		  />
			{/* <p>Count: {count}</p> */}
		  <p>© gigster International Ltd. 2025</p>
		  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">f</a>
		  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">ig</a>
		  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">in</a>
            
            
            {/* {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>} */}
		</footer>
	)
}