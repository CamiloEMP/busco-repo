const btn = document.querySelector('#button')
const root = document.querySelector('.container-repos')
// const containerUser = document.querySelector('.user')
// const containerRepos = document.querySelector('.container-user-repos')

const createUser = (src, name, urlUser) => {
  const img = document.createElement('img')
  img.src = src
  img.alt = name
  img.classList.add('img-user')
  const nameUser = document.createElement('a')
  nameUser.href = urlUser
  nameUser.target = '_blank'
  nameUser.textContent = name
  nameUser.classList.add('name-user')
  return {
    img,
    nameUser
  }
}

const createElementText = (element, content) => {
  const text = document.createElement(element)
  text.textContent = content
  return text
}

const createElementDiv = (nameClass) => {
  const div = document.createElement('div')
  div.classList.add(nameClass)
  return div
}

const createUserRepos = (
  description,
  created_at,
  topics,
  forks_count,
  name,
  url,
  reposContainer
) => {
  const repository = document.createElement('a')
  repository.href = url
  repository.target = '_blank'
  repository.classList.add('repo-container')

  const titleRepo = createElementDiv('title-repo')
  const nameRepo = createElementText('h3', name)
  const descriptionRepo = createElementText('p', description)
  titleRepo.append(nameRepo, descriptionRepo)

  const infoRepo = createElementDiv('info-repo')
  const forks = createElementText('span', `Forks: ${forks_count}`)
  const topicsRepo = createElementDiv('topics-repo')
  if (topics.length > 0) {
    const textTopic = createElementText('p', 'Topics: ')
    textTopic.classList.add('topic')
    topicsRepo.append(textTopic)
    const arrayTopics = []
    for (let i = 0; i < topics.length; i++) {
      const topic = createElementText('span', topics[i])
      arrayTopics.push(topic)
    }
    arrayTopics.forEach(topic => topicsRepo.append(topic))
  }
  const dateRepo = new Date(created_at).toLocaleDateString()
  const createdRepo = createElementText('span', `Created at: ${dateRepo}`)
  infoRepo.append(forks, topicsRepo, createdRepo)

  repository.append(titleRepo, infoRepo)
  reposContainer.appendChild(repository)
}

const createElementsDOM = (data, userContainer, reposContainer) => {
  const {
    owner: { avatar_url, login, html_url }
  } = data[0]
  const { img, nameUser } = createUser(avatar_url, login, html_url)
  userContainer.append(img, nameUser)

  const lengthRepos = data.length
  for (let i = 0; i < lengthRepos; i++) {
    const { description, created_at, topics, forks_count, name, html_url } = data[i]
    createUserRepos(description, created_at, topics, forks_count, name, html_url, reposContainer)
  }
}

const getReposUser = async () => {
  const queryRepo = document.getElementById('query-repo').value
  const response = await fetch(
    `https://api.github.com/users/${queryRepo}/repos`
  )
  const data = await response.json()
  const a = document.querySelector('.user')
  const b = document.querySelector('.container-user-repos')

  const userContainer = document.createElement('div')
  userContainer.classList.add('user')
  const reposContainer = document.createElement('section')
  reposContainer.classList.add('container-user-repos')

  if (!b && !a) {
    root.append(userContainer, reposContainer)
  } else {
    root.removeChild(a)
    root.removeChild(b)
    root.append(userContainer, reposContainer)
  }

  createElementsDOM(data, userContainer, reposContainer)
}

btn.addEventListener('click', getReposUser)
