//Retrive Data from table
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

let recipeContainer = document.querySelector("#data-output");
let reteiveRecipe = "";

recipes.forEach((recipe) => {
  reteiveRecipe += `
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
  recipeContainer.innerHTML = reteiveRecipe;
}

//Function for Add Recipe
function addRecipe(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let type = document.getElementById("type").value;
  let description = document.getElementById("description").value;

  if (!name.match(/[A-Za-z]/)) {
    alert("Please enter only alphabetic characters for Name");
    return;
  } else if (!type.match(/[A-Za-z]/)) {
    alert("Please enter only alphabetic characters for Type");
    return;
  } else if (!description.match(/[A-Za-z]/)) {
    alert("Please enter only alphabetic characters for Description");
    return;
  }
  let NextRecipeid = JSON.parse(localStorage.getItem("id"));
  if (!NextRecipeid) {
    NextRecipeid = 0;
  }
  let newRecipe = {
    id: NextRecipeid + 1,
    name: name,
    type: type,
    description: description,
  };

  recipes.push(newRecipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  localStorage.setItem("id", ++NextRecipeid);
  window.location.href = "index.html";
}

//Confirmation for delete recipe
function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    deleteRecipe(id);
  }
}

//Function for delete Recipe
function deleteRecipe(id) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  let recipeRemove = recipes.filter((val) => {
    return val.id != id;
  });

  localStorage.setItem("recipes", JSON.stringify(recipeRemove));
  window.location.reload();
}

//Function for Search Recipe

function SearchItem() {
  const searchquery = document
    .getElementById("searchkey")
    .value.trim()
    .toLowerCase();

  let searchItem = "";

  if (searchquery === "") {
    recipes.forEach((recipe) => {
      searchItem += `
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
                <button onclick="deleteRecipe(${recipe.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </td>
        </tr>
      `;
    });
  } else {
    recipes
      .filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(searchquery) ||
          recipe.type.toLowerCase().includes(searchquery) ||
          recipe.description.toLowerCase().includes(searchquery)
        );
      })
      .forEach((recipe) => {
        searchItem += `
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
                  <button onclick="deleteRecipe(${recipe.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                  </button>
              </td>
          </tr>
        `;
      });
  }

  recipeContainer.innerHTML = searchItem;
  // window.location.reload()
}

//Function to Redirect Update Page
function editRecipe(id) {
  window.location.href = `update-recipe.html?id=${id}`;
}

//Function to load data in Update layout
function loadRecipe() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  let recipe = recipes.find((r) => r.id == id);

  document.getElementById("name").value = recipe.name;
  document.getElementById("type").value = recipe.type;
  document.getElementById("description").value = recipe.description;
}

//Function to Update Recipe
function updateRecipe(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  let name = document.getElementById("name").value;
  let type = document.getElementById("type").value;
  let description = document.getElementById("description").value;

  if (!name.match(/[A-Za-z]/)) {
    alert("Please enter only alphabetic characters for Name");
    return;
  } else if (!type.match(/[A-Za-z]/)) {
    alert("Please enter only alphabetic characters for Type");
    return;
  } else if (!description.match(/[A-Za-z]/)) {
    alert("Please enter only alphabetic characters for Description");
    return;
  }

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  let index = recipes.findIndex((r) => r.id == id);

  recipes[index] = {
    id: parseInt(id),
    name: name,
    type: type,
    description: description,
  };

  localStorage.setItem("recipes", JSON.stringify(recipes));
  window.location.href = "index.html";
}
