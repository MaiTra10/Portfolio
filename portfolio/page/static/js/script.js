let welcomeBlock = document.getElementsByClassName('div_welcome')[0]
let container = document.getElementsByClassName('div_container')[0]

function goToAPI() {

    welcomeBlock.classList.add('div_welcome-hide')
        
    setTimeout(function() {

        welcomeBlock.remove()
        container.classList.add('div_container-show')

    }, 250)

}

let amButtom = document.getElementById('am_button')
let projectsButtom = document.getElementById('projects_button')
let resumeButtom = document.getElementById('resume_button')
let contactButtom = document.getElementById('contact_button')

function change_input(text) {

    document.getElementById('urlInput').value = 'http://127.0.0.1:8000' + text
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