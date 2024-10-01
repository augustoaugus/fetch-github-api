import { baseUrl, repositoriesQuantity } from "../variables.js"

const getRepositories = async (userName) => {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export { getRepositories }