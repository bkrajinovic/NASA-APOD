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

	let today = new Date()
	let dd = String(today.getDate()).padStart(2, "0")
	let mm = String(today.getMonth() + 1).padStart(2, "0")
	let yyyy = today.getFullYear()
	today = yyyy + "-" + mm + "-" + dd

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(input.date)
		axios
			.get(
				`https://api.nasa.gov/planetary/apod?api_key=PvJR60vcNkMYler2kwiKhzQnBjoqdhaQFpRLmGKg&date=${input.date}`
			)
			.then((res) => {
				console.log(res)
				setImage(res.data.url)
				document.getElementsByClassName("image").src = input.image
			})
	}

	return (
		<div>
			<h4 className="currDate">Today is: {today}</h4>
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
				<img className="image" src={image} alt="apod" />
			</div>
		</div>
	)
}

export default App
