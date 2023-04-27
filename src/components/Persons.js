import Person from "./Person"
export default function Persons({ persons, onDelete }) {
	return (
		<>
			{persons.map((person) => (
				<Person
					key={person._id}
					_id={person._id}
					name={person.name}
					phone={person.phone}
					onDelete={onDelete}
				/>
			))}
		</>
	)
}
