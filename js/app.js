"use strict";

const input = document.querySelector(".container .input-field input");
const button = document.querySelector(".container .input-field button");
const errorText =  document.querySelector(".container .error-text");
const taskList = document.querySelector(".container .task-list");

errorText.textContent = "Please, add a task!";

function displayError() {
    errorText.classList.add("error");
    setTimeout(() => {
        errorText.classList.remove("error");
    }, 2000);
}

function createTask() {
    const list = document.createElement("li");
    const icon = document.createElement("span");
    list.textContent = input.value;
    icon.innerHTML = '\uf057';
    list.appendChild(icon);
    taskList.appendChild(list);
}

function addTask() {
    if(input.value ? createTask() : displayError());
    input.value = "";
    saveTaskToLocalStorage();
}

function saveTaskToLocalStorage() {
    localStorage.setItem("task", taskList.innerHTML);
}

function saveTaskInDocument() {
    taskList.innerHTML = localStorage.getItem("task");
}

taskList.addEventListener("click", function(event) {
    const tag = event.target.tagName;
    
    if(tag === "LI") {
        event.target.classList.toggle("completed");
        saveTaskToLocalStorage();
    }
    else if(tag === "SPAN") {
        event.target.parentElement.remove();
        saveTaskToLocalStorage();
    }
});

input.addEventListener("keydown", function(event) {
    if(event.code === "Enter") {
        addTask();
        this.click();
    }
});

saveTaskInDocument();
button.addEventListener("click", addTask);