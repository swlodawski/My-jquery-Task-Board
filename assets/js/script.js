// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const formModal = document.getElementById('formModal');
const tasks = [];




// Todo: create a function to generate a unique task id
function generateTaskId() {
   return Math.floor(Math.random * 100000).toString();
  
}

// Todo: create a function to create a task card
function createTaskCard({id, taskTitle, taskDueDate, taskDescription},
        isDone
) {
    const newTaskCard = $(
        `<div class='card task-card mb-3 draggable $(!isDone && compareDates(taskDueDate).cardBg}'data-task='${id}'>`
    );

    newTaskCard.html(`<h4 class='card-header'>${taskTitle}</h4>
        <div class='card-body'>
            <p>${taskDescription}</p>
            <p>${dayjs(taskDescription).format('MM/DD/YYYY')}</p>
            <button class='btn btn-danger'
            ${!isDone && compareDates(taskDueDate).btnBorder}'>Delete</button>

        </div>
    `);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
$('#todo-card').html('');
$('#in-process-cards').html('');
$('#done-cards').html('');

tasks.forEach((task) => {
    if(task.status === 'to-do') {
        $('#todo-card').append(createTaskCard(task, false))
    if(task.status === 'in-process') {
        $('#in-process-card').append(createTaskCard(task, false))
    }
    if(task.status === 'done') {
        $('#done-card').append(createTaskCard(task, false))
    }
    }
} )
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
