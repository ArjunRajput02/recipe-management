
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

let placeholder = document.querySelector('#data-output');
let out = "";


recipes.forEach((recipe, index) => {
    out += `
    <tr class="border-b">
        <td class="border px-4 py-2">${index}</td>
        <td class="border px-4 py-2">${recipe.name}</td>
        <td class="border px-4 py-2">${recipe.type}</td>
        <td class="border px-4 py-2">${recipe.description}</td>
        <td class="border px-4 py-2">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
        </td>
        <td class="border px-4 py-2">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
        </td>
    </tr>
    `;
});

placeholder.innerHTML = out;

function addRecipe(event) {
    event.preventDefault();

    
    let name = document.getElementById('name').value;
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;

    let newRecipe = {
        name: name,
        type: type,
        description: description
    };

    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    window.location.href = "view-recipe.html";
}

