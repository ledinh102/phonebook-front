export default function Entry({ nameField, name, onText, value }) {
	return (
		<div>
			<label>{nameField}</label>
			<input type="text" name={name} onChange={onText} value={value} autoComplete="off" />
		</div>
	)
}
