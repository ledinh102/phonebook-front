import Person from "./Person"
export default function Persons({ persons, onDelete }) {
	return (
		<>
			{persons.map((person) => (
				<Person
					key={person.id}
					id={person.id}
					name={person.name}
					phone={person.phone}
					onDelete={onDelete}
				/>
			))}
		</>
	)
}
