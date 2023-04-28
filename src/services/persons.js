import axios from "axios"

// const baseUrl = process.env.REACT_APP_BASE_URL
const baseUrl = "http://localhost:3001/api/persons"
console.log(baseUrl)

const getAll = () => {
	return axios.get(baseUrl).then((res) => res.data)
}

const create = (newPerson) => {
	return axios.post(baseUrl, newPerson).then((res) => res.data)
}

const update = (id, newPerson) => {
	return axios.put(`${baseUrl}/${id}`, newPerson).then((res) => res.data)
}

const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`).then((res) => res.data)
}

export default { getAll, create, update, deletePerson }
