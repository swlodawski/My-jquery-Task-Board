// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

let tasks = [];

function compareDates(dueDate) {
  const formattedDueDate = dayjs(dueDate);

  if (formattedDueDate.isTomorrow() || formattedDueDate.isToday()) {
    return { cardBg: 'bg-warning', btnborder: null };
  }
  if (formattedDueDate.isSameOrBefore()) {
    return { cardBg: 'bg-danger test-white', btnBorder: 'border-white'} ;
  }
    return { cardBg: null, btnBorder: null };
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
   return Math.floor(Math.random() * 100000).toString();
}

// Todo: create a function to create a task card
function createTaskCard(
  {id, taskTitle, taskDueDate, taskDescription},
  isDone
) {

  const newTaskCard = $(
    `<div class='card task-card mb-3 draggable ${!isDone && compareDates(taskDueDate).cardBg}
    'data-task='${id}'>`
  );

  newTaskCard.html(`<h4 class='card-header'>${taskTitle}</h4>
    <div class='card-body'>
      <p>${taskDescription}</p>
      <p>${dayjs(taskDueDate).format('MM/DD/YYYY')}</p>
      <button class='btn btn-danger' 
      ${!isDone && compareDates(taskDueDate).btnBorder}'>Delete</button>
    </div>
    `);
  
    newTaskCard.find('button').on('click', handleDeleteTask);
    return newTaskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards').html('');
  $('#in-progress-cards').html('');
  $('#done-cards').html('');

  tasks.forEach((task) => {
    if (task.status === 'to-do') {
      $('#todo-cards').append(createTaskCard(task, false));
    }
    if (task.status === 'in-progress') {
      $('#in-progress-cards').append(createTaskCard(task, false));
    }
    if (task.status === 'done') {
      $('#done-cards').append(createTaskCard(task, true));
    }
  });


  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
      ? $(e.target)
      : $(e.target).closest('.ui-draggable');

      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  const form = event.target;
  $(form).addClass('was-validated');

  if (!form.checkValidity()){
    return;
  }

  const taskTitle = $(event.target).find('input')[0].value;
  const taskDueDate = $(event.target).find('input')[1].value;
  const taskDescription = $(event.target).find('input')[2].value;
  const newTask = {
    id: generateTaskId(),
    taskTitle,
    taskDueDate,
    taskDescription,
    status: 'to-do',
  };

  tasks.push(newTask);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTaskList();
 
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const deleteCardId = $(event.target).parent().parent()[0].dataset.task;
  tasks = tasks.filter((task) => {
    return task.id !== deleteCardId;
});

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable[0].dataset.task;

  const newStatus = event.target.id;

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
 $('#taskForm').on('submit', handleAddTask);

 $(function (){
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
 });

  if (!taskList) {
    tasks = [];
    return;
  }

  tasks = taskList;
  renderTaskList();
});