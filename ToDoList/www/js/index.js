window.onload = function()
{
    const addButton = document.getElementById('addButton');
    const resetButton = document.getElementById('resetButton');

    addButton.onclick = addTask;
    resetButton.onclick = resetList;
}

// function addTask(){
//     const task = document.getElementById('task');
//     const taskList = document.getElementById('taskList');

//     if(task.value){
//         let newItem = document.createElement('li');
//         newItem.innerHTML = task.value;

//         $(newItem).on('swiperight', function(){
//             $(this).toggleClass('done');
//         });

//         $(newItem).on('swipeleft', function(){
//             $(this).hide('slow',function(){
//                 $(this).remove();
//             });
//         });

//         taskList.appendChild(newItem);
//         $(taskList).listview('refresh');
//         newItem:innerHTML = '';
//     }
// };

// function resetList(){
//   taskList.innerHTML = '';
// };


function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function addTask() {
  const task = document.getElementById("task");
  const taskList = document.getElementById("taskList");
  const taskDoneList = document.getElementById("taskDoneList");

  if (task.value) {
    let newItem = document.createElement("li");
    newItem.innerHTML = task.value;

    $(newItem).on("swiperight", function () {
      $(this).toggleClass("done");
      if ($(this).hasClass("done")) {
        taskDoneList.appendChild(this);
      } else {
        taskList.appendChild(this);
      }
    });

    $(newItem).on("swipeleft", function () {
      $(this).hide("slow", function () {
        $(this).remove();
      });
    });

    taskList.appendChild(newItem);
    $(taskList).listview("refresh");
    task.value = "";
  }
}
function resetList(){
  taskList.innerHTML = '';
  taskDoneList.innerHTML = '';
};