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

    document.getElementById('urlInput').value = 'https://www.maitra-patel.com' + text + '/'
    document.getElementById('methods').value = 'get'
    valid = true
    
}

function afAbout() {

    change_input('/api/about')
    
}

function afExperience() {

    change_input('/api/experience')
    
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

        let response = await fetch(url, {'method': method})

        let data = await response.json()
    
        return data

    } catch(error) {

        return 'error'

    }
}

function createHTML(html, rawResponse) {

    try {

        escapedResponse = rawResponse.replace(/</g, '&lt;').replace(/>/g, '&gt;')

    } catch {

        escapedResponse = rawResponse

    }

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

function getOrder(arr) {

    const sortedResponse = response.slice().sort((a, b) => a.priority - b.priority);

    const indexes = sortedResponse.map((obj) => response.indexOf(obj));

    return indexes.reverse();

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

    if (input == 'https://www.maitra-patel.com/api/about/' || input == 'https://www.maitra-patel.com/api/about' || input == 'http://127.0.0.1:8000/api/about') {

        html = createAM(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    } else if (input == 'https://www.maitra-patel.com/api/projects/' || input == 'https://www.maitra-patel.com/api/projects' || input == 'http://127.0.0.1:8000/api/projects') {

        let order = getOrder(response)

        for (let i = 0; i < response.length; i++) {

            html = createProject(response[order[i]])

            display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

        }

    } else if (input == 'https://www.maitra-patel.com/api/resume/' || input == 'https://www.maitra-patel.com/api/resume' || input == 'http://127.0.0.1:8000/api/resume') {

        html = createResume(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    } else if (input == 'https://www.maitra-patel.com/api/contact/' || input == 'https://www.maitra-patel.com/api/contact' || input == 'http://127.0.0.1:8000/api/contact') {

        html = createCM(response[0])

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

    } else if (input == 'https://www.maitra-patel.com/api/experience/' || input == 'https://www.maitra-patel.com/api/experience' || input == 'http://127.0.0.1:8000/api/experience') {

        let order = getOrder(response)

        for (let i = 0; i < response.length;i ++) {

            html = createEXP(response[order[i]])

            display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response[0], null, 4)))

        }

    } else {

       if (response == 'error') {

            console.log('Something went wrong while trying to contact this endpoint! Please try again or check the URL.')
            displayFailMsg('Something went wrong while trying to contact this endpoint! Please try again or check the URL.')
            return

       }

        html = `<div class="div_am_container">
                    <div class="am_body external_response">
                        <p>Since this is an external response, please click 'Show Raw Response' below to see what this endpoint has to say!</p>
                    </div>
                </div>`

        display.insertAdjacentHTML('afterbegin', createHTML(html, JSON.stringify(response, null, 4)))

    }

    display.prepend(document.getElementsByClassName('top_blur')[0])

    inputElement.value = ''

    console.log('Successfully loaded content!');
    displaySuccessMsg('Successfully loaded content!')

}

function createAM(response) {

    socials = JSON.parse(response.socials)
    socialsKeys = Object.keys(socials)

    linksHTML = ''

    for (let i = 0; i < socialsKeys.length; i++) {

        linksHTML += `<a href="${socials[socialsKeys[i]].link}" target="_blank"><i class="${socials[socialsKeys[i]].icon}"><p>${socialsKeys[i]}</p></i></a>`

    } 

    techStack = JSON.parse(response.tech_stack)
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
                    <div class="am_img_and_body">
                        <div class="am_img">
                            <img src="static/media/profile_picture.png" alt="">
                        </div>
                        <div class="am_body">
                            <p>${response.description}</p>
                        </div>
                    </div>
                    <div class="am_tech_and_links">
                        <div class="am_tech">
                            <i class="bi bi-stack tech_header"><p>My Tech Stack</p></i>
                            <div class="am_stack">${techStackHTML}</div>
                        </div>
                        <div class="am_links">
                            <h1><i class="bi bi-share"></i>Connect</h1>
                            <div class="links">
                                ${linksHTML}
                                <a href="#" target="" onclick="afContact()">
                                    <i class="bi bi-envelope-paper-fill">
                                        <p>Contact Me</p>
                                    </i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`

    return html

}

function createEXP(response) {

    let company = response.company
    let title = response.title
    let length = response['length']
    let imgURL = response.image
    let description = response.description
    let tech = JSON.parse(response.tech)

    let forJSON = JSON.parse(`{

        "AC Robotics": "experience_ac",
        "General Dynamics - Mission Systems": "experience_gd"

    }`)

    let techHTML = createTechHTML(tech, forJSON[company])

    let specialImgBGClassJSON = JSON.parse(`{

        "AC Robotics": "ac_img",
        "General Dynamics - Mission Systems": ""

    }`)

    let html = `<div class="div_card">
                    <div class="exp_txt_container">
                        <h1>${company}</h1>
                        <h2>${title}<br>${length}</h2>
                    </div>

                    <div class="exp_content_container">
                        <div class="exp_img_and_desc_container">
                            <div class="exp_img ${specialImgBGClassJSON[company]}">
                                <img src="static/media${imgURL}" alt="">
                            </div>
                            <div class="exp_desc">
                                <p>
                                    ${description}
                                </p>
                            </div>
                        </div>
                        <div class="exp_tech_container">
                            ${techHTML}
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

        if (typeof json[jsonKeys[i]] == "object") {

            sameIconTech = json[jsonKeys[i]]

            for (let j = 0; j < sameIconTech.length; j++) {

                if (jsonKeys[i].split('-')[0] == 'simple') {

                    html += `<i><iconify-icon icon="${jsonKeys[i]}"></iconify-icon><p>${sameIconTech[j]}</p></i>`
        
                } else {
        
                    html += `<i class="${jsonKeys[i]}"><p>${sameIconTech[j]}</p></i>`
        
                }


            }

        } else if (jsonKeys[i].split('-')[0] == 'simple') {

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

        },
        "experience_ac": {

            "title": "What We Used",
            "icon": "bi bi-journals",
            "class": "exp_tech ac_tech"

        },
        "experience_gd": {

            "title": "On The Job Knowledge",
            "icon": "bi bi-journals",
            "class": "exp_tech"

        }

    }`)

    html = `<div class="${classJSON[createFor]['class']}">
                <i class="${classJSON[createFor]['icon']} tech_header"><p>${classJSON[createFor]['title']}</p></i>
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
    let links = JSON.parse(response.links)
    let description = response.description
    let clientside = JSON.parse(response.frontend)
    let backend = JSON.parse(response.backend)
    let db = JSON.parse(response.database)
    let tools = JSON.parse(response.tools)
    let host = JSON.parse(response.host)

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
                </div>`

    return html

}

function createResume(response) {

    html = `<div class="div_resume_container">
                <div class="resume_header">
                    <h1><i class="bi bi-file-earmark-person-fill"></i>Resume</h1>
                </div>
                <div class="resume_buttons">
                    <a href="static/media${response.pdf}" target="_blank">View on Page <i class="bi bi-box-arrow-up-right"></i></a>
                    <a href="static/media${response.pdf}" download="static/media${response.pdf}">Download as PDF <i class="bi bi-filetype-pdf"></i></a>
                    <a href="static/media${response.image}" download="static/media${response.image}">Download as PNG <i class="bi bi-file-earmark-image"></i></a>
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

