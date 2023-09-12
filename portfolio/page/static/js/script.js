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

function sendRequest() {

    input = document.getElementById('urlInput').value

    if (input == '') {

        console.log('No Input')

    } else {

        return fetch(input)
            .then((response) => {

                if (response.ok) {

                    const statusCode = response.status

                    return response.json().then((data) => {

                        console.log(statusCode)
                        console.log(data)
                        return { statusCode, data };

                    })

                } else {

                    throw new Error(`Request failed with the status code: ${response.status}`)

                }

            }).catch((error) => {

                console.log(error)

            })
    }
}