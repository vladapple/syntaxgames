let cards = document.querySelectorAll(".card");
let lists = document.querySelectorAll(".listitems");

cards.forEach((card) => {
  registerEventsOnCard(card);
});

lists.forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    let draggingCard = document.querySelector(".dragging");
    let cardAfterDraggingCard = getCardAfterDraggingCard(list, e.clientY);
    if (cardAfterDraggingCard) {
      cardAfterDraggingCard.parentNode.insertBefore(
        draggingCard,
        cardAfterDraggingCard
      );
    } else {
      list.appendChild(draggingCard);
    }
  });
});

function getCardAfterDraggingCard(list, yDraggingCard) {
  let listCards = [...list.querySelectorAll(".card:not(.dragging)")];

  return listCards.reduce(
    (closestCard, nextCard) => {
      let nextCardRect = nextCard.getBoundingClientRect();
      let offset = yDraggingCard - nextCardRect.top - nextCardRect.height / 2;

      if (offset < 0 && offset > closestCard.offset) {
        return { offset, element: nextCard };
      } else {
        return closestCard;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function registerEventsOnCard(card) {
  card.addEventListener("dragstart", (e) => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", (e) => {
    card.classList.remove("dragging");
  });
}

//-------------------------------------

const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

// Add item to Column List
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const inele = document.createElement("div");
  inele.textContent = itemText;
  inele.classList.add("title");

  const outele = document.createElement("div");
  outele.classList.add("card");
  outele.setAttribute("draggable", true);
  outele.appendChild(inele);

  registerEventsOnCard(outele);

  if (column == "0") {
    const listitem = document.getElementById("todo");
    listitem.appendChild(outele);
  } else if (column == "1") {
    const listitem = document.getElementById("progress");
    listitem.appendChild(outele);
  } else if (column == "2") {
    const listitem = document.getElementById("review");
    listitem.appendChild(outele);
  } else {
    const listitem = document.getElementById("complete");
    listitem.appendChild(outele);
  }
  addItems[column].textContent = "";
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addToColumn(column);
}

// Remove item from column list
function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev, n) {
  ev.preventDefault();
  let draggingCard = document.querySelector(".dragging");

  if (n == "0") {
    const listitem = document.getElementById("todo");
    listitem.removeChild(draggingCard);
  } else if (n == "1") {
    const listitem = document.getElementById("progress");
    listitem.removeChild(draggingCard);
  } else if (n == "2") {
    const listitem = document.getElementById("review");
    listitem.removeChild(draggingCard);
  } else {
    const listitem = document.getElementById("complete");
    listitem.removeChild(draggingCard);
  }
}
