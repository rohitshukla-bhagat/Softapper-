// Initializing the variables
const input = document.querySelector(".todo input");
const btn = document.querySelector(".add");
const error = document.querySelector(".last-msg");
const lists = document.querySelector(".lists");
const countmsg = document.querySelector(".msg-num");
let contHeight = document.querySelector(".container");
let countTask = 0;

// Initializing The Array Of Local Storage
let localStorageGetElem = [];

// Main Funtion For Adding The Task First Time
const addTask = () => {
  // Condition checking is the input should not be empty
  const taskname = input.value.trim();
  error.style.display = "none";
  if (!taskname) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }
  // Creating the each list on adding an item
  const task = `<div class="task">
    <div class = "list-front">
    <input type = "checkbox" class = "check-box">
    <span class = "taskname">${taskname}</span>
    </div><div class = "list-end">
    <button class = "edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class = "delete">
    <i class="fa-solid fa-trash"></i>
    </button></div></div>`;

  // Checking the item is not duplicate then push it into localstorage and also show the list
  if (!localStorageGetElem.includes(input.value)) {
    lists.insertAdjacentHTML("beforeend", task);
    localStorageGetElem.push(taskname);
    addLocalStorage(localStorageGetElem);
  } else {
    alert("Duplicate Data Not Allowed !");
  }
  input.value = "";
  countTask++;
  displayCount(countTask);

  // function for delete the particular list if user click on delete icon
  const deleteElement = document.querySelectorAll(".delete");
  deleteElement.forEach((button) => {
    button.onclick = () => {
      localStorageGetElem = getElemLocalStorage();
      const taskName = button.closest(".task").querySelector(".taskname");
      const name = taskName.innerText;
      let indexValue = localStorageGetElem.indexOf(name);
      if (indexValue !== -1) {
        localStorageGetElem.splice(indexValue, 1);
        addLocalStorage(localStorageGetElem);
      }
      button = button.closest(".list-end");
      button.parentNode.remove();
      countTask--;
      displayCount(countTask);
    };
  });
  // function for edit the particular list if user click on edit icon
  const editElement = document.querySelectorAll(".edit");
  editElement.forEach((edit) => {
    edit.onclick = () => {
      const taskName = edit.closest(".task").querySelector(".taskname");
      const name = taskName.innerText;
      localStorageGetElem = getElemLocalStorage();
      let indexValue = localStorageGetElem.indexOf(name);
      if (indexValue !== -1) {
        localStorageGetElem.splice(indexValue, 1);
        addLocalStorage(localStorageGetElem);
      }
      input.value = name;
      edit = edit.closest(".list-end");
      edit.parentNode.remove();
      countTask--;
      displayCount(countTask);
    };
  });
  // function for checkbox for checked the particular list if user check the checkbox
  const check = document.querySelectorAll(".check-box");
  check.forEach((checkItem) => {
    checkItem.addEventListener("change", function () {
      const taskName = checkItem.closest(".task").querySelector(".taskname");
      if (this.checked) {
        taskName.style.textDecoration = "line-through";
        taskName.style.textDecorationColor = "red";
      } else {
        taskName.style.textDecoration = "none";
      }
    });
  });
};
// Fucntion for get the list data from the existing local storage
const getElemLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todoItem")) || [];
};
// Function for show the existing list in the local storage at screen if the page was reload or user cut the page and come back
localStorageGetElem = getElemLocalStorage();
const showLSData = () => {
  localStorageGetElem = getElemLocalStorage();
  countTask = localStorageGetElem.length;
  localStorageGetElem.forEach((todoElem) => {
    const task = `<div class="task">
    <div class = "list-front">
    <input type = "checkbox" class = "check-box">
    <span class = "taskname">${todoElem}</span>
    </div><div class = "list-end">
    <button class = "edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class = "delete">
    <i class="fa-solid fa-trash"></i>
    </button></div></div>`;
    lists.insertAdjacentHTML("beforeend", task);
    // Above Delete function for each list which was take from the local storage
    const deleteElement = document.querySelectorAll(".delete");
    deleteElement.forEach((button) => {
      button.onclick = () => {
        localStorageGetElem = getElemLocalStorage();
        const taskName = button.closest(".task").querySelector(".taskname");
        const name = taskName.innerText;
        let indexValue = localStorageGetElem.indexOf(name);
        if (indexValue !== -1) {
          localStorageGetElem.splice(indexValue, 1);
          addLocalStorage(localStorageGetElem);
        }
        button = button.closest(".list-end");
        button.parentNode.remove();
        countTask--;
        displayCount(countTask);
      };
    });
    // Above Edit function for each list which was take from the local storage
    const editElement = document.querySelectorAll(".edit");
    editElement.forEach((edit) => {
      edit.onclick = () => {
        const taskName = edit.closest(".task").querySelector(".taskname");
        const name = taskName.innerText;
        localStorageGetElem = getElemLocalStorage();
        let indexValue = localStorageGetElem.indexOf(name);
        if (indexValue !== -1) {
          localStorageGetElem.splice(indexValue, 1);
          addLocalStorage(localStorageGetElem);
        }
        input.value = name;
        edit = edit.closest(".list-end");
        edit.parentNode.remove();
        countTask--;
        displayCount(countTask);
      };
    });
    // Above Checkbox function for each list which was take from the local storage
    const check = document.querySelectorAll(".check-box");
    check.forEach((checkItem) => {
      checkItem.addEventListener("change", function () {
        const taskName = checkItem.closest(".task").querySelector(".taskname");
        if (this.checked) {
          taskName.style.textDecoration = "line-through";
          taskName.style.textDecorationColor = "red";
        } else {
          taskName.style.textDecoration = "none";
        }
      });
    });
  });
  displayCount(countTask);
};
// function to adding the list into local storage through an array : ( localStorageGetElem )
const addLocalStorage = (todo) => {
  return localStorage.setItem("todoItem", JSON.stringify(todo));
};
// Function for counting the exiting number of lists
const displayCount = (countTask) => {
  countmsg.innerText = countTask;
};
// Funtion for adding list if the user press enter also
addEventListener("keydown", function (e) {
  pressbtn = e.key;
  if (pressbtn == "Enter") {
    addTask();
  }
});
showLSData();
btn.addEventListener("click", addTask) || e();