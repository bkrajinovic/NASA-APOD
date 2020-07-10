import React, { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"

function App() {
	const [image, setImage] = useState("")

	useEffect(() => {
		axios
			.get(
				`https://api.nasa.gov/planetary/apod?api_key=PvJR60vcNkMYler2kwiKhzQnBjoqdhaQFpRLmGKg`
			)
			.then((res) => {
				console.log(res.data.url)
				setImage(res.data.url)
			})
	}, [])

	return (
		<div>
			<div className="datepicker">
				<h3>Choose date:</h3>
				<input type="date" id="start" name="trip-start"></input>
			</div>
			<div>
				<img className="image" src={image} />
			</div>
		</div>
	)
}

export default App
