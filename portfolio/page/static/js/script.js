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
    valid = true
    
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

    escapedResponse = rawResponse.replace(/</g, '&lt;').replace(/>/g, '&gt;')

    return `
            <div class="div_card_container">
                <div class="pointer_container">
                    <h1><span class="material-symbols-outlined">arrow_right</span></h1>
                </div>
                <div class="card_container">
                    <div class="card">
                        ${html}
                        <div class="raw_response">
                            <p>
                                Status Code: 200
                            </p>
                            <pre><br>${escapedResponse}</pre>
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

    if (input == '') {

        console.log('Endpoint field is empty!');
        displayFailMsg('Endpoint field is empty!')
        return

    } else if (valid == false) {

        console.log('Endpoint field is invalid! Please try again.');
        displayFailMsg('Endpoint field is invalid! Please try again.')
        return

    }

    method = document.getElementById('methods').value

    response = await fetchFunc(input, method)

    let html = ''

    display = document.getElementsByClassName('display')[0]

    if (input == 'http://127.0.0.1:8000/api/about/') {

        html = createAM(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    } else if (input == 'http://127.0.0.1:8000/api/projects/') {

        for (let i = 0; i < response.length; i++) {

            html = createProject(response[i])

            display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

        }

    } else if (input == 'http://127.0.0.1:8000/api/resume/') {

        html = createResume(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    } else if (input == 'http://127.0.0.1:8000/api/contact/') {

        html = createCM(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    }

    display.prepend(document.getElementsByClassName('top_blur')[0])

    inputElement.value = ''

    console.log('Successfully loaded content!');
    displaySuccessMsg('Successfully loaded content!')

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

function createTechHTML(json, createFor) {

    if (json[0] == '') {

        return ''

    }

    let jsonKeys = Object.keys(json)
    let html = ''

    for (let i = 0; i < jsonKeys.length; i++) {

        if (jsonKeys[i].split('-')[0] == 'simple') {

            html += `<i><iconify-icon icon="${jsonKeys[i]}"></iconify-icon><p>${json[jsonKeys[i]]}</p></i>`

        } else {

            html += `<i class="${jsonKeys[i]}"><p>${json[jsonKeys[i]]}</p></i>`

        }

    }

    let classJSON = JSON.parse(`{
        
        "clientside": {

            "title": "Cient-side",
            "icon": "bi bi-window",
            "class": "tech_cs"

        },
        "backend": {

            "title": "Backend",
            "icon": "bi bi-hdd-rack",
            "class": "tech_be"

        },
        "db": {

            "title": "Database",
            "icon": "bi bi-database",
            "class": "tech_db"

        },
        "tools": {

            "title": "Tools",
            "icon": "bi bi-nut",
            "class": "tech_tools"

        },
        "host": {

            "title": "Host",
            "icon": "bi bi-clouds",
            "class": "tech_host"

        }

    }`)

    html = `<div class=${classJSON[createFor]['class']}>
                <i class=${classJSON[createFor]['icon']}><p>${classJSON[createFor]['title']}</p></i>
                <div>
                    ${html}
                </div>
                </div>
    `

    return html

}

function createProject(response) {

    let namePrjct = response.name
    let imgURL = response.image
    let diagramURL = response.diagram
    let links = response.links
    let description = response.description
    let clientside = response.frontend
    let backend = response.backend
    let db = response.database
    let tools = response.tools
    let host = response.host

    console.log(response)

    let csTechHTML = createTechHTML(clientside, 'clientside')

    let beTechHTML = createTechHTML(backend, 'backend')

    let dbTechHTML = createTechHTML(db, 'db')

    let toolsTechHTML = createTechHTML(tools, 'tools')

    let hostTechHTML = createTechHTML(host, 'host')

    let html = `<div class="div_card">
                    <div class="card_header">
                        <img src="static/media${imgURL}" alt="">
                        <h1>${namePrjct}</h1>
                        <a href="static/media${diagramURL}" target="_blank"><i class="bi bi-diagram-2-fill"><p>Diagram</p></i></a>
                        <a href=${links['Github Repository']} target="_blank"><i class="bi bi-github"><p>GitHub</p></i></a>
                    </div>
                    <div class="card_body">
                        <p>${description}</p>
                    </div>
                    <div class="card_tech">
                        ${csTechHTML}
                        ${beTechHTML}
                        ${dbTechHTML}
                        ${toolsTechHTML}
                        ${hostTechHTML}
                    </div>
                </div>
    `

    return html

}

function createResume(response) {

    html = `<div class="div_resume_container">
                <div class="resume_header">
                    <h1><i class="bi bi-file-earmark-person-fill"></i>Resume</h1>
                </div>
                <div class="resume_buttons">
                    <a href="static/media${response.pdf}" download="static/media${response.pdf}">Download as PDF <i class="bi bi-filetype-pdf"></i></a>
                    <a href="static/media${response.image}" download="static/media${response.image}">Download as PNG <i class="bi bi-file-earmark-image"></i></a>
                    <a href="static/media${response.pdf}" target="_blank">View on Page <i class="bi bi-box-arrow-up-right"></i></a>
                </div>
            </div>
    `

    return html

}

function createCM(response) {

    return response.html

}

// Endpoint input border manipulation

let valid = false;

function checkValid(input) {

    let text = input.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(text)) {

        input.classList.add("input-border-red");
        input.classList.remove("input-border-green");
        valid = false


    } else {

        input.classList.add("input-border-green");
        input.classList.remove("input-border-red");
        valid = true

    }

}

function revertBorder(input) {

    input.classList.remove("input-border-green");
    input.classList.remove("input-border-red");


}

// Fail/Success message functions

let successMsg = document.getElementById("success");
let failMsg = document.getElementById("fail");

function closeFailMsg() {

    failMsg.classList.remove("message-transition");

}

function closeSuccessMsg() {

    successMsg.classList.remove("message-transition");

}

function resetMsg() {

    closeFailMsg();
    closeSuccessMsg();

}

function displayFailMsg(msg) {

    resetMsg();
    failMsg.getElementsByTagName("p")[0].innerHTML = msg;
    failMsg.classList.add("message-transition");

    setTimeout(function() {

        closeFailMsg();

    }, 4000);

}

function displaySuccessMsg(msg) {

    resetMsg();
    successMsg.getElementsByTagName("p")[0].innerHTML = msg;
    successMsg.classList.add("message-transition");

    setTimeout(function() {

        closeSuccessMsg();

    }, 4000);

}