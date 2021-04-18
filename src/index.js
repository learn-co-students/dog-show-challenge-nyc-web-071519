document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.querySelector('#table-body');
    const dogForm = document.querySelector("#dog-form");
    let dogId = null;
    function renderPage(){ 
        dogTable.innerText = ''
        fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs =>{
            dogs.forEach(dog =>{
                dogTable.insertAdjacentHTML('beforeend',`
                <tr data-id = "${dog.id}"><td id = 'name'>${dog.name}</td> <td id = 'breed'>${dog.breed}</td> <td id = 'sex'>${dog.sex}</td> <td><button class = "delete" data-dog-id = "${dog.id}">Edit</button></td></tr>
                `)
            })
            const deleteButtons = document.querySelectorAll(".delete")
            deleteButtons.forEach(button =>{
                button.addEventListener("click", e => {
                    dogId = e.target.dataset.dogId
                    let dog = document.querySelector(`tr[data-id = "${dogId}"]`)
                    dogForm.name.value = dog.querySelector("#name").innerText;
                    dogForm.breed.value = dog.querySelector("#breed").innerText;
                    dogForm.sex.value = dog.querySelector("#sex").innerText;
                })
            })
        })
    }
    renderPage();
    dogForm.addEventListener('submit', e =>{
        e.preventDefault();
        fetch(`http://localhost:3000/dogs/${dogId}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": e.target.name.value,
                "breed": e.target.breed.value,
                "sex": e.target.sex.value
            })
        })
        .then(response => response.json())
        renderPage();
    })
    

})