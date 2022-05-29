let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", (e) => {
  fetch ("http://localhost:3000/toys")
  .then (res => res.json())
  .then (data => fetchToys(data))
})

function fetchToys(toys){
  toys.forEach(toy => {
    const toyCard = document.createElement("div")
    toyCard.setAttribute("class", "card")
    document.querySelector("#toy-collection").append(toyCard)
    
    const toyName = document.createElement("h2")
    const toyImage = document.createElement("img")
    const toyLikes = document.createElement("p")
    const toyId = document.createElement("button")

    toyName.textContent = toy.name
    toyImage.setAttribute("src", toy.image)
    toyImage.setAttribute("class", "toy-avatar")
    toyLikes.textContent = `${toy.likes} likes`
    toyId.textContent = "Like ❤️"
    toyId.setAttribute("class", "like-btn")
    toyId.setAttribute("id", toy.id)

    toyCard.append(toyName, toyImage, toyLikes, toyId)
  });
}


document.querySelector(".add-toy-form").addEventListener("submit", (e) => {
  e.preventDefault()
  
  const newToyName = document.querySelector('.add-toy-form').name.value
  const newToyImage = document.querySelector('.add-toy-form').image.value
  
  fetch ("http://localhost:3000/toys", {
  method: 'POST',  
  headers: {
    "Content-Type": "application/json",
    'Accept': "application/json"
  },
  body: JSON.stringify({
    "name": newToyName,
    "image": newToyImage,
    "likes": 0
  })})
  fetch ("http://localhost:3000/toys")
  .then (res => res.json())
  .then (data => fetchToys(data))

})


// document.querySelector(toyId).addEventListener("click", (e) => {
//   e.preventDefault()
//   const newNumberOfLikes = toyLikes++
//   fetch (`http://localhost:3000/toys/${toyId}`, {
//   method: 'PATCH',  
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify({
//     "likes": newNumberOfLikes
//   })})

//   fetch ("http://localhost:3000/toys")
//   .then (res => res.json())
//   .then (data => fetchToys(data))
// })