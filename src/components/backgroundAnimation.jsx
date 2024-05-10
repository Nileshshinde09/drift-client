import React from 'react'
import { useSelector } from 'react-redux'
const backgroundAnimation = () => {
    const theme = useSelector((state)=>state.theme.theme)

  return (
    <>
         <div className={`${theme && theme=="dark"?"area-dark":"area-light"}`}>
			<ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
    </>
  )
}

export default backgroundAnimation
