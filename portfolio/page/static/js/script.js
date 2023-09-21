let welcomeBlock = document.getElementsByClassName('div_welcome')[0]
let container = document.getElementsByClassName('div_container')[0]

function goToAPI() {

    welcomeBlock.classList.add('div_welcome-hide')
        
    setTimeout(function() {

        welcomeBlock.remove()
        container.classList.add('div_container-show')

    }, 250)

}

function change_input(text) {

    document.getElementById('urlInput').value = 'http://127.0.0.1:8000' + text + '/'
    document.getElementById('methods').value = 'get'
    
}

function afAbout() {

    change_input('/api/about')
    
}

function afProjects() {

    change_input('/api/projects')
    
}

function afResume() {

    change_input('/api/resume')
    
}

function afContact() {

    change_input('/api/contact')
    
}

function removeCard(e) {

    e.parentElement.parentElement.parentElement.remove()

}

function showRawResponse(e) {

    cardElement = e.parentElement.parentElement.firstElementChild

    cardElement.firstElementChild.classList.add('hide')
    cardElement.firstElementChild.classList.remove('show')

    cardElement.lastElementChild.classList.add('show')
    cardElement.lastElementChild.classList.remove('hide')

    e.innerHTML = 'Hide Raw Response'

    e.setAttribute('onClick', 'hideRawResponse(this)')

}

function hideRawResponse(e) {

    cardElement = e.parentElement.parentElement.firstElementChild

    cardElement.firstElementChild.classList.add('show')
    cardElement.firstElementChild.classList.remove('hide')

    cardElement.lastElementChild.classList.add('hide')
    cardElement.lastElementChild.classList.remove('show')

    e.innerHTML = 'Show Raw Response'

    e.setAttribute('onClick', 'showRawResponse(this)')

}

async function fetchFunc(url, method) {

    try {

        let response = await fetch(url, { 'method': method})

        let data = await response.json()
    
        return data

    } catch(error) {

        return error

    }
}

function createHTML(html, rawResponse) {

    return `
            <div class="div_card_container">
                <div class="pointer_container">
                    <h1>></h1>
                </div>
                <div class="card_container">
                    <div class="card">
                        ${html}
                        <div class="raw_response">
                            <p>
                                Status Code: 200
                            </p>
                            <pre><br>${rawResponse}</pre>
                        </div>
                    </div>
                    <div class="options">
                        <p onclick="removeCard(this)">Remove</p>
                        <p onclick="showRawResponse(this)">View Raw Response</p>
                    </div>
                </div>
            </div>
    `

}

