
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
            window.location.href = "http://localhost:3000/";
            }, false);
            request.send(task);             

});
        
let ulTodo = document.getElementById('todo');

ulTodo.addEventListener('click', (event) => {
    let buttonToCompleted = event.target.closest('.to-completed');
    let buttonRemove = event.target.closest('.remove');
    let buttonSave = event.target.closest('.save');
    
    if(buttonToCompleted) {               
        let tasksFieldForm = document.forms['tasks-field-form'];
        let taskValue = tasksFieldForm.elements.task.value; 
        let taskId = tasksFieldForm.elements.task.id;           
        let task = JSON.stringify({taskValue: taskValue, taskId: taskId });
        // let taskid = JSON.stringify({taskId: taskId});             

        let request = new XMLHttpRequest();        
            request.open("POST", "/completetask", true);               
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function () {          
            window.location.href = "http://localhost:3000/";
            }, false);

            request.send(task);

    } else if (buttonRemove) {        
        let tasksFieldForm = document.forms['tasks-field-form'];
        // let taskValue = tasksFieldForm.elements.task.value;
        let taskId = tasksFieldForm.elements.task.id; 
        let taskid = JSON.stringify({taskId: taskId});
        // let task = JSON.stringify({taskValue: taskValue});
        
        let request = new XMLHttpRequest();        
            request.open("POST", "/removetasktodo", true);               
            request.setRequestHeader("Content-Type", "application/json"); 
            request.addEventListener("load", function () {          
            window.location.href = "http://localhost:3000/";
            }, false); 
        
            // request.send(task);
            request.send(taskid);
    
    } else if (buttonSave) {
                let tasksFieldForm = document.forms['tasks-field-form'];
                let taskValue = tasksFieldForm.elements.task.value; 
                let taskId = tasksFieldForm.elements.task.id;           
                let task = JSON.stringify({taskValue: taskValue, taskId: taskId }); 
                
                let request = new XMLHttpRequest();        
                    request.open("POST", "/savetask", true);               
                    request.setRequestHeader("Content-Type", "application/json");
                    request.addEventListener("load", function () {          
                    window.location.href = "http://localhost:3000/";
                    }, false);

                    request.send(task);
    }
}, false);


let ulTodoCompleted = document.getElementById('completed');

ulTodoCompleted.addEventListener('click', (event) => {
    let buttonToNew = event.target.closest('.to-new');
    let buttonRemoveCompleted = event.target.closest('.remove-completed');

    if(buttonToNew) {        
        let tasksFieldFormCompleted = document.forms['tasks-completed-form'];
        let taskValueCompleted = tasksFieldFormCompleted.elements.completetask.value;
        let taskIdCompleted = tasksFieldFormCompleted.elements.completetask.id;    
        let taskAgain = JSON.stringify({taskValueCompleted: taskValueCompleted, taskIdCompleted: taskIdCompleted});   
    
        let request = new XMLHttpRequest();        
            request.open("POST", "/addtaskback", true);               
            request.setRequestHeader("Content-Type", "application/json"); 
            request.addEventListener("load", function () {          
            window.location.href = "http://localhost:3000/";
            }, false);
    
        request.send(taskAgain);

    } else if (buttonRemoveCompleted) {
        let tasksFieldFormCompleted = document.forms['tasks-completed-form'];        
        // let taskValueCompleted = tasksFieldFormCompleted.elements.completetask.value;
        // let taskAgain = JSON.stringify({taskValueCompleted: taskValueCompleted});
        let taskId = tasksFieldFormCompleted.elements.completetask.id; 
        let taskid = JSON.stringify({taskId: taskId});
        
        let request = new XMLHttpRequest();        
            request.open("POST", "/removetaskcompleted", true);               
            request.setRequestHeader("Content-Type", "application/json"); 
            request.addEventListener("load", function () {          
            window.location.href = "http://localhost:3000/";
            }, false); 

        // request.send(taskAgain);
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


