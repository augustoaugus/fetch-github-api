const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário">
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>

                    <ul class="follow">
                        <li>&#128101 ${user.followers} seguidores</li>
                        <li>&#128100 ${user.following} seguindo</li>
                    </ul>            
                </div>
        </div>`

        let repositoriesItens = ''

        user.repositories.forEach(repo => repositoriesItens +=
            `<li>
                <a href="${repo.html_url}" target="_blank">
                    <p class="repo-name">${repo.name}</p>
                    <p class="repo-tags"><span>🍴 ${repo.forks}</span><span>⭐ ${repo.stargazers_count}</span><span>👀 ${repo.watchers}</span><span>👨‍💻 ${repo.language}</span></p>
                </a>
            </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }


        let eventsItens = ''

        user.events.forEach(event => {
            const eventName = event.repo.name
            const pushEvent = event.type === "PushEvent"
            const createEvent = event.type === "CreateEvent"

            if (pushEvent) {
                eventsItens += `<li><span>${eventName}</span> - ${event.payload.commits[0].message}</li>`

            } else if (createEvent) {
                eventsItens += `<li><span>${eventName}</span> - Sem mensagem de commit</li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `
            <div class="events">
                <h2>Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>`
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usúario não encontrado</h3>`
    }
}

export { screen }