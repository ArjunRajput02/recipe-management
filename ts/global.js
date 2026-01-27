var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
var recipeContainer = document.querySelector("#data-output");
var retrieveRecipe = "";
recipes.forEach(function (recipe) {
    retrieveRecipe += "\n    <tr class=\"border-b\">\n        <td class=\"border px-4 py-2\">".concat(recipe.id, "</td>\n        <td class=\"border px-4 py-2\">").concat(recipe.name, "</td>\n        <td class=\"border px-4 py-2\">").concat(recipe.type, "</td>\n        <td class=\"border px-4 py-2\">").concat(recipe.description, "</td>\n        <td class=\"border px-4 py-2\">\n            <button onclick=\"editRecipe(").concat(recipe.id, ")\" class=\"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded\">\n                Edit\n            </button>\n        </td>\n        <td class=\"border px-4 py-2\">\n            <button onclick=\"confirmDelete(").concat(recipe.id, ")\" class=\"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded\">\n                Delete\n            </button>\n        </td>\n    </tr>\n  ");
});
if (recipeContainer) {
    recipeContainer.innerHTML = retrieveRecipe;
}
function addRecipe(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var description = document.getElementById("description").value;
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
    var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    var nextId = 1;
    if (recipes.length > 0) {
        nextId = Number(recipes[recipes.length - 1].id) + 1;
    }
    var newRecipe = {
        id: nextId,
        name: name,
        type: type,
        description: description,
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
    var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    var recipeDelete = recipes.filter(function (val) { return val.id != id; });
    localStorage.setItem("recipes", JSON.stringify(recipeDelete));
    window.location.reload();
}
function SearchItem() {
    var searchInput = document.getElementById("searchkey");
    var searchquery = searchInput.value.trim().toLowerCase();
    var searchItem = "";
    if (searchquery === "") {
        recipes.forEach(function (recipe) {
            searchItem += getRecipeRow(recipe);
        });
    }
    else {
        recipes
            .filter(function (recipe) {
            return (recipe.name.toLowerCase().includes(searchquery) ||
                recipe.type.toLowerCase().includes(searchquery) ||
                recipe.description.toLowerCase().includes(searchquery));
        })
            .forEach(function (recipe) {
            searchItem += getRecipeRow(recipe);
        });
    }
    recipeContainer.innerHTML = searchItem;
}
function getRecipeRow(recipe) {
    return "\n    <tr class=\"border-b\">\n      <td class=\"border px-4 py-2\">".concat(recipe.id, "</td>\n      <td class=\"border px-4 py-2\">").concat(recipe.name, "</td>\n      <td class=\"border px-4 py-2\">").concat(recipe.type, "</td>\n      <td class=\"border px-4 py-2\">").concat(recipe.description, "</td>\n      <td class=\"border px-4 py-2\">\n        <button onclick=\"editRecipe(").concat(recipe.id, ")\"\n          class=\"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded\">\n          Edit\n        </button>\n      </td>\n      <td class=\"border px-4 py-2\">\n        <button onclick=\"deleteRecipe(").concat(recipe.id, ")\"\n          class=\"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded\">\n          Delete\n        </button>\n      </td>\n    </tr>\n  ");
}
function editRecipe(id) {
    window.location.href = "update-recipe.html?id=".concat(id);
}
function loadRecipe() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    var recipe = recipes.find(function (r) { return r.id == id; });
    document.getElementById("name").value = recipe.name;
    document.getElementById("type").value = recipe.type;
    document.getElementById("description").value =
        recipe.description;
}
function updateRecipe(event) {
    event.preventDefault();
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var nameInput = document.getElementById("name");
    var typeInput = document.getElementById("type");
    var descriptionInput = document.getElementById("description");
    var name = nameInput.value;
    var type = typeInput.value;
    var description = descriptionInput.value;
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
    var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    var index = recipes.findIndex(function (r) { return r.id == id; });
    recipes[index] = {
        id: id,
        name: name,
        type: type,
        description: description,
    };
    localStorage.setItem("recipes", JSON.stringify(recipes));
    window.location.href = "index.html";
}
