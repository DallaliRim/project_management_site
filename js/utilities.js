//Rim Dallali
//This function is going to be called often in order to always get the latest version of the form inputs
function updateInputs() { 
    let projid = document.querySelector("#projectid");
    let owner = document.querySelector("#ownername");
    let title =  document.querySelector("#title");
    let category = document.querySelector("#category");
    let status = document.querySelector("#status");
    let hours = document.querySelector("#hours");
    let rate = document.querySelector("#rate");
    let description = document.querySelector("#description");
    let editImg = document.createElement('img');
    editImg.src = '../images/edit_button.png';
    let trashImg = document.createElement('img');
    trashImg.src = '../images/trash_can.png';

    return {"projid" : projid, 
            "owner" : owner, 
            "title" : title, 
            "category" : category, 
            "status" : status, 
            "hours" : hours, 
            "rate" : rate, 
            "description" : description, 
            "editImg" : editImg, 
            "trashImg" : trashImg
    };
}

/**
 * @param {number} success_count 
 */
//Rim Dallali
//This function enables and disables the add button depending on the amount of valid fields
function enable_disable_button(success_count) {
    let addButton = document.querySelector("#add-button");
        addButton.disabled = (success_count != 8);
}

//Rim Dallali
//This function validates the field inputs from the form depending on reggex patterns by displaying a feedback text, and an appropriate icon.
function validateElement() { 
    let icon = document.querySelectorAll(".feedback-sign");
    let input = document.querySelectorAll(".field-input");
    let feedbackText = document.querySelectorAll(".feedback-text");
    let success_count = 0;
    try {
        for ( let position = 0 ; position < input.length ; position++) {
            if (input[position].value.match(patternCheck_array[position])) {
                feedbackText[position].textContent = "";
                icon[position].src = '../images/success_check.png';
                input[position].parentElement.appendChild(icon[position]);
                success_count++;
            }
            else {
                feedbackText[position].textContent = 'wrong format for ' + input[position].id + '...';
                icon[position].src = '../images/error_sign.png';
                input[position].parentElement.appendChild(icon[position]);
            }
        }
        enable_disable_button(success_count);
    }
    catch(TypeError) {
        throw 'icon array and field inputs array are not of the same length when they are supposed to be!';
    }
}

//Rim Dallali
//This function removes the validation feedback from each field input from the form
function resetValidation() {
    let icon = document.querySelectorAll(".feedback-sign");
    let inputs = document.querySelectorAll(".field-input");
    let feedbackText = document.querySelectorAll(".feedback-text");
    try {
        for ( let position = 0 ; position < inputs.length ; position++) {
            feedbackText[position].textContent = "";
            icon[position].src = '../images/blank.png';
            inputs[position].parentElement.appendChild(icon[position]);
        }
        enable_disable_button(0);
    }
    catch(TypeError) {
        throw 'icon array and field inputs array are not of the same length when they are supposed to be!';
    }

}

//Rim Dallali
//This function resets the form inputs values to the default ones
function resetForm() {
    document.querySelector("#reset-button").addEventListener("click", () => {
        let form_inputs = updateInputs();
        for (i=0 ; i < form_inputs.length ; i++) {
            form_inputs[i].value = "";
        }
        resetValidation();
    });
}

/**
 * 
 * @param {number} head 
 */
//Rim Dallali Raagav Prasanna
/*This function is given n being the "position" where the event occurred and proceeds to sort the rows in respect to that position clicked
 until the table is completely sorted, the order of sort changes when the header is being clicked again*/
function sortTable(head) {
    let table = document.querySelector("#table");
    let count = 0;
    let switchingRows = true;
    let direction_sort = "ascending";
    while (switchingRows) {
        switchingRows = false;

        for (var i = 1; i < (table.rows.length - 1); i++) {
            var DoSwitch = false;

            //the two rows that need to be compared
            firstRow = table.rows[i].getElementsByTagName("td")[head];
            secondRow = table.rows[i + 1].getElementsByTagName("td")[head];

            if (direction_sort == "ascending" && firstRow.innerHTML.toLowerCase() > secondRow.innerHTML.toLowerCase()) {
                DoSwitch = true;
                break;
            } else if (direction_sort == "descending" && firstRow.innerHTML.toLowerCase() < secondRow.innerHTML.toLowerCase()) {
                DoSwitch = true;
                break;
            }
        }
        if (DoSwitch) {
            table.rows[i].parentElement.insertBefore(table.rows[i + 1], table.rows[i]);
            switchingRows = true;
            count++;
        } else if (count == 0 && direction_sort == "ascending") {
            direction_sort = "descending";
            switchingRows = true;
        }
    }
}