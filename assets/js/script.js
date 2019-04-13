
let todoNothingStatement = document.querySelector('.todo-nothing-statement');

if(todoNothingStatement.nextElementSibling) {
    todoNothingStatement.classList.add('none');
}

let yetStatement = document.querySelector('.yet-statement');

if(yetStatement.nextElementSibling) {
    yetStatement.classList.add('none');
}

document.getElementById("button-addon2").addEventListener("click", () => {              
    let inputTaskFom = document.forms['input-task-form'];    
    let taskValue = inputTaskFom.elements.newtask.value;
    let task = JSON.stringify({taskValue: taskValue});
    console.log(task);

    let request = new XMLHttpRequest();        
            request.open("POST", "/addtask", true);               
            request.setRequestHeader("Content-Type", "application/json");    
            request.addEventListener("load", function () {  
            window.location.href = "/";
            }, false);
            request.send(task);             

});
        
let ulTodo = document.getElementById('todo');

ulTodo.addEventListener('click', (event) => {
    let buttonToCompleted = event.target.closest('.to-completed');
    let buttonRemove = event.target.closest('.remove');
    let buttonSave = event.target.closest('.save');
    let parent = event.target.closest(".list-group-item");
    

    
    if(buttonToCompleted) {
        let taskId = parent.getAttribute('id');               
        let taskInput = parent.querySelector("input");
        let taskValue = taskInput.getAttribute('value');                  
        let task = JSON.stringify({taskValue: taskValue, taskId: taskId});    
        
        let request = new XMLHttpRequest();        
            request.open("POST", "/completetask", true);               
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function () {        
            window.location.href = "/";
            }, false);

            request.send(task);

    } else if (buttonRemove) {       
        let taskId = parent.getAttribute('id'); 
        let taskid = JSON.stringify({taskId: taskId});        
        
        let request = new XMLHttpRequest();        
            request.open("POST", "/removetasktodo", true);               
            request.setRequestHeader("Content-Type", "application/json"); 
            request.addEventListener("load", function () {          
            window.location.href = "/";
            }, false); 
        
            request.send(taskid);
    
    } else if (buttonSave) {
        let taskId = parent.getAttribute('id');               
        let taskInput = parent.querySelector("input");
        let taskValue = taskInput.value;                          
        let task1 = JSON.stringify({taskValue: taskValue, taskId: taskId});
        console.log(task1);
        // let tasksFieldForm = document.forms['tasks-field-form'];
        // let taskValue = tasksFieldForm.elements.task.value; 
        // let taskId = tasksFieldForm.elements.task.id;           
        // let task = JSON.stringify({taskValue: taskValue, taskId: taskId }); 
        
        let request = new XMLHttpRequest();        
            request.open("POST", "/savetask", true);               
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function () {          
            window.location.href = "/";
            }, false);

            request.send(task1);
    }
}, false);


let ulTodoCompleted = document.getElementById('completed');

ulTodoCompleted.addEventListener('click', (event) => {
    let buttonToNew = event.target.closest('.to-new');
    let buttonRemoveCompleted = event.target.closest('.remove-completed');
    let parent = event.target.closest(".list-group-item");

    if(buttonToNew) {  
        let taskIdCompleted = parent.getAttribute('id');               
        let taskInput = parent.querySelector("input");
        let taskValueCompleted = taskInput.getAttribute('value');                  
        let taskAgain = JSON.stringify({taskValueCompleted: taskValueCompleted, taskIdCompleted: taskIdCompleted});      
        console.log(taskAgain);
         
        let request = new XMLHttpRequest();        
            request.open("POST", "/addtaskback", true);               
            request.setRequestHeader("Content-Type", "application/json"); 
            request.addEventListener("load", function () {          
            window.location.href = "/";
            }, false);
    
        request.send(taskAgain);

    } else if (buttonRemoveCompleted) {        
        let taskId = parent.getAttribute('id');      
        let taskid = JSON.stringify({taskId: taskId});
        
        let request = new XMLHttpRequest();        
            request.open("POST", "/removetaskcompleted", true);               
            request.setRequestHeader("Content-Type", "application/json"); 
            request.addEventListener("load", function () {          
            window.location.href = "/";
            }, false); 

        request.send(taskid);
    }
});


// function hasClass(elem, className) {
//     return elem.classList.contains(className);    
// }

// document.addEventListener('click', function () {     
//     if (hasClass(e.target, '.className')) {        
//         console.log("Hello world!");                
//             

//     } else if (hasClass(e.target, '.className')){        
//         console.log("Hello world again!"); 
//     } 
// }, false);


