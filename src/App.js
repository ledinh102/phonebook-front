import "./styles.css"
import { useState, useEffect } from "react"
import Entry from "./components/Entry"
import Persons from "./components/Persons"
import Notify from "./components/Notify"
import servicePersons from "./services/persons"

export default function App() {
	const [persons, setPersons] = useState([])
	const [person, setPerson] = useState({ name: "", phone: "" })
	const [textFilter, setTextFilter] = useState("")
	const [notify, setNotify] = useState("")

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

	const addPerson = async (newPerson) => {
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
				await servicePersons
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
						setNotify(
							`Information of ${newPerson.name} has already been removed from server`
						)
						setTimeout(() => {
							setNotify("Thanks")
						}, 5000)
					})
			} else {
				await servicePersons.create(person).then((returnedPerson) => {
					setPersons([...persons, returnedPerson])
				})
			}
		} else {
			await servicePersons.create(person).then((returnedPerson) => {
				setPersons([...persons, returnedPerson])
			})
		}
		setPerson({ name: "", phone: "" })
		setNotify(`Added ${newPerson.name}`)
		setTimeout(() => {
			setNotify("")
		}, 5000)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		await addPerson(person)
		// const returnedPerson = await servicePersons.create(person)
		// setPersons([...persons, returnedPerson])
	}

	const handleDelete = (id) => {
		const [personDelete] = persons.filter((person) => person._id === id)
		// if (window.confirm(`Delete ${personDelete.name} ?`)) {
		servicePersons.deletePerson(id).then(() => {
			setPersons((prevPersons) =>
				prevPersons.filter((person) => person._id !== id)
			)
		})
		// }
	}

	const filterPersons =
		textFilter === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(textFilter.toLowerCase())
			  )

	return (
		<div className="App">
			<h1>Phonebook</h1>
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
			{notify && <Notify text={notify} />}
		</div>
	)
}