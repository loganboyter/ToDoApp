var myApp = {};
myApp.toDoList = [];

myApp.inputReader = function (locationId,text) {
    "use strict"
    if (text=="") {
        document.getElementById(locationId).value = text;
    } else { return document.getElementById(locationId).value; }
};

myApp.divWriter = function (locationId, text) {
    "use strict"
    document.getElementById(locationId).innerHTML = text;
};

var ToDo = function (task) {
    "use strict"
    this.task = task;
    this.dayStarted = moment().format("dddd MMMM Do, YYYY, h:mm:ss a")
};


ToDo.prototype.status = "active";
ToDo.prototype.dayCompleted = "Not Yet Completed";
ToDo.prototype.timeElapsed = "Not Yet Completed";


myApp.drawToDoList = function () {
    "use strict"
    var startTime, endTime, difference,units,o;
    var holder = "<table class='table table-hover'><header><tr><td>Task</td><td>Time Started</td><td>Time Completed</td><td>Elapsed Time</td></tr></header>";
    var status = "";
    for (var i in myApp.toDoList) {
        startTime = moment(myApp.toDoList[i]['dayStarted'], "dddd MMMM Do, YYYY, h:mm:ss a");
        endTime = moment(myApp.toDoList[i]['dayCompleted'], "dddd MMMM Do, YYYY, h:mm:ss a");

        if (endTime.isValid()) {
            units = "years";
            o = 0
            difference = 0;
            while(difference < 1) {
                if (o === 0) {
                    units = "years";
                } else if (o === 1) {
                    units = "months";
                } else if (o === 2) {
                    units = "weeks";
                } else if (o === 3) {
                    units = "days";
                } else if (o === 4) {
                    units = "hours";
                } else if (o === 5) {
                    units = "minutes";
                } else if (o === 6) {
                    units = "seconds";
                } else break;
                difference = endTime.diff(startTime, units);
                o++
                
            }
        }
        holder += "<tr class='" + myApp.toDoList[i].status + "' onclick='myApp.completeTask(" + i + ");'>"
        if (units) {
            if (difference === 1) {
                units = units.slice(0, units.length - 1);

            }
            myApp.toDoList[i].timeElapsed = "Completed in ~" + difference + " " + units + "."
            units = "";
            endTime = "";
        }
        for (var j in myApp.toDoList[i]) {
            if (j === "status") { continue };
            holder += "<td>" + myApp.toDoList[i][j] + "</td>";
        }
        holder += "</tr>";
    }
    holder += "</table>";
    myApp.divWriter("output", holder);
};


myApp.addTask = function (task) {
    "use strict"
    if (!task) { return };
    var newTask = new ToDo(task);
    myApp.inputReader("todo", "");
    myApp.toDoList.push(newTask);
    myApp.drawToDoList();
};

myApp.completeTask = function (index) {
    "use strict"
    if (this.toDoList[index].dayCompleted == "Not Yet Completed") {
        myApp.setButtonVisibility("complete-btn", "");
        myApp.setButtonVisibility("incomplete-btn", "none");
        document.getElementById('hidden-input').value = index;
        $('#complete').modal('toggle');
    }
    else {
        myApp.setButtonVisibility("incomplete-btn", "");
        myApp.setButtonVisibility("complete-btn", "none");
        document.getElementById('hidden-input').value = index;
        $('#complete').modal('toggle');
    }
};

myApp.removeTask = function (index, remove) {
    "use strict"
    this.toDoList.splice(index, 1);
    $('#complete').modal('hide');
    myApp.drawToDoList();
}

myApp.setComplete = function (index) {
    "use strict"
    this.toDoList[index].status = "success";
    this.toDoList[index].dayCompleted = moment().format("dddd MMMM Do, YYYY, h:mm:ss a");
    $('#complete').modal('hide');
    myApp.drawToDoList();
}


myApp.setIncomplete = function (index) {
    "use strict"
    this.toDoList[index].status = "active";
    this.toDoList[index].dayCompleted = "Not Yet Completed";
    this.toDoList[index].timeElapsed = "Not Yet Completed";
    $('#complete').modal('hide');
    myApp.drawToDoList();
}

myApp.setButtonVisibility = function (locationId, display) {
    "use strict"
    document.getElementById(locationId).style.display = display;
}


/*myApp.hideList = function () {
    console.log('ok');
    $("#output").toggle("slide", { direction: "right" });
}*/

$('#output').draggable({
    revert: 'invalid',
})


myApp.Seed = function() {
    myApp.addTask("Do something");
    myApp.addTask("Do something else");
    myApp.addTask("Do another thing");
    myApp.addTask("Do more things");
}

myApp.Seed();