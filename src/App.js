import React, { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
	const [image, setImage] = useState("")
	const [input, setInput] = useState({
		date: "",
	})

	//Fetch Today's image

	useEffect(() => {
		axios
			.get(
				`https://api.nasa.gov/planetary/apod?api_key=PvJR60vcNkMYler2kwiKhzQnBjoqdhaQFpRLmGKg`
			)
			.then((res) => {
				console.log(res)
				setImage(res.data.url)
			})
	}, [])

	//Generate Today's date

	let today = new Date()
	let dd = String(today.getDate()).padStart(2, "0")
	let mm = String(today.getMonth() + 1).padStart(2, "0")
	let yyyy = today.getFullYear()
	today = yyyy + "-" + mm + "-" + dd

	//Get image for selected date

	const handleSubmit = (e) => {
		e.preventDefault()

		// Check for local storage

		if (localStorage.getItem(input.date) === null) {
			axios
				.get(
					`https://api.nasa.gov/planetary/apod?api_key=PvJR60vcNkMYler2kwiKhzQnBjoqdhaQFpRLmGKg&date=${input.date}`
				)
				.then((res) => {
					console.log(res.data)
					setImage(res.data)
					document.getElementsByClassName("image").src = image.url
					localStorage.setItem(image.date, image.url)
				})
		} else {
			document.getElementById("img").src = localStorage.getItem(input.date)
		}
	}

	return (
		<div className="app">
			<h4 className="currDate">Today's date: {today}</h4>
			<div className="datePicker">
				<h5>Choose date:</h5>
				<input
					type="date"
					id="date"
					name="trip-start"
					value={input.date}
					onChange={(e) => setInput({ ...input, date: e.target.value })}
				></input>
				<Button className="button" onClick={handleSubmit}>
					Submit
				</Button>
			</div>
			<div>
				<img className="image" id="img" src={image.url} alt="apod" />
			</div>
		</div>
	)
}

export default App
