type Recipe = {
  id: number;
  name: string;
  type: string;
  description: string;
};
//Retrive Recipe from Localstorage
let recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");

let recipeContainer = document.querySelector("#data-output") as HTMLElement;
let retrieveRecipe: string = "";

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

//add recipe in localstorage
function addRecipe(event: Event): void {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const type = (document.getElementById("type") as HTMLInputElement).value;
  const description = (
    document.getElementById("description") as HTMLInputElement
  ).value;

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

  const recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");

  let nextId = 1;
  if (recipes.length > 0) {
    nextId = Number(recipes[recipes.length - 1].id) + 1;
  }

  const newRecipe: Recipe = {
    id: nextId,
    name,
    type,
    description,
  };

  recipes.push(newRecipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  window.location.href = "index.html";
}

//Delete Recipe from localstorage
function confirmDelete(id: number): void {
  if (confirm("Are you sure you want to delete this recipe?")) {
    deleteRecipe(id);
  }
}

function deleteRecipe(id: number): void {
  const recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");

  const recipeDelete = recipes.filter((val) => val.id != id);

  localStorage.setItem("recipes", JSON.stringify(recipeDelete));
  window.location.reload();
}

//search recipe from localstorage
function SearchItem(): void {
  const searchInput = document.getElementById("searchkey") as HTMLInputElement;
  const searchquery = searchInput.value.trim().toLowerCase();

  let searchItem = "";

  if (searchquery === "") {
    recipes.forEach((recipe: Recipe) => {
      searchItem += getRecipeRow(recipe);
    });
  } else {
    recipes
      .filter((recipe: Recipe) => {
        return (
          recipe.name.toLowerCase().indexOf(searchquery) !== -1 ||
          recipe.type.toLowerCase().indexOf(searchquery) !== -1 ||
          recipe.description.toLowerCase().indexOf(searchquery) !== -1
        );
      })
      .forEach((recipe: Recipe) => {
        searchItem += getRecipeRow(recipe);
      });
  }

  recipeContainer.innerHTML = searchItem;
}

function getRecipeRow(recipe: Recipe): string {
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
//Update Recipe from localstorage
function editRecipe(id: string | number): void {
  window.location.href = `update-recipe.html?id=${id}`;
}

function loadRecipe(): void {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");

  const recipe = recipes.find((r) => r.id == id);
  if (recipe) {
    (document.getElementById("name") as HTMLInputElement).value = recipe.name;
    (document.getElementById("type") as HTMLInputElement).value = recipe.type;
    (document.getElementById("description") as HTMLInputElement).value =
      recipe.description;
  }
}
function updateRecipe(event: Event): void {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const nameInput = document.getElementById("name") as HTMLInputElement;
  const typeInput = document.getElementById("type") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description",
  ) as HTMLInputElement;

  const name = nameInput.value;
  const type = typeInput.value;
  const description = descriptionInput.value;

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

  const recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");

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

export {};

