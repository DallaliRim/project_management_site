let all_projects_arr = new Array();
let keys_list = ['projid', 'owner', 'title', 'category', 'status', 'hours', 'rate', 'description'];
let patternCheck_array = ["[aA-zZ]{4}[0-9]{1,}", "[aA-zZ]{3,}", "[aA-zZ]{3,}", "^((?!default\-dashes).)*$", "[0-9]", "[0-9]", "^((?!default\-dashes).)*$", "[aA-zZ]{3,}"];
let head_array = ["#projid_head", "#owner_head", "#title_head", "#category_head", "#status_head", "#hours_head", "#rate_head", "#description_head"];

addEventListener("load", () => {
    createProjectObject();
    clearAllProjectsFromStorage();
    saveAllProjects2Storage();
    appendAllProjects2Storage();
    readAllProjectsFromStorage();
    filterProjects();
    resetForm();
    try {
        for(let i = 0 ; i < keys_list.length ; i++) {
            document.querySelector(head_array[i]).addEventListener("click", () => sortTable(i));
        }
    } catch (TypeError){
        throw 'Keys_list array and head_array are not of the same length when they are supposed to be!';
    }

});