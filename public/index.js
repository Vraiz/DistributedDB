var currValue = 0

const readData = async (start) => {
    let game = await fetch('/games/:' + start)
    let gamedata = await game.json();
    return gamedata;
}

const getSize = async () => {
    let game = await fetch('/count')
    let gamedata = await game.json();
    return gamedata;
}

const getOne = async (id) => {
    let game = await fetch('/game/:' + id)
    return game;
}

const nextA = document.getElementById("next")
const prevB = document.getElementById("prev")
const searchButton = document.getElementById("search")
const createButton = document.getElementById("create")
var backState = 0

async function displayGame(game){
    $(createButton).html("back");
    backState = 1
    $("#holderDiv").remove();
    let holderDiv = document.createElement("div");
    $(holderDiv).attr('id', 'holderDiv');

    let bool = true
    if (game != null){
        bool = false
        let objDiv = document.createElement("div");

        let delDiv = document.createElement("div");
        $(delDiv).html("delete");
        $(delDiv).addClass("button");
        //Trigger Edit item
        delDiv.addEventListener('click', async () =>{
            await fetch('/games/:' + game.game_id, {
                method: 'delete',
            }).then(response => response.json())
            .then(res => console.log(res))
            location.reload()
        })

        let backDiv = document.createElement("div");
        $(backDiv).html("back");
        $(backDiv).addClass("button");
        //Delete Item
        backDiv.addEventListener('click', async () =>{
            var data = await readData(currValue)
            loadData(data)
        })

        //objData
        $(objDiv).addClass("gameDiv");

        //append Data
        let nameDiv = document.createElement("div");
        $(nameDiv).html(game.name);
        $(nameDiv).addClass("nameDiv");
        $(nameDiv).addClass("infoDiv");
        $(objDiv).append(nameDiv);

        let priceDiv = document.createElement("div");
        $(priceDiv).html(game.price);
        $(priceDiv).addClass("infoDiv");
        $(objDiv).append(priceDiv);

        let dlcCountdiv = document.createElement("div");
        $(dlcCountdiv).html(game.dlc_count);
        $(dlcCountdiv).addClass("infoDiv");
        $(objDiv).append(dlcCountdiv);

        let reqAgeDiv = document.createElement("div");
        $(reqAgeDiv).html(game.required_age);
        $(reqAgeDiv).addClass("infoDiv");
        $(objDiv).append(reqAgeDiv);

        let winSDiv = document.createElement("div");
        $(winSDiv).html((game.windows === 1) ? "true" : "false");
        $(winSDiv).addClass("infoDiv");
        $(objDiv).append(winSDiv);

        let macSDiv = document.createElement("div");
        $(macSDiv).html((game.mac === 1) ? "true" : "false");
        $(macSDiv).addClass("infoDiv");
        $(objDiv).append(macSDiv);

        let linSDiv = document.createElement("div");
        $(linSDiv).html((game.linux === 1) ? "true" : "false");
        $(linSDiv).addClass("infoDiv");
        $(objDiv).append(linSDiv);

        //append Buttons
        $(objDiv).append(backDiv);
        $(objDiv).append(delDiv);
        $(holderDiv).append(objDiv);

    }
    //inputDiv

    let inputDiv = document.createElement('div')
    $(inputDiv).addClass("gameDiv");

    let nameInputDiv = document.createElement('div')
    $(nameInputDiv).addClass("nameDiv");
    $(nameInputDiv).addClass("infoDiv");  
    var nameInput = document.createElement("INPUT");
    $(nameInput).attr("type", "text");
    $(nameInputDiv).append(nameInput);
    $(inputDiv).append(nameInputDiv);

    let idSpacerDiv = document.createElement('div')
    $(idSpacerDiv).addClass("infoDiv");    
    $(idSpacerDiv).html("  ");  
    $(inputDiv).append(idSpacerDiv);

    let priceInputDiv = document.createElement('div')
    $(priceInputDiv).addClass("infoDiv"); 
    $(priceInputDiv).attr("type", "number");
    $(priceInputDiv).attr("min", 0);
    var priceInput = document.createElement("INPUT");
    $(priceInput).val(0);
    $(priceInputDiv).append(priceInput); 
    $(inputDiv).append(priceInputDiv);

    let dlcCountInputDiv = document.createElement('div')
    $(dlcCountInputDiv).addClass("infoDiv"); 
    var dlcCountInput = document.createElement("INPUT");
    $(dlcCountInput).val(0);
    $(dlcCountInput).attr("type", "number");
    $(dlcCountInput).attr("min", 0);
    $(dlcCountInputDiv).append(dlcCountInput); 
    $(inputDiv).append(dlcCountInputDiv);

    let reqAgeinputDiv = document.createElement('div')
    $(reqAgeinputDiv).addClass("infoDiv"); 
    var reqAgeinput = document.createElement("INPUT");
    $(reqAgeinput).val(0);
    $(reqAgeinput).attr("type", "number");
    $(reqAgeinput).attr("min", 0);
    $(reqAgeinputDiv).append(reqAgeinput); 
    $(inputDiv).append(reqAgeinputDiv);

    let windowsInputDiv = document.createElement('div')
    $(windowsInputDiv).addClass("infoDiv"); 
    var windowsInput = document.createElement("INPUT");
    $(windowsInput).val(0);
    $(windowsInput).attr("type", "number");
    $(windowsInput).attr("min", 0);
    $(windowsInput).attr("max", 1);
    $(windowsInputDiv).append(windowsInput);
    $(inputDiv).append(windowsInputDiv); 

    let macInputDiv = document.createElement('div')
    $(macInputDiv).addClass("infoDiv"); 
    var macInput = document.createElement("INPUT");
    $(macInput).val(0);
    $(macInput).attr("type", "number");
    $(macInput).attr("min", 0);
    $(macInput).attr("max", 1);
    $(macInputDiv).append(macInput); 
    $(inputDiv).append(macInputDiv); 

    let linuxInputDiv = document.createElement('div')
    $(linuxInputDiv).addClass("infoDiv"); 
    var linuxInput = document.createElement("INPUT");
    $(linuxInput).val(0);
    $(linuxInput).attr("type", "number");
    $(linuxInput).attr("min", 0);
    $(linuxInput).attr("max", 1);
    $(linuxInputDiv).append(linuxInput); 
    $(inputDiv).append(linuxInputDiv); 

    //submitInputButton
    let submitDiv = document.createElement("div");
    $(submitDiv).html("submit");
    $(submitDiv).addClass("button");
    $(submitDiv).attr("id", "inputSubmit");
    //Trigger Edit item
    submitDiv.addEventListener('click', async () =>{
        if(bool == true){//null
            fetch(('http://localhost:8080/games'), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": $(nameInput).val(), 
                    "windows": ($(windowsInput).val() != null && $(windowsInput).val() < 2) ? $(windowsInput).val() : 0, 
                    "linux": ($(linuxInput).val() != null && $(linuxInput).val() < 2) ? $(linuxInput).val() : 0, 
                    "mac": ($(macInput).val() != null && $(macInput).val() < 2) ? $(macInput).val() : 0, 
                    "price": ($(priceInput).val() != null) ? $(priceInput).val() : 0.0,
                    "required_age": ($(reqAgeinput).val() != null) ? $(reqAgeinput).val() : 0, 
                    "dlc_count": ($(dlcCountInput).val() != null) ? $(dlcCountInput).val() : 0,
                })
            }).then(response => response.json())
            .then(res => console.log(res))

            console.log("Reloading the page...");
            var data = await readData(currValue)
            $("#results").html(currValue + "-" + (currValue + 100));
            loadData(data)

        }else{//hasObject
            fetch(('http://localhost:8080/games/:' + game.game_id), {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": $(nameInput).val(), 
                    "windows": ($(windowsInput).val() != null && $(windowsInput).val() < 2) ? $(windowsInput).val() : 0, 
                    "linux": ($(linuxInput).val() != null && $(linuxInput).val() < 2) ? $(linuxInput).val() : 0, 
                    "mac": ($(macInput).val() != null && $(macInput).val() < 2) ? $(macInput).val() : 0, 
                    "price": ($(priceInput).val() != null) ? $(priceInput).val() : 0.0,
                    "required_age": ($(reqAgeinput).val() != null) ? $(reqAgeinput).val() : 0, 
                    "dlc_count": ($(dlcCountInput).val() != null) ? $(dlcCountInput).val() : 0
                })
            }).then(response => response.json())
            .then(res => console.log(res))
            var data = await readData(currValue)
            $("#results").html(currValue + "-" + (currValue + 100));
            loadData(data)
            location.reload()
        }
    })
        
    
    $(inputDiv).append(submitDiv); 
    $(inputDiv).append(idSpacerDiv); 

    $(holderDiv).append(inputDiv);
    $("#gameHolder").append(holderDiv);
}



