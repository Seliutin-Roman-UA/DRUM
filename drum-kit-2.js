function myfoo(recordset) {
  const music = {};
  const source = recordset.querySelectorAll(".key__item");
  [...source].forEach((node) => {
    music[node.dataset.key] = node.dataset.src;
  });
  music.playSoud = function (item) {
    if (!item.dataset.src) return;
    audioRef.src = music[item.dataset.key];
    audioRef.currentTime = 0;
    audioRef.play();
  };
  return music;
}

// ПЕРЕМЕННІЕ
const itemsListRef = document.querySelector(".js-key__list");
const audioRef = document.querySelector(".audio");
const music = myfoo(itemsListRef);
console.log("OBJECT MUSIC = ", music);

const removeActiveClass = (event) => {
  if (event.propertyName !== "transform") return;
  event.target.classList.remove("playing");
};

function addActiveClass(item) {
  item.classList.add("playing");
}

// КОЛБЕКИ ОБРАБОТЧИКОВ СОБЫТИЙ
const onItemClick = (event) => {
  const item = event.target.closest(".key__item");
  music.playSoud(item);
  addActiveClass(item);
};

const onKeyBoardPress = (event) => {
  const item =
    document.querySelector(`li[data-key="${event.keyCode}"]`) || itemsListRef; 
  music.playSoud(item);
  addActiveClass(item);
};

// ОБРАБОТЧИКИ СОБІТИЙ

itemsListRef.addEventListener("click", onItemClick);
document.addEventListener("keydown", onKeyBoardPress);
itemsListRef.addEventListener("transitionend", removeActiveClass);
