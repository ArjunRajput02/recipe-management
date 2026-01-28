"use strict";
let recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
let recipeContainer = document.querySelector("#data-output");
let retrieveRecipe = "";
recipes.forEach((recipe) => {
    retrieveRecipe += `
    <tr class="border-b">
        <td class="border px-4 py-2">${recipe.id}</td>
        <td class="border px-4 py-2">${recipe.name}</td>
        <td class="border px-4 py-2">${recipe.type}</td>
        <td class="border px-4 py-2">${recipe.description}</td>
        <td class="border px-4 py-2">
            <button onclick="editRecipe(${recipe.id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
        </td>
        <td class="border px-4 py-2">
            <button onclick="confirmDelete(${recipe.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
        </td>
    </tr>
  `;
});
if (recipeContainer) {
    recipeContainer.innerHTML = retrieveRecipe;
}
function addRecipe(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    if (!name.match(/[A-Za-z]/)) {
        alert("Please enter only alphabetic characters for Name");
        return;
    }
    else if (!type.match(/[A-Za-z]/)) {
        alert("Please enter only alphabetic characters for Type");
        return;
    }
    else if (!description.match(/[A-Za-z]/)) {
        alert("Please enter only alphabetic characters for Description");
        return;
    }
    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    let nextId = 1;
    if (recipes.length > 0) {
        nextId = Number(recipes[recipes.length - 1].id) + 1;
    }
    const newRecipe = {
        id: nextId,
        name,
        type,
        description,
    };
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    window.location.href = "index.html";
}
function confirmDelete(id) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        deleteRecipe(id);
    }
}
function deleteRecipe(id) {
    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    const recipeDelete = recipes.filter((val) => val.id != id);
    localStorage.setItem("recipes", JSON.stringify(recipeDelete));
    window.location.reload();
}
function SearchItem() {
    const searchInput = document.getElementById("searchkey");
    const searchquery = searchInput.value.trim().toLowerCase();
    let searchItem = "";
    if (searchquery === "") {
        recipes.forEach((recipe) => {
            searchItem += getRecipeRow(recipe);
        });
    }
    else {
        recipes
            .filter((recipe) => {
            return (recipe.name.toLowerCase().includes(searchquery) ||
                recipe.type.toLowerCase().includes(searchquery) ||
                recipe.description.toLowerCase().includes(searchquery));
        })
            .forEach((recipe) => {
            searchItem += getRecipeRow(recipe);
        });
    }
    recipeContainer.innerHTML = searchItem;
}
function getRecipeRow(recipe) {
    return `
    <tr class="border-b">
      <td class="border px-4 py-2">${recipe.id}</td>
      <td class="border px-4 py-2">${recipe.name}</td>
      <td class="border px-4 py-2">${recipe.type}</td>
      <td class="border px-4 py-2">${recipe.description}</td>
      <td class="border px-4 py-2">
        <button onclick="editRecipe(${recipe.id})"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </td>
      <td class="border px-4 py-2">
        <button onclick="deleteRecipe(${recipe.id})"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </td>
    </tr>
  `;
}
function editRecipe(id) {
    window.location.href = `update-recipe.html?id=${id}`;
}
function loadRecipe() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    console.log(typeof (id));
    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    const recipe = recipes.find((r) => r.id == id);
    if (recipe) {
        document.getElementById("name").value = recipe.name;
        document.getElementById("type").value = recipe.type;
        document.getElementById("description").value =
            recipe.description;
    }
}
function updateRecipe(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const nameInput = document.getElementById("name");
    const typeInput = document.getElementById("type");
    const descriptionInput = document.getElementById("description");
    const name = nameInput.value;
    const type = typeInput.value;
    const description = descriptionInput.value;
    if (!name.match(/[A-Za-z]/)) {
        alert("Please enter only alphabetic characters for Name");
        return;
    }
    else if (!type.match(/[A-Za-z]/)) {
        alert("Please enter only alphabetic characters for Type");
        return;
    }
    else if (!description.match(/[A-Za-z]/)) {
        alert("Please enter only alphabetic characters for Description");
        return;
    }
    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    const index = recipes.findIndex((r) => r.id == id);
    recipes[index] = {
        id: id,
        name: name,
        type: type,
        description: description,
    };
    localStorage.setItem("recipes", JSON.stringify(recipes));
    window.location.href = "index.html";
}
