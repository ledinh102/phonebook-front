export default function Person({ _id, name, phone, onDelete }) {
	return (
		<p>
			{name} {phone} <button onClick={() => onDelete(_id)}>x</button>{" "}
		</p>
	)
}
