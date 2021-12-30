//This function creates a project object and adds it to the table every time the add button is clicked
function createProjectObject() {
    resetValidation();
    validationCall();

    document.querySelector("#add-button").addEventListener("click", (event) => {
        event.preventDefault();
        let form_inputs = updateInputs();
        all_projects_arr.push(form_inputs);
        let editImg = Object.values(form_inputs)[8];
        let trashImg = Object.values(form_inputs)[9];
            
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let i = 0; i < 10 ; i++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
            if (i == 8) {
                cell.appendChild(editImg);
                editImg.setAttribute("class","editImg");
                editImg.addEventListener("click",  editTableRow.bind(null, row));
            }   else if (i == 9) {
                cell.appendChild(trashImg);
                trashImg.setAttribute("class","trashImg");
                trashImg.addEventListener("click", deleteTableRow);
            }   else {
                cell.innerHTML = Object.values(form_inputs)[i].value;
                cell.setAttribute("index", i);
                cell.setAttribute("class", "cells")
            }
        }
        document.querySelector("#caption-table").innerHTML = document.querySelector("#projectid").value + " has been added to the table";
    });
}

//This function cadds an even listener to the fields input so that every time they change (event occurs) the validation shows up along with the feedback text
function validationCall() {
    let inputs = document.querySelectorAll(".field-input");
    inputs.forEach(input => {
        input.addEventListener("change", validateElement);
    });
}

/*This function deletes the project (row) from the table depending on which trash can image the user clicked on, it automatically 
updates on the local storage as well since it is built from the table */
function deleteTableRow() { 
    if (confirm('Are you sure you want to delete project ?')) {
        let trow = this.parentElement.parentElement;
        document.querySelector("#caption-table").innerHTML = trow.cells[0].textContent + " has been deleted from the table";
        trow.remove();
        alert('The project has been deleted');
        all_projects_arr.splice(trow.getAttribute("index"), 1);      
    }   else {
        alert('The project has NOT been deleted');
    }
}

/**
 * @param {HTMLElement} trow
 * this function allows the wanted row that the user clicked on to be edited and allow new input form the 
 * user on the specific row. it automatically updates on the local storage as well since it is built from the table */
function editTableRow(trow) {
    if(trow.cells[8].firstChild.className == "saving-sign"){ 
        stopEditTableRow(trow);
    } else {
        let cell = trow.cells;
        document.querySelector("#caption-table").innerHTML = "editing " + trow.cells[0].innerHTML;
        for(let i = 0 ; i < 8 ; i++) {
            let inputCell = document.createElement('input');
            inputCell.value = cell[i].innerHTML;
            cell[i].innerHTML = '';
            cell[i].appendChild(inputCell);
        }
        cell[8].firstChild.innerHTML='';
        cell[8].firstChild.setAttribute("src", "../images/saving.png");
        cell[8].firstChild.setAttribute("class", "saving-sign");
        cell[8].firstChild.removeEventListener("click", editTableRow);
    } 
}
/**
 * @param {HTMLElement} trow 
 * Depending on whether the passed row is being edited or not, this function allows the new inputs to be saved to the table and local storage
 and the images of the edit button to be changes. it automatically updates on the local storage as well since it is built from the table */
function stopEditTableRow(trow) {
    let cell = trow.cells;
    let new_values_arr = [];
        for(let i = 0 ; i < 8 ; i++) {
            new_values_arr.push(cell[i].firstChild.value);
        }
        for(let i = 0 ; i < 8 ; i++) {
            cell[i].innerHTML = new_values_arr[i];
        }
        cell[8].firstChild.setAttribute("src", "../images/edit_button.png");
        cell[8].firstChild.setAttribute("class", "editImg");
        document.querySelector("#caption-table").innerHTML = trow.cells[0].textContent + "'s changes have been saved";
}

//This function clears all projects from the local storage when the clear local button is being clicked
function clearAllProjectsFromStorage() {
    document.querySelector("#clear-local-button").addEventListener("click", () => {
        if (confirm('Are you sure you want to clear all projects from storage ?')) {
            localStorage.clear();
            alert('The storage has been cleared');
            document.querySelector("#caption-table").innerHTML = "All projects have been removed from local storage";
        } else {
            alert('The storage has not been cleared');
        }
    });
}

// Saves all projects in the current table to local storage while overwriting whatever is in the local Storage
function saveAllProjects2Storage() { 
    let button = document.querySelector("#save-button");
    button.addEventListener("click", () => {
        let cur_tab = document.querySelector("#table");
        if(cur_tab.rows.length >= 2) {
            localStorage.clear();
            alert("saving");
            let retArr = all_projects_arr;
            let allKeys = Object.keys(retArr[0]);
            allKeys.splice(8, 2);
            for(let i =1; i<cur_tab.rows.length; i++) {
                for(let j =0; j<allKeys.length; j++) {
                    retArr[i-1][allKeys[j]] = cur_tab.rows[i].cells[j].textContent;
                }
            }
            // if the length of the array and number of rows isnt the same, empty objects will be 
            //added to the local storage, hence these objects need to be spliced out of the array
            if(retArr.length != (cur_tab.rows.length -1) ) {
                retArr.splice(cur_tab.rows.length -1, ( (retArr.length) - (cur_tab.rows.length -1) ) );
            }
            localStorage.setItem('data_table' , JSON.stringify(retArr));
            document.querySelector("#caption-table").innerHTML = "Projects have been saved to the local storage";
        } else {
            if (confirm('The table is empty, if you confirm your choice, the storage will be cleared')) {
                localStorage.clear();
            } else {
                alert("Please add a project to the table ")
            };
        }            
    });
}

