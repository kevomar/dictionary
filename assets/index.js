const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text"),
  meaningtext = document.querySelector(".meaning .details span"),
  exampletext = document.querySelector(".example .details span"),
  synonymtext = document.querySelector(".synonym .details span");

let audio;

const data = (res, word) => {
  if(res.title) return infoText.innerHTML = `<span>${word}</span> is not found`;
  wrapper.classList.add("active");

  let definitions = res.data[0].meanings[0].definitions[0],
  phonetics = res.data[0].phonetics[0].text;

  document.querySelector(".word .details p").innerHTML = `<span>${word}</span>`;
  document.querySelector("#phone-it-in").innerHTML = phonetics;
  meaningtext.innerHTML = definitions.definition
  exampletext.innerHTML = definitions.example

  if(definitions.synonyms[0]===undefined){
    synonyms.parentElement.display= "none";
  }else{
      synonyms.parentElement.display= "block";
      synonyms.innerHTML = "";
      for(let syn in synonyms){
        let tag = `<span onclick=searc(${definitions.synonyms[syn]})>${definition.synonyms[syn]}</span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }

  }


}

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  axios
    .get(url)
    .then((res) => data(res, word))
    .catch((err) => infoText.innerHTML = `<span>${word}</span> is not found`);
}

//detect when the enter key is pressed
searchInput.addEventListener("keyup", (e) => {
  if(e.key === "Enter" && e.target.value){
    fetchApi(e.target.value);
  }
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.innerHTML = "Type a word and press enter";
});
