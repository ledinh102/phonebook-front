import "./styles.css"
import { useState, useEffect } from "react"
import Entry from "./components/Entry"
import Persons from "./components/Persons"
import Notify from "./components/Notify"
import servicePersons from "./services/persons"

export default function App() {
	const [persons, setPersons] = useState([])
	const [person, setPerson] = useState({ name: "", phone: "", id: 0 })
	const [textFilter, setTextFilter] = useState("")
	const [notify, setNotify] = useState("Thanks")

	useEffect(() => {
		servicePersons.getAll().then((initialPersons) => {
			setPersons(initialPersons)
		})
	}, [])

	const onText = (e) => {
		const { name, value } = e.target
		setPerson((prev) => ({ ...prev, [name]: value }))
	}

	const handleFilter = (e) => {
		const { value } = e.target
		setTextFilter(value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const newPerson = person
		const indexPersonExist = persons.findIndex(
			(person) => person.name === newPerson.name
		)
		console.log(indexPersonExist)
		if (indexPersonExist !== -1) {
			if (
				window.confirm(
					`${newPerson.name} is already added to phonebook, replace the old phone with a new one`
				)
			) {
				servicePersons
					.update(indexPersonExist + 1, person)
					.then((returnedPerson) => {
						setPersons((prevPersons) =>
							prevPersons.map((person) =>
								returnedPerson.name === person.name
									? returnedPerson
									: person
							)
						)
					})
					.catch((error) => {
						setNotify(`Information of ${newPerson.name} has already been removed from server`)
						setTimeout(() => {
							setNotify("Thanks")
						}, 5000)
					})
			} else {
				servicePersons.create(person).then((returnedPerson) => {
					setPersons([...persons, returnedPerson])
				})
			}
		} else {
			servicePersons.create(person).then((returnedPerson) => {
				setPersons([...persons, returnedPerson])
			})
		}
		setPerson({ name: "", phone: "", id: 0 })
		setNotify(`Added ${newPerson.name}`)
		setTimeout(() => {
			setNotify("Thanks")
		}, 5000)
	}

	const handleDelete = (id) => {
		const [personDelete] = persons.filter((person) => person.id === id)
		console.log(personDelete)
		if (window.confirm(`Delete ${personDelete.name} ?`)) {
			servicePersons.deletePerson(id).then(() => {
				setPersons((prevPersons) =>
					prevPersons.filter((person) => person.id !== id)
				)
			})
		}
	}

	const filterPersons =
		textFilter === null
			? persons
			: persons.filter((person) =>
					person.name
						.toLocaleLowerCase()
						.includes(textFilter.toLocaleLowerCase())
			  )

	return (
		<div className="App">
			<h1>Phonebook</h1>
			<Notify text={notify} />
			<Entry
				nameField={"Filter shown with: "}
				onText={handleFilter}
				name={"filter"}
				value={textFilter}
			/>

			<h2>Add a new</h2>
			<form>
				<Entry
					nameField={"Name: "}
					name={"name"}
					onText={onText}
					value={person.name}
				/>
				<Entry
					nameField={"Phone: "}
					name={"phone"}
					onText={onText}
					value={person.phone}
				/>
				<button type="submit" onClick={onSubmit}>
					Add
				</button>
			</form>

			<Persons persons={filterPersons} onDelete={handleDelete} />
		</div>
	)
}
