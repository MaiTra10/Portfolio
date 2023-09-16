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

async function fetchFunc(url, method) {

    try {

        let response = await fetch(url, { 'method': method})

        let data = await response.json()
    
        return data

    } catch(error) {

        return error

    }
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

    console.log(response[0].socials[Object.keys(response[0].socials)[0]].link)

    let html = ''

    if (input == 'http://127.0.0.1:8000/api/about/') {

        html = createAM(response[0])

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

    linksHTML = ''

    socials = response.socials
    socialsKeys = Object.keys(socials)

    for (let i = 0; i < socialsKeys.length; i++) {

        linksHTML += `<a href="${socials[socialsKeys[i]].link}" target="_blank"><i class="${socials[socialsKeys[i]].icon}"><p>${socialsKeys[i]}</p></i></a>`

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
                            <i class="fa-brands fa-python"><p>Python</p></i>
                            <i><iconify-icon icon="simple-icons:django"></iconify-icon><p>Django | Django REST Framework</p></i>
                            <i class="bi bi-window-stack"><p>HTML | CSS | JavaScript</p></i>
                            <i class="fa-brands fa-aws"><p>Amazon Web Services</p></i>
                            <i><iconify-icon icon="simple-icons:terraform"></iconify-icon><p>Terraform</p></i>
                            <i><iconify-icon icon="simple-icons:postgresql"></iconify-icon><p>PostgreSQL</p></i>
                            <i class="fa-brands fa-docker"><p>Docker</p></i>
                            <i class="fa-brands fa-linux"><p>Linux | Debian</p></i>
                            <i class="fa-brands fa-raspberry-pi"><p>Raspberry Pi</p></i>
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


    console.log(html)

}

function createProject(response) {

    return

}

function createResume(response) {

    return

}

function createCM(response) {

    return

}