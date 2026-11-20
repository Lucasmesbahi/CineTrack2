const API_URL = "https://6afaf00b730c1d152f32c93a.mockapi.io/Contents";

const tbody = document.querySelector("#contentsTable tbody");
const form = document.querySelector("#contentForm");

const titleInput = document.querySelector("#title");
const typeInput = document.querySelector("#type");
const yearInput = document.querySelector("#releaseYear");
const seasonsInput = document.querySelector("#seasons");
const imageInput = document.querySelector("#image");
const descriptionInput = document.querySelector("#description");
const genresInput = document.querySelector("#genres");

const submitBtn = document.querySelector("#submitBtn");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const message = document.querySelector("#message");

let editId = null;

async function loadContents() {
    message.textContent = "Chargement...";

    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error(`Erreur ${res.status}`);

        const contents = await res.json();

        tbody.innerHTML = "";

        for (const content of contents) {
            const tr = document.createElement("tr");
            tr.dataset.id = content.id;
            tr.className = "border-b border-gray-800 hover:bg-[#202024]";

            for (const value of [
                content.title,
                content.type,
                content.releaseYear,
                content.seasons ?? "-"
            ]) {
                const td = document.createElement("td");
                td.className = "p-4";
                td.textContent = value;
                tr.appendChild(td);
            }

            const actions = document.createElement("td");
            actions.className = "p-4 whitespace-nowrap";

            actions.innerHTML = `
                <button class="edit bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">
                    Edit
                </button>

                <button class="delete bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Delete
                </button>
            `;

            tr.appendChild(actions);
            tbody.appendChild(tr);
        }

        message.textContent = "";

    } catch (err) {
        message.textContent = "Impossible de charger les contenus : " + err.message;
    }
}

addBtn.addEventListener("click", () => {
    form.reset();
    editId = null;
    submitBtn.textContent = "Ajouter";
    form.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    form.reset();
    editId = null;
    submitBtn.textContent = "Ajouter";
    form.classList.add("hidden");
});



form.addEventListener("submit", saveContent);

loadContents();
