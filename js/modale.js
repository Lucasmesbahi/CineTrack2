const COMMENTS_KEY = "cinetrack-comments";
function getComments() {
    try {
        return JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};
    } catch {
        return {};
    }
}

function saveComments(comments) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

function renderComments(movieId) {
    const commentsContainer = document.getElementById("comments-container");
    const comments = getComments();
    const movieComments = comments[movieId] || [];

    commentsContainer.innerHTML = "";

    if (movieComments.length === 0) {
        commentsContainer.textContent = "No comments yet.";
        return;
    }

    movieComments.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.className = "bg-[#1C1C22] p-3 rounded-lg mb-3";

        const author = document.createElement("h4");
        author.className = "text-white font-bold";
        author.textContent = comment.author;

        const text = document.createElement("p");
        text.className = "text-[#9496A1] mt-1";
        text.textContent = comment.text;

        const date = document.createElement("span");
        date.className = "text-xs text-[#777] mt-2 block";
        date.textContent = comment.date;

        commentElement.append(author, text, date);
        commentsContainer.appendChild(commentElement);
    });
}

export function modal(movies) {

    const modalElement = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const moviesContainer = document.getElementById("movies-container");
    const closeBtn = document.querySelector("#close-btn");

    moviesContainer.addEventListener("click", (e) => {

        if (e.target.closest("[data-favorite]")) return;

        const card = e.target.closest("[data-id]");
        if (!card) return;

        const movie = movies.find(
            (item) => String(item.id) === String(card.dataset.id)
        );

        if (!movie) return;

        const duration = movie.type === "movie"
            ? `${movie.duration} min`
            : `${movie.seasons.length} seasons`;

        modalBody.innerHTML = `
            <div class="flex flex-col md:flex-row gap-6">

                <img
                    src="${movie.image}"
                    alt="${movie.title}"
                    class="w-full md:w-64 h-80 object-cover rounded-lg"
                >

                <div class="flex-1 text-white">

                    <h2 class="text-3xl font-bold mb-3">
                        ${movie.title}
                    </h2>

                    <div class="flex gap-3 items-center mb-4">
                        <span class="text-[#9496A1]">${movie.releaseYear}</span>
                        <span class="bg-[#E80E1B] px-3 py-1 rounded-full text-sm">
                            ${movie.type}
                        </span>
                    </div>

                    <p class="text-[#9496A1] mb-4">
                        ${movie.description}
                    </p>

                    <div class="mb-3">
                        <h3 class="font-bold mb-1">
                            ${movie.type === "movie" ? "Duration" : "Seasons"}
                        </h3>
                        <p class="text-[#9496A1]">${duration}</p>
                    </div>

                    <div class="mb-3">
                        <h3 class="font-bold mb-1">Genres</h3>
                        <p class="text-[#9496A1]">${movie.genres.join(", ")}</p>
                    </div>

                    <div class="mb-3">
                        <h3 class="font-bold mb-1">Directors</h3>
                        <p class="text-[#9496A1]">${movie.directors.join(", ")}</p>
                    </div>

                    <div>
                        <h3 class="font-bold mb-1">Production Countries</h3>
                        <p class="text-[#9496A1]">${movie.productionCountries.join(", ")}</p>
                    </div>

                </div>
            </div>

            <!-- Comments Section -->
            <div class="mt-8 border-t border-[#24242B] pt-5 text-white">

                <h3 class="text-xl font-bold mb-4">Comments</h3>

                <div id="comments-container" class="mb-5"></div>

                <form id="comment-form" data-movie-id="${movie.id}">

                    <input
                        type="text"
                        id="comment-author"
                        placeholder="Your name"
                        maxlength="30"
                        required
                        class="w-full bg-[#1C1C22] border border-[#24242B] rounded-lg p-3 mb-3 text-white outline-none"
                    >

                    <textarea
                        id="comment-text"
                        placeholder="Write your comment..."
                        maxlength="500"
                        required
                        class="w-full bg-[#1C1C22] border border-[#24242B] rounded-lg p-3 mb-3 text-white outline-none"
                    ></textarea>

                    <button
                        type="submit"
                        class="bg-[#E80E1B] hover:bg-red-700 px-5 py-2 rounded-lg font-bold"
                    >
                        Add Comment
                    </button>

                </form>

            </div>
        `;

        // Display existing comments
        renderComments(movie.id);

        modalElement.classList.remove("hidden");
        modalElement.classList.add("flex");
    });
    modalBody.addEventListener("submit", (e) => {

        if (e.target.id !== "comment-form") return;

        e.preventDefault();

        const author = document.getElementById("comment-author").value.trim();
        const text = document.getElementById("comment-text").value.trim();
        const movieId = e.target.dataset.movieId;

        if (!author || !text) return;

        const comments = getComments();

        if (!comments[movieId]) {
            comments[movieId] = [];
        }

        comments[movieId].push({
            author: author,
            text: text,
            date: new Date().toLocaleDateString("fr-FR")
        });

        saveComments(comments);

        e.target.reset();

        renderComments(movieId);
    });

    closeBtn.addEventListener("click", () => {
        modalElement.classList.remove("flex");
        modalElement.classList.add("hidden");
    });


    window.addEventListener("click", (e) => {
        if (e.target === modalElement) {
            modalElement.classList.remove("flex");
            modalElement.classList.add("hidden");
        }
    });
}