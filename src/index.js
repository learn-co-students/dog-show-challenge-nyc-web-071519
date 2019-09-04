document.addEventListener("DOMContentLoaded", () => {
  const dogtable = document.querySelector(".paddingtable");
  const dogForm = document.querySelector("#dog-form");
  const tableforEditButton = document.querySelector("table");

  let dogs = [];
  let selectedDogId = null;

  tableforEditButton.addEventListener("click", function(event) {
    if (event.target.innerText === "Edit Dog") {
      let dogEdit = event.target.closest("tr");
      const foundDog = dogs.find(
        dog => dog.id === parseInt(event.target.dataset.id)
      );

      selectedDogId = foundDog.id;

      dogForm.name.value = `${
        dogEdit.querySelector(".paddingCenterName").innerText
      }`;

      dogForm.breed.value = `${
        dogEdit.querySelector(".paddingCenterBreed").innerText
      }`;
      dogForm.sex.value = `${
        dogEdit.querySelector(".paddingCenterSex").innerText
      }`;
    } else {
      dogForm;
    }
  });
  function renderDogs() {
    fetch("http://localhost:3000/dogs").then(function(response) {
      response.json().then(function(data) {
        dogs = data;
        data.forEach(dog => {
          const newRow = `<tr class="paddingtable">
          <td class="paddingCenterName">${dog.name}</td>
          <td class="paddingCenterBreed">${dog.breed}</td>
          <td class="paddingCenterSex">${dog.sex}</td>
          <td class="editbutton"> <button id= ${dog.id} data-id=${dog.id}>Edit Dog</button></td>
        </tr>`;
          dogtable.insertAdjacentHTML("afterend", newRow);
        });
      });
    });
  }
  renderDogs();

  dogForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (selectedDogId != null) {
      const updatedDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value
      };
      fetch(`http://localhost:3000/dogs/${selectedDogId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedDog),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(r => r.json())
        .then(data => {
          console.log("UR NEW DOG!", data);
          renderDogs();
        });
    }
  });
});