createButton.addEventListener("click", async () =>{
    if(backState == 0){
        $(createButton).html("back");
        backState = 1
        displayGame(null)
    }else{
        $(createButton).html("create");
        var data = await readData(currValue)
        loadData(data)
    }
    
})

searchButton.addEventListener("click", async () =>{
    let id = $('#searchBox').val();
    let result = await getOne(id)
    let resultR
    try{
        resultR = await result.json()
        displayGame(resultR)
    }catch (e){
        alert("Id Does Not Exist...")
    }
    $('#searchBox').val("");
    
})


nextA.addEventListener("click", async () =>{
    
    let size = await getSize()
    if (size - currValue > 100){
        currValue += 100
        $("#results").html(currValue + "-" + (currValue + 100) + " (out of "+ size +")");//--------------
        var data = await readData(currValue)
        loadData(data)
    } else {
        alert("No more games to load")
    }


})

prevB.addEventListener('click', async () =>{
    
    let size = await getSize()  
    if (currValue != 0){
        currValue -= 100
        $("#results").html(currValue + "-" + (currValue + 100) + " (out of "+ size +")");//--------------
        var data = await readData(currValue)
        loadData(data)
    } else {
        alert("No more games to load")
    }

})


async function loadData(data) {
    // Remove existing game data

    backState = 0
    $("#holderDiv").remove();
    let holderDiv = document.createElement("div");
    $(holderDiv).attr('id', 'holderDiv');

    // Add header row for column titles
    let headerDiv = document.createElement("div");
    $(headerDiv).addClass("gameDiv headerDiv"); // Use same class for consistent styling

    // Column titles
    const columns = ["Name", "Game ID", "Price", "DLC Count", "Required Age", "Windows", "Mac", "Linux", "Actions"];
    columns.forEach(column => {
        let columnDiv = document.createElement("div");
        $(columnDiv).html(column);
        $(columnDiv).addClass("infoDiv");
        $(headerDiv).append(columnDiv);
    });

    // Append header row to holderDiv
    $(holderDiv).append(headerDiv);

    // Add game data rows
    data.forEach(game => {
        let objDiv = document.createElement("div");
        $(objDiv).addClass("gameDiv"); // Ensure this is the same class as headerDiv

        // Create "Delete" button
        let delDiv = document.createElement("div");
        $(delDiv).html("delete");
        $(delDiv).addClass("button");
        delDiv.addEventListener('click', async () => {
            await fetch('/games:' + game.game_id, {
                method: 'delete',
            }).then(response => response.json())
            .then(res => console.log(res));
            location.reload();
        });

        // Create "Edit" button
        let editDiv = document.createElement("div");
        $(editDiv).html("edit");
        $(editDiv).addClass("button");
        editDiv.addEventListener('click', async () => {
            displayGame(game);
        });

        // Add game details
        let nameDiv = document.createElement("div");
        $(nameDiv).html(game.name);
        $(nameDiv).addClass("infoDiv");
        $(objDiv).append(nameDiv);

        let divID = document.createElement("div");
        $(divID).html(game.game_id);
        $(divID).addClass("infoDiv");
        $(objDiv).append(divID);

        let priceDiv = document.createElement("div");
        $(priceDiv).html(game.price);
        $(priceDiv).addClass("infoDiv");
        $(objDiv).append(priceDiv);

        let dlcCountDiv = document.createElement("div");
        $(dlcCountDiv).html(game.dlc_count);
        $(dlcCountDiv).addClass("infoDiv");
        $(objDiv).append(dlcCountDiv);

        let reqAgeDiv = document.createElement("div");
        $(reqAgeDiv).html(game.required_age);
        $(reqAgeDiv).addClass("infoDiv");
        $(objDiv).append(reqAgeDiv);

        let winSDiv = document.createElement("div");
        $(winSDiv).html(game.windows === 1 ? "true" : "false");
        $(winSDiv).addClass("infoDiv");
        $(objDiv).append(winSDiv);

        let macSDiv = document.createElement("div");
        $(macSDiv).html(game.mac === 1 ? "true" : "false");
        $(macSDiv).addClass("infoDiv");
        $(objDiv).append(macSDiv );

        let linSDiv = document.createElement("div");
        $(linSDiv).html(game.linux === 1 ? "true" : "false");
        $(linSDiv).addClass("infoDiv");
        $(objDiv).append(linSDiv);

        // Append buttons
        $(objDiv).append(editDiv);
        $(objDiv).append(delDiv);

        // Add game row to holderDiv
        $(holderDiv).append(objDiv);
    });

    // Append holderDiv to #gameHolder
    $("#gameHolder").append(holderDiv);
}


window.onload = async function() {

// pop all items in queue if possible
let queue = await fetch("/execute-queue")
// let close = await fetch("/closenode")

var data = await readData(currValue)
$("#results").html(currValue + "-" + (currValue + 100));
loadData(data)


};