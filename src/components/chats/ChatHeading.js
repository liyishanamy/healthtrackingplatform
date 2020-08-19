import React from 'react';
import {Link} from "react-router-dom";
export default function({name, numberOfUsers}) {
	let opt;
	// if(name!=="Community" && localStorage.getItem("role")!=="doctor"){
	// 	opt=<div className="user-name">
	// 		<Link>Check profile</Link>
	// 	</div>
	// }
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>



		</div>
	);
	
}
