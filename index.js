const btn = document.querySelector('#button')
const root = document.querySelector('#root')

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

const createUserRepos = (description, created_at, topcis, forks_count, name, html_url) => {
  console.log({ description }, { created_at }, { topcis }, { forks_count }, { name }, { html_url })
}

const createElementsDOM = (data) => {
  const { owner: { avatar_url, login, html_url } } = data[0]
  const { img, nameUser } = createUser(avatar_url, login, html_url)
  root.append(img, nameUser)

  const lengthRepos = data.length
  for (let i = 0; i < lengthRepos; i++) {
    const { description, created_at, topcis, forks_count, name } = data[i]
    createUserRepos(description, created_at, topcis, forks_count, name, html_url)
  }
}

const getReposUser = async () => {
  const queryRepo = document.getElementById('query-repo').value
  const response = await fetch(`https://api.github.com/users/${queryRepo}/repos`)
  const data = await response.json()
  createElementsDOM(data)
}

btn.addEventListener('click', getReposUser)
