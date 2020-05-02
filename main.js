var app = new Vue({
    el: "#app",
    data: {
        pokemonData: [],
        clickedPokemon: null,
        isLoaded: false,
        imgLoaded: 0,
        visible: true,
        pokemonCardsToLoad: 132,
        typeColor: {
            "normal": "#A8A77A",
            "fire": "#EE8130",
            "water": "#6390F0",
            "electric": "#F7D02C",
            "grass": "#7AC74C",
            "ice": "#96D9D6",
            "fighting": "#C22E28",
            "poison": "#A33EA1",
            "ground": "#E2BF65",
            "flying": "#A98FF3",
            "psychic": "#F95587",
            "bug": "#A6B91A",
            "rock": "#B6A136",
            "ghost": "#735797",
            "dragon": "#6F35FC",
            "dark": "#705746",
            "steel": "#B7B7CE",
            "fairy": "#D685AD",
        },
    },
    methods: {
        handleLoad: function () {
            this.imgLoaded++;
            if (this.imgLoaded === this.pokemonCardsToLoad) {
                this.isLoaded = true;
            }
        },
        getBackgroundColor(types) {
            type1 = types[0].type.name;
            type2 = types[1] ? types[1].type.name : type1
            return `linear-gradient(90deg, ${this.typeColor[type1]} 50%, ${this.typeColor[type2]} 50%)`
        },
    },
    created: function () {
        for (var i = 1; i <= this.pokemonCardsToLoad; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((response) => response.json())
                .then((data) => {
                    this.pokemonData.push(data);
                })
        }
    },
});

$('#modal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

// function testAnim(x) {
//     $('.modal .modal-dialog').attr('class', 'modal-dialog ' + x + ' animated');

// };
// $(window).on('shown.bs.modal', function (e) {
//     testAnim('fadeIn');

// })
// $(window).on('hide.bs.modal', function (e) {
//     testAnim('fadeOutDownBig');
// })