async function sendRequest() {

    inputElement = document.getElementById('urlInput')
    input = inputElement.value

    method = document.getElementById('methods').value

    if (input == '') {

        console.log('No Input')
        return

    }

    response = await fetchFunc(input, method)

    let html = ''

    display = document.getElementsByClassName('display')[0]

    if (input == 'http://127.0.0.1:8000/api/about/') {

        html = createAM(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    } else if (input == 'http://127.0.0.1:8000/api/projects/') {

        for (let i = 0; i < response.length; i++) {

            html += createProject(response[i])

        }

    } else if (input == 'http://127.0.0.1:8000/api/resume/') {

        html = createResume(response[0])

    } else if (input == 'http://127.0.0.1:8000/api/contact/') {

        html = createCM(response[0])

    }

    inputElement.value = ''

}

function createAM(response) {

    socials = response.socials
    socialsKeys = Object.keys(socials)

    linksHTML = ''

    for (let i = 0; i < socialsKeys.length; i++) {

        linksHTML += `<a href="${socials[socialsKeys[i]].link}" target="_blank"><i class="${socials[socialsKeys[i]].icon}"><p>${socialsKeys[i]}</p></i></a>`

    } 

    techStack = response.tech_stack
    techStackKeys = Object.keys(techStack)

    techStackHTML = ''

    for (let i = 0; i < techStackKeys.length; i++) {

        if (techStackKeys[i].split('-')[0] == 'simple') {

            techStackHTML += `<i><iconify-icon icon="${techStackKeys[i]}"></iconify-icon><p>${techStack[techStackKeys[i]]}</p></i>`

        } else {

            techStackHTML += `<i class="${techStackKeys[i]}"><p>${techStack[techStackKeys[i]]}</p></i>`

        }

    }

    let html =  `<div class="div_am_container">
                <div class="am_header">
                    <h1><i class="bi bi-person-square"></i>About Me</h1>
                </div>
                <div class="am_body">
                    <p>${response.description}</p>
                </div>
                <div class="am_tech_and_links">
                    <div class="am_tech">
                        <i class="bi bi-stack"><p>My Tech Stack</p></i>
                        <div class="am_stack">
                            ${techStackHTML}
                        </div>
                    </div>
                    <div class="am_links">
                        <h1><i class="bi bi-share"></i>My Socials</h1>
                        <div class="links">
                            ${linksHTML}
                        </div>
                    </div>
                </div>
            </div>`

    return html

}

function createTechHTML(json) {

    jsonKeys = Object.keys(json)
    html = ''

    for (let i = 0; i < jsonKeys.length; i++) {

        if (jsonKeys[i].split('-')[0] == 'simple') {

            html += `<i><iconify-icon icon="${jsonKeys[i]}"></iconify-icon><p>${json[jsonKeys[i]]}</p></i>`

        } else {

            html += `<i class="${jsonKeys[i]}"><p>${json[jsonKeys[i]]}</p></i>`

        }

    }

    return html

}

function createProject(response) {

    namePrjct = response.name
    imgURL = response.image
    diagramURL = response.diagram
    links = response.links
    description = response.description
    clientside = response.frontend
    backend = response.backend
    db = response.database
    tools = response.tools
    host = response.host

    csTechHTML = createTechHTML(clientside)

    console.log(csTechHTML)

    beTechHTML = createTechHTML(backend)

    console.log(beTechHTML)

    dbTechHTML = createTechHTML(db)

    console.log(dbTechHTML)

    toolsTechHTML = createTechHTML(tools)

    console.log(toolsTechHTML)

    hostTechHTML = createTechHTML(host)

    console.log(hostTechHTML)

    let html = `<div class="div_card">
                    <div class="card_header">
                        <img src="${imgURL}" alt="">
                        <h1>${namePrjct}</h1>
                        <a href="#"><i class="bi bi-diagram-2-fill"><p>Diagram</p></i></a>
                        <a href="https://github.com/MaiTra10/prjctVes", target="_blank"><i class="bi bi-github"><p>GitHub</p></i></a>
                    </div>
                    <div class="card_body">
                        <p>${description}</p>
                    </div>
                    <div class="card_tech">
                        <div class="tech_cs">
                            <i class="bi bi-window"><p>Client-side</p></i>
                            <div>
                                <i class="fa-brands fa-python"><p>Python</p></i>
                                <i class="bi bi-discord"><p>discord.py</p></i>
                            </div>
                        </div>
                        <div class="tech_be">
                            <i class="bi bi-hdd-rack"><p>Backend</p></i>
                            <div>
                                <i class="fa-brands fa-python"><p>Python</p></i>
                                <i class="fa-brands fa-aws"><p>API Gateway</p></i>
                                <i class="fa-brands fa-aws"><p>Lambda</p></i>
                            </div>
                        </div>
                        <div class="tech_db">
                            <i class="bi bi-database"><p>Database</p></i>
                            <div>
                                <i class="fa-brands fa-aws"><p>DynamoDB</p></i>
                                <i class="fa-brands fa-aws"><p>Parameter Store</p></i>
                            </div>
                        </div>
                        <div class="tech_tools">
                            <i class="bi bi-nut"><p>Tools</p></i>
                            <div>
                                <i><iconify-icon icon="simple-icons:terraform"></iconify-icon><p>Terraform</p></i>
                            </div>
                        </div>
                        <div class="tech_host">
                            <i class="bi bi-clouds"><p>Host</p></i>
                            <div>
                                <i class="fa-brands fa-docker"><p>Docker</p></i>
                                <i class="fa-brands fa-linux"><p>Linux</p></i>
                                <i class="fa-brands fa-raspberry-pi"><p>Raspberry Pi</p></i>
                            </div>
                        </div>
                    </div>
                </div>
    `

    return

}

function createResume(response) {

    return

}

function createCM(response) {

    return

}