let fname_valid = false;
let lname_valid = false;
let email_valid = false;
let textarea_valid = false;

function checkValid(input, regex, ctx) {

    let text = input.value;

    if (regex == 'textarea') {

        regex = /^[\w\s!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?`~]+$/

    }

    if(!regex.test(text)) {

        input.classList.add("input-border-red");
        input.classList.remove("input-border-green");

        if (ctx == 'url') {

            valid = false

        } else if (ctx == 'fname') {

            fname_valid = false

        } else if (ctx == 'lname') {

            lname_valid = false

        } else if (ctx == 'email') {

            email_valid = false

        } else if (ctx == 'textarea') {

            textarea_valid = false

        }

    } else {

        input.classList.add("input-border-green");
        input.classList.remove("input-border-red");

        if (ctx == 'url') {

            valid = true

        } else if (ctx == 'fname') {

            fname_valid = true

        } else if (ctx == 'lname') {

            lname_valid = true

        } else if (ctx == 'email') {

            email_valid = true

        } else if (ctx == 'textarea') {

            textarea_valid = true

        }

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

    }, 5000);

}

function getCookie(name) {

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(';').shift();

}

function sendMsg() {

    let form = document.getElementsByClassName("content_form")[0]

    if (!fname_valid || !lname_valid || !email_valid || !textarea_valid) {

        console.log('Please Ensure all the fields are filled out and valid!');
        displayFailMsg('Please ensure all the input fields are filled out and valid!')
        return

    }

    fname = form.elements['fname'].value
    lname = form.elements['lname'].value
    email = form.elements['email'].value
    msg = form.elements['message'].value

    const formData = {

        first_name: fname,
        last_name: lname,
        email: email,
        message: msg

    }

    fetch('https://www.maitra-patel.com/api/sendMessage/', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify(formData),
    })
    .then(response => {

        if (!response.ok) {

            console.error('Error:', error);
            console.log('An Unexpected error occured and the message was not sent! Please try again.');
            displayFailMsg('An Unexpected error occured and the message was not sent! Please try again.')
            return

        }

        return response.json();
    })

    .then(data => {

        console.log('Success:', data);
        console.log('Your message has been successfully sent to me! I will reach out to you as soon as possible! Thanks.');
        
        form.remove()
        let contactHeader = document.getElementsByClassName('contact_header')[0]
        contactHeader.remove()

        let divContact = document.getElementsByClassName('div_contact')[0]

        let successContactDiv = document.createElement('div');
        successContactDiv.classList.add('contact_success');

        successContactDiv.innerHTML = `<h1><i class="bi bi-check2-square"></i> Success!</h1><p>Your message has been sent and I will take a look at it as soon as I can. Thanks for taking the time!</p>`

        divContact.appendChild(successContactDiv)
        
        return

    })
    .catch(error => {

        console.error('Error:', error);
        console.log('An Unexpected error occured and the message was not sent! Please try again.');
        displayFailMsg('An Unexpected error occured and the message was not sent! Please try again.')
        return

    });

}