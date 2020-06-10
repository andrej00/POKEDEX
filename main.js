var app = new Vue({
  el: "#app",
  data: {
    pokemonData: [],
    filteredPokemonData: [],
    favorites: [],
    clickedPokemon: null,
    imgLoaded: 0,
    pokemonCardsToLoad: 9,
    isLoaded: false,
    showAlert: false,
    showFavorites: false,
    keyword: '',
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
    pokemonStatNames: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
  },
  methods: {
    handleLoad: function () {
      this.imgLoaded++;
      if (this.imgLoaded === this.pokemonCardsToLoad) {
        this.isLoaded = true;
      }
    },

    getBackgroundColor: function (types) {
      type1 = types[0].type.name;
      type2 = types[1] ? types[1].type.name : type1;
      return `linear-gradient(90deg, ${this.typeColor[type1]} 50%, ${this.typeColor[type2]} 50%)`;
    },

    displayFavorites: function () {
      this.showFavorites = true;
    },

    home: function () {
      this.showFavorites = false;
    },

    sortArray: function (sortStat) {
      index = this.pokemonStatNames.indexOf(sortStat);
      this.pokemonData.sort((b, a) => a.stats[index].base_stat - b.stats[index].base_stat);
    },

    addToFavorites: function (pokemon) {
      if (this.favorites.indexOf(pokemon) === -1) {
        this.favorites.push(pokemon);
      }
    },

    clearFavorites: function () {
      window.localStorage.removeItem('favorites');
      this.favorites = [];
    },

    searchPokemon() {
      that = this;
      this.pokemonData = this.filteredPokemonData.filter(function (pokemon) {
        if (pokemon.name.toLowerCase().indexOf(that.keyword.toLowerCase()) !== -1) {
          return pokemon;
        }
      });
    },

    getProgressBarWidth: function (base_stat) {
      return parseInt(base_stat / 1.7) + '%';
    },

    mouseover: function () {
      this.showAlert = true;
    },

    mouseleave: function () {
      this.showAlert = false;
    },
  },

  watch: {
    favorites: {
      // if there is an error with localstorage, disable blocking third-party cookies
      handler() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      },
      deep: true,
    },
  },

  mounted() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  },

  created: function () {
    for (var i = 1; i <= this.pokemonCardsToLoad; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json())
        .then((data) => {
          this.pokemonData.push(data);
        })
    }
    this.filteredPokemonData = this.pokemonData;
  },
});