// document.addEventListener('DOMContentLoaded', () => {

// })

// DOM Elements
const tableBody = document.getElementById('table-body');
const dogForm = document.getElementById('dog-form')

let dogs = []
let selectedDogId = null;

tableBody.addEventListener("click", e => {
    if (e.target.matches(".edit")) {
        const foundDoggo = dogs.find(dog => dog.id === parseInt(e.target.dataset.id))
        selectedDogId = foundDoggo.id
        dogForm.name.value = foundDoggo.name
        dogForm.breed.value = foundDoggo.breed
        dogForm.sex.value = foundDoggo.sex
    }
})

dogForm.addEventListener("submit", e => {
    e.preventDefault()
    if (selectedDogId !== null) {
        const updatedDoggo = {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        }

        fetch(`http://localhost:3000/dogs/${selectedDogId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedDoggo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const foundDoggo = dogs.find(dog => dog.id === selectedDogId)
        foundDoggo.name = updatedDoggo.name
        foundDoggo.breed = updatedDoggo.breed
        foundDoggo.sex = updatedDoggo.name

        const dogHtmlArray = dogs.map(dog => {
            return `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit" data-id="${dog.id}">Edit</button></td></tr>`
        })
        // use innerHTML to append to the DOM
        tableBody.innerHTML = dogHtmlArray.join("")

        // .then(r => r.json())
        // .then(dogg => {
        //   console.log("UR NEW DOG!", dogg)
        //   renderPage()
        // })

        console.log("AFTER FETCH")

    }
    // get the values from the form fields
    // make a PATCH request
})

// - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
// when the page loads
// fetch all the dogs
function renderPage() {
    fetch('http://localhost:3000/dogs')
        .then(function (response) {
            return response.json()
        })
        .then(doggoData => {
            dogs = doggoData
            // iterate over each dog
            // dog -> HTML
            const dogHtmlArray = doggoData.map(dog => {
                return `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit" data-id="${dog.id}">Edit</button></td></tr>`
            })
            // use innerHTML to append to the DOM
            tableBody.innerHTML = dogHtmlArray.join("")
        })
}
renderPage()