let file = []
let current = -3
let toRunList = document.querySelector("#toRunList")

function init() {
    toRunList = document.querySelector("#toRunList")
    checkForUpdate()
    setInterval(checkForUpdate, 5000);
}



function checkForUpdate() {
    console.log('Updating')
    loadJSON(function(response) {
        json = JSON.parse(response)

        if (current != parseInt(json["currentlyRunning"]) && parseInt(json["currentlyRunning"]) <= parseInt(json["amountSubmitted"])) {
            document.querySelector("#currentlyRunning").innerHTML = json["files"][json["currentlyRunning"]]
            current = parseInt(json["currentlyRunning"])
        }
        if (parseInt(json["currentlyRunning"]) > parseInt(json["amountSubmitted"]) || parseInt(json["currentlyRunning"]) == 0) {
            document.querySelector("#currentlyRunning").innerHTML = "Awaiting New Submissions"
        }

        if (file.length != Object.keys(json["files"]).length) {
            console.log(file)
            file = Object.keys(json["files"])
            console.log(file)
            writeList(json["files"], json["currentlyRunning"], json["amountSubmitted"])
        }
    })

}

function writeList(arr, start, end) {
    console.log("writing")
    toRunList.innerHTML = ""
    for (let i = parseInt(start) + 1; i <= parseInt(end); i++) {
        console.log(arr[i])
        toRunList.innerHTML += "<li>" + arr[i] + "</li>"
    }
    //toRunList.innerHTML += "</ol>"
}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'appDataServices' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}