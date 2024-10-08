import { getUser } from "./services/getUser.js"
import { getRepositories } from "./services/getRepositories.js"
import { getEvents } from "./services/getEvents.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    if (userName.length === 0) {
        alert(`Preencha o campo com o nome do usúario do GitHub`)
        return
    }

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if (userName.length === 0) {
            alert(`Preencha o campo com o nome do usúario do GitHub`)
            return
        }

        getUserData(userName)
    }
})

const getUserData = async (userName) => {

    const userResponse = await getUser(userName)

    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
}