// Takes all the projects from the localStorage and appends it to the table
function readAllProjectsFromStorage() {
    let button = document.querySelector('#local-button');
    button.addEventListener('click', () => {
        if(localStorage.getItem('data_table') === null) {
            alert('Local Storage is empty, please add a project before reading.');
        } else {
            alert('loading projects from storage...');
            let temp_projects = JSON.parse(localStorage.getItem('data_table'));
            let cur_tab = document.querySelector("#table");
            for(let i = 0; i < temp_projects.length; i++) {
                let row = document.createElement('tr');
                cur_tab.appendChild(row);
                for (let j = 0; j < 10 ; j++) {
                    let cell = document.createElement('td');
                    row.appendChild(cell);
                    // adds edit functionality to row
                    if (j == 8) {
                        let editImg = document.createElement('img');
                        editImg.src = '../images/edit_button.png';
                        cell.appendChild(editImg);
                        editImg.setAttribute("class","editImg");
                        editImg.addEventListener("click", editTableRow.bind(null, row));
                    }
                    // adds delete functionality to row 
                    else if (j == 9) {
                        let trashImg = document.createElement('img');
                        trashImg.src = '../images/trash_can.png';
                        cell.appendChild(trashImg);
                        trashImg.addEventListener("click", deleteTableRow);
                    }
                    // adds every other cell in row 
                    else {
                        cell.innerHTML = temp_projects[i][keys_list[j]];
                        cell.setAttribute("index" , j);
                        cell.setAttribute("class" , "cells");
                    }
                }
                all_projects_arr.push(temp_projects[i]);
            } 
            document.querySelector("#caption-table").innerHTML = "Local storage is being read to the user";
        }
    });
}

// Reactivley filters the table based on input in the query bar
function filterProjects() {
    let search_bar = document.querySelector('#query-search');
    search_bar.addEventListener("input", () => {
        let cur_tab = document.querySelector('#table');
        let existsCount = 0;
        // resetting css for rows
        for(let i =0; i<cur_tab.rows.length; i++) {
            cur_tab.rows[i].style.visibility = "visible";
        }
        let hideRow = true;
        let exists = false;
        for(let i = 1; i<cur_tab.rows.length;i++) {
            hideRow = true;
            for(let j=0; j<cur_tab.rows[i].cells.length - 2; j++) {
                if(cur_tab.rows[i].cells[j].textContent == search_bar.value) {
                    hideRow = false;
                    exists = true;
                    existsCount++;
                }
            }
            if(hideRow == true) {
                cur_tab.rows[i].style.visibility = "collapse";
            }
        }
        //updating the status bar
        if (existsCount == 0) {
            document.querySelector("#caption-table").innerHTML = " no projects match the specified filter";
        } else {
            document.querySelector("#caption-table").innerHTML = "Filter is showing " + existsCount +  " projects ";
        }
        // resetting css for rows
        if(exists == false) {
            for(let i =0; i<cur_tab.rows.length; i++) {
                cur_tab.rows[i].style.visibility = "visible";
            }
        }
    });
}

// Takes the projects from the table and appends them to local Storage.
function appendAllProjects2Storage() {
    let button = document.querySelector("#append-button");
    button.addEventListener("click" , () => {
        let cur_tab = document.querySelector("#table");
        if(localStorage.getItem('data_table') === null) {
            alert('Please press the "Write (save) local" button to save this project in storage');
        } else if(cur_tab.rows.length >= 2) {
            let tempArr = all_projects_arr;
            let allKeys = Object.keys(tempArr[0]);
            allKeys.splice(8, 2);
            for(let i =1; i<cur_tab.rows.length; i++) {
                for(let j =0; j<allKeys.length; j++) {
                    tempArr[i-1][allKeys[j]] = cur_tab.rows[i].cells[j].textContent;
                }
            }
            // if the length of the array and number of rows isnt the same, empty objects will be added 
            // to the local storage, hence these objects need to be spliced out of the array
            if(tempArr.length != (cur_tab.rows.length -1) ) {
                tempArr.splice(cur_tab.rows.length -1, ( (tempArr.length) - (cur_tab.rows.length -1) ) );
            }
            let retArr = JSON.parse(localStorage.getItem('data_table'));
            for(let i = 0; i<tempArr.length; i++) {
                retArr.push(tempArr[i]);
            }
            localStorage.setItem('data_table' , JSON.stringify(retArr));
            document.querySelector("#caption-table").innerHTML = "Projects have been appended to the local storage";
        } else {
            alert("Please add a project to the table");
        }
    });
}