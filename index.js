// What do I want to do?
// Create a studio ghibli API search engine that can
// search based upon
// - title
// - original title (or romanised version)
// - description
// - director
// - producer
// - or characters from the movie

// display matching content in bolded letters maybe with a background
// display in square cards, whole page have a lowered opacity with a lighter tone
// allow users to open modal with all information once clicked upon

let howDoYouLive =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sOn2Y56WJ8rGnZVtzvkdAgHaLH%26pid%3DApi&f=1";
let earwigAndWitch =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.G5-q9GaRG33oL5msdCKe2wAAAA%26pid%3DApi&f=1";
let marnieWasThere =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.QEQx-ySXrzT2_az6QKSYFQHaK0%26pid%3DApi&f=1";

let canvas = document.querySelector("#c1");
let cxt1 = canvas.getContext("2d");
cxt1.fillStyle = "#e9afac";
cxt1.fillRect(250, 15, 40, 20);

let canvas1 = document.querySelector("#c2");
let ctx2 = canvas1.getContext("2d");
ctx2.fillStyle = "#63ada2";
ctx2.fillRect(250, 15, 40, 20);

let canvas2 = document.querySelector("#c3");
let cxt3 = canvas2.getContext("2d");
cxt3.fillStyle = "#2d525b";
cxt3.fillRect(250, 15, 40, 20);

let input = document.querySelector("#searchbar");
let button = document.querySelector("#button");
let main = document.querySelector("main");
let div = document.querySelector("#cards");
let people = [];
let films = [];
let all = [];
const getResults = async (e) => {
  let response = await Promise.all([
    fetch("https://ghibliapi.herokuapp.com/films").then((res) => res.json()),
    fetch("https://ghibliapi.herokuapp.com/people/").then((res) => res.json()),
    fetch("https://ghibliapi.herokuapp.com/locations").then((res) =>
      res.json()
    ),
  ]);
  all = [...response[0], ...response[1], ...response[2]];
  displayResults(response[0], response[1], response[2], all);

};

button.addEventListener("click", getResults);

const displayResults = (films, people, places, all) => {
  let ids = [];
  if (div.innerText === " ") {
    div.removeChild();
  }

  div.innerText = " ";
  div.style.marginTop = "2%";
  div.style.fontSize = "130%";



  for (let i = 0; i < all.length; i++) {
    if (i < 21) {
      if (
        all[i].title.toLowerCase().includes(input.value.toLowerCase()) ||
        all[i].description.toLowerCase().includes(input.value.toLowerCase())
      ) {

        let card = document.createElement("div");
        let title = document.createElement("h2");
        let description = document.createElement("p");
        let director = document.createElement("h4");
        let producer = document.createElement("h4");

        title.innerText = all[i].title;
        description.innerText = all[i].description;
        director.innerText = `Directed by: ${all[i].director}`;

        cards.style.display = "flex";
        cards.style.flexWrap = "wrap";
        cards.style.justifyContent = "space-evenly";
        card.style.backgroundColor = "#e9afac";
        card.style.marginTop = "3%";
        card.style.padding = "3%";
        card.style.width = "20%";

        div.appendChild(card);
        card.appendChild(title);
        card.appendChild(director);
        card.appendChild(producer);
        card.appendChild(description);
        ids.push({ id: all[i].id, name: all[i].title });
      }
    } else if (i > 21 && i < 64) {
      if (all[i].name.toLowerCase().includes(input.value.toLowerCase())) {
        let card = document.createElement("div");
        let name = document.createElement("h2");
        let eyeColor = document.createElement("p");
        let movie = document.createElement("p");

        name.innerText = `${all[i].name} from`;
        eyeColor.innerText = all[i].eye_color;

        for (id of ids) {
          if (all[i].films[0].includes(id.id)) {
            id.character = all[i].name;
            movie.innerText = id.name;
          }
        }

        card.style.backgroundColor = "#63ada2";
        card.style.marginTop = "3%";
        card.style.padding = "3%";
        card.style.width = "20%";

        div.appendChild(card);
        card.appendChild(name);
        card.appendChild(movie);
      }
    } else {

      if (all[i].name.toLowerCase().includes(input.value.toLowerCase())) {
        let card = document.createElement("div");
        let name = document.createElement("h2");
        let climate = document.createElement("p");
        let movie = document.createElement("p");

        name.innerText = `${all[i].name} in the`;
        climate.innerText =` ${all[i].climate} ${all[i].terrain} from `;
    

        for (id of ids) {
          if (all[i].films[0].includes(id.id)) {
            id.character = all[i].name;
            movie.innerText = id.name;
          }
        }

        card.style.backgroundColor = "#2d525b";
        card.style.marginTop = "3%";
        card.style.padding = "3%";
        card.style.width = "20%";

        div.appendChild(card);
        card.appendChild(name);
        card.appendChild(climate);
        card.appendChild(movie);
      }
    }
  }
  
};
