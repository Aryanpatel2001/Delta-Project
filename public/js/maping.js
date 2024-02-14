// let allkeyword = [listing.title];
// const resultbox = document.querySelector(".result-box");
// const inputbox = document.getElementById("input-box");

// inputbox.onkeyup = function () {
//   let result = [];
//   let input = inputbox.value;
//   if (input.length) {
//     result = allkeyword.filter((keyword) => {
//       return keyword.toLowerCase().includes(input.toLowerCase());
//     });
//   }
//   display(result);

//   if (!result.length) {
//     resultbox.innerHTML = "";
//   }
// };

// function display(result) {
//   const content = result.map((list) => {
//     return "<a onclick=selectInput(this)>" + list + "</a>";
//   });
//   resultbox.innerHTML = "<a>" + content.join("") + "</a>";
// }

// function selectInput(list) {
//   inputbox.value = list.innerHTML;
//   resultbox.innerHTML = "";
// }

let allkeyword = [
  "Modern Loft in Downtown",
  "Mountain Retreat",
  "Historic Villa in Tuscany",
  "Secluded Treehouse Getaway",
  "Beachfront Paradise",
];
const resultbox = document.querySelector(".result-box");
const inputbox = document.getElementById("input-box");
const button = document.querySelector("search-button");

inputbox.onkeyup = function () {
  let result = [];
  let input = inputbox.value;
  if (input.length) {
    result = allkeyword.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  }
  display(result);

  if (!result.length) {
    resultbox.innerHTML = "";
  }
};

function display(result) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });
  resultbox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function selectInput(list) {
  inputbox.value = list.innerHTML;
  resultbox.innerHTML = "";
}

// function selectInput(this){
// inputbox.value = list.innerHTML;
// resultbox.innerHTML = '';
// }
