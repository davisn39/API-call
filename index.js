async function fetchData() {
    const resultContainer = document.getElementById("pokemonResult");

    try {
        const pokemonName = document.getElementById("pokemonName").value.trim().toLowerCase();

        if (!pokemonName) {
            resultContainer.innerHTML = "<p>Please enter a Pokémon name first.</p>";
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName)}`);

        if (!response.ok) {
            throw new Error("Could Not Fetch");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        resultContainer.innerHTML = `
            <h3>${data.name.toUpperCase()}</h3>
            <img src="${pokemonSprite}" alt="${data.name} Sprite" id="pokemonSprite">
            <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Height:</strong> ${data.height / 10} m | <strong>Weight:</strong> ${data.weight / 10} kg</p>
        `;
    } catch (error) {
        console.error(error);
        resultContainer.innerHTML = "<p>Could not find that Pokémon. Check the spelling and try again.</p>";
    }
}