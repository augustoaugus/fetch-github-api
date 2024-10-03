import { baseUrl, repositoriesQuantity } from "../variables.js"

const getEvents = async (userName) => {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export { getEvents }