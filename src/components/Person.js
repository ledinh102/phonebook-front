export default function Person({ id, name, phone, onDelete }) {
	return (
		<p>
			{name} {phone} <button onClick={() => onDelete(id)}>x</button>{" "}
		</p>
	)
}
