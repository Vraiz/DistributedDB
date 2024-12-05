import express from 'express'
import cors from 'cors'//remove me later

const app = express()
app.use(express.static("public"));
app.use(express.json())
app.use(cors())//remove me later


import {openNode0, closeNode0, openNode1, closeNode1, openNode2, closeNode2, getAll, getAll_2, getAll_3, getGame, getGame_2, getGame_3, updateGame, updateGame_2, updateGame_3, deleteGame, deleteGame_2, deleteGame_3, createGame, createReplicaGame, createGame_2, createReplicaGame_2, createGame_3, createReplicaGame_3, get100, get100_2, get100_3, getInfo, getInfo_2, getInfo_3, readUncommitted, readCommitted, readCommitted_2, readCommitted_3, repeatableRead, repeatableRead_2, repeatableRead_3, serializable, serializable_2, serializable_3, readUncommitted_2, readUncommitted_3} from './index.js'

const withTimeout = (promise, timeout) => {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request Timeout')), timeout)
    );
    return Promise.race([promise, timeoutPromise]);
};

app.get("/", async (req, res) =>{
    res.sendFile('/public/index.html')
})

app.get("/closenode/:id", async (req,res) => {

    const id = req.params.id.replace(":",'')
    switch(id){
        case '0':
            console.log("Closing Node 0");
            closeNode0();
            break;
        case '1':
            console.log("Closing Node 1");
            closeNode1();
            break;
        case '2':
            console.log("Closing Node 2")
            closeNode2();
    }
    res.status(200).send("closed node0")

})
app.get("/opennode/:id", async (req,res) => {

    const id = req.params.id.replace(":",'')
    switch(id){
        case '0':
            console.log("Reconnecting Node 0")
            openNode0();
            break;
        case '1':
            console.log("Reconnecting Node 1")
            openNode1();
            break;
        case '2':
            console.log("Reconnecting Node 2")
            openNode2();
    }
    res.status(200).send("opened node0")

})

const queue = []

app.get("/execute-queue", async (req,res)=>{
    
    var size = (queue.length/3)

    for (size; size > 0 ; size--){
        
        console.log("Executing Query #"+size) 
        var node = queue.pop()
        var method = queue.pop()
        const body = queue.pop()
        
        console.log(body)
        // console.log(method)
        // console.log(node)
        const {newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners} = body
        
        switch (method){
            case 'POST':
                switch (node){
                    case '0':
                        console.log("POST at Node 0")
                        if (!newId){
                            console.log("NO ID Provided, Creating a Unique ID...\n")
                            try{
                                const games = await withTimeout(createGame(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                                console.log("Game Created: ")
                                console.log(games)
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('POST')
                                queue.push('0')
                            }
                        }
                        else{
                            console.log("ID Provided! Proceeding...\n")
                            try{
                                const games = await withTimeout(createReplicaGame(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                                console.log("Game Created: ")
                                console.log(games)
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('POST')
                                queue.push('0') 
                            }
                        }  
                        break;
                    case '1':
                        console.log("POST at Node 1")
                        if (!newId){
                            console.log("NO ID Provided, Creating a Unique ID...\n")
                            try{
                                const games = await withTimeout(createGame_2(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                                console.log("Game Created: ")
                                console.log(games)
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('POST')
                                queue.push('1')
                            }
                        }
                        else{
                            console.log("ID Provided! Proceeding...\n")
                            try{
                                const games = await withTimeout(createReplicaGame_2(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                                console.log("Game Created: ")
                                console.log(games)
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('POST')
                                queue.push('1') 
                            }
                        }
                        break;
                    case '2':
                        console.log("POST at Node 2")
                        if (!newId){
                            console.log("NO ID Provided, Creating a Unique ID...\n")
                            try{
                                const games = await withTimeout(createGame_3(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                                console.log("Game Created: ")
                                console.log(games)
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('POST')
                                queue.push('2')
                            }
                        }
                        else{
                            console.log("ID Provided! Proceeding...\n")
                            try{
                                const games = await withTimeout(createReplicaGame_3(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                                console.log("Game Created: ")
                                console.log(games)
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('POST')
                                queue.push('2') 
                            }
                        }
                        break;
                }
                break;
            case 'PATCH':
                switch (node){
                    case '0':
                        console.log("PATCH at Node 0")

                        try{
                            await withTimeout(updateGame(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                        } catch (error){
                            queue.push(body)
                            queue.push('PATCH')
                            queue.push('0') 
                        }

                        break;
                    case '1':
                        console.log("PATCH at Node 1")

                        try{
                            await withTimeout(updateGame_2(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                        } catch (error){
                            queue.push(body)
                            queue.push('PATCH')
                            queue.push('1') 
                        }
                        break;
                    case '2':
                        console.log("PATCH at Node 2")
                        try{

                        } catch (error){
                            await withTimeout(updateGame_3(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                            queue.push(body)
                            queue.push('PATCH')
                            queue.push('2') 
                        }
                        break;
                   
                }
                break;
                case 'DELETE':
                    switch (node){
                        case '0':
                            console.log("DELETE at Node 0") 
                            try{
                                const games = await withTimeout(deleteGame(parseInt(newId.replace(":",''))),2000)
                                console.log("GAME SUCCESSFULLY DELETED!")
                            }  
                            catch(error){
                                queue.push(body)
                                queue.push('DELETE')
                                queue.push('0') 
                            }
                            break;
                        case '1':
                            console.log("DELETE at Node 1")
                            try{
                                const games = await withTimeout(deleteGame_2(parseInt(newId.replace(":",''))),2000)
                                console.log("GAME SUCCESSFULLY DELETED!")
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('DELETE')
                                queue.push('1')
                            }
                            break;
                        case '2':
                            console.log("DELETE at Node 2")
                            try{
                                const games = await withTimeout(deleteGame_3(parseInt(newId.replace(":",''))),2000)
                                console.log("GAME SUCCESSFULLY DELETED!")
                            }
                            catch(error){
                                queue.push(body)
                                queue.push('DELETE')
                                queue.push('2')
                            }
                            break;
                    }
                    break;
        }
    }
    

    res.status(200).send("ok")
});


//gets 100 games
app.get("/games/:id", async (req, res) =>{
    const id = req.params.id

    try {
        const games = await withTimeout(get100(parseInt(id.replace(":", ''))), 2000); // 5-second timeout
        console.log("Succesfully Connected to Node 0!");
        res.status(200).send(games);
    } catch (error) {
        console.warn("Node 0 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 1");
        try {
            const games = await withTimeout(get100_2(parseInt(id.replace(":", ''))), 2000);
            res.status(200).send(games);
        } catch (error) {
            console.warn("Node 1 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 2");
            try {
                const games = await withTimeout(get100_3(parseInt(id.replace(":", ''))), 2000);
                res.status(200).send(games);
            } catch (error) {
                console.warn("[!] ALL NODES ARE DOWN [!]");
            }
        }
    }
})

// app.get("/games-2/:id", async (req, res) =>{
//     const id = req.params.id
//     const games = await get100_2(parseInt(id.replace(":",'')))
//     res.status(200).send(games)
// })

//gets 1 games
app.get("/game/:id", async (req, res) =>{
    try{
        const id = req.params.id
        const games = await withTimeout(getGame(parseInt(id.replace(":",''))), 1000)

        console.log("Succesfully Connected to Node 0!");
        if (games == undefined){
            console.warn("ID Cannot Be Found, Searching in Node 1");
            throw error;
        }
        res.status(200).send(games)
    }
    catch(error){
        console.warn("Node 0 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 1");
        try{ 
            const id = req.params.id
            const games = await withTimeout(getGame_2(parseInt(id.replace(":",''))), 1000)
            res.status(200).send(games)

            if (games == undefined){
                console.warn("ID Cannot Be Found, Searching in Node 2");
                throw error;
            }
        }
        catch{
            console.warn("Node 0 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 1");
            try{
                const id = req.params.id
                const games = await withTimeout(getGame_3(parseInt(id.replace(":",''))), 1000)
                res.status(200).send(games)
            }
            catch (error){
                console.warn("[!] ALL NODES ARE DOWN [!]");
            }
        }
    }
})

// withTimeout(, 2000)

// app.get("/game-2/:id", async (req, res) =>{
//     const id = req.params.id
//     const games = await getGame_2(parseInt(id.replace(":",'')))
//     res.status(200).send(games)
// })


//gets total number of items
app.get("/count", async (req, res) =>{

    try{
        const games = await  withTimeout(getInfo(), 1000)
        console.log(games)
        console.log("Succesfully Connected to Node 0!");
        res.status(200).send(games.count)
    }
    catch (error) {
        console.warn("Node 0 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 1");
        try{
            const games = await  withTimeout(getInfo_2(), 1000)
            console.log(games)
            res.status(200).send(games.count)
        }
        catch(error){
            console.warn("Node 0 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 1");
            try{
                const games = await  withTimeout(getInfo_3(), 1000)
                console.log(games)
                res.status(200).send(games.count)
            }
            catch (error){
                console.warn("[!] ALL NODES ARE DOWN [!]");
            }
        }
    }
})

// app.get("/count-2", async (req, res) =>{
//     const games = await getInfo_2()
//     console.log(games)
//     res.status(200).send(games.count)
// })

// app.get("/count-3", async (req, res) =>{
//     const games = await getInfo_3()
//     console.log(games)
//     res.status(200).send(games.count)
// })


//insert
app.post("/games", async (req, res) =>{
    try{
        const {name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
        const games = await withTimeout(createGame(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
        const newId = games.insertId
        console.log(games);
        console.log("Succesfully Connected To Node 1!");
        console.log("newId is here: " + newId)
        if (windows == true && linux == false && mac == false){
            try{
                const games = await withTimeout(createReplicaGame_2(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)       
                console.log(games);//  send to node1
                console.log("Game Created Successfully at Node 1");
            }
            catch (error){
                const request ={   
                    newId: newId,
                    name: name,
                    windows: windows,
                    linux: linux,
                    mac: mac,
                    price: price,
                    required_age: required_age,
                    dlc_count: dlc_count
                }
                queue.push(request)
                queue.push('POST')
                queue.push('1')
            }
        }
        
        if (windows == true && linux == true && mac == true || windows == false && linux == true && mac == true || windows == true && linux == false && mac == true || windows == true && linux == true && mac == false){
            try{
                const games = await withTimeout(createReplicaGame_3(newId, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)   
                console.log(games);
                console.log("Game Created Successfully at Node 2!");
            }
            catch (error){
                const request ={   
                    newId: newId,
                    name: name,
                    windows: windows,
                    linux: linux,
                    mac: mac,
                    price: price,
                    required_age: required_age,
                    dlc_count: dlc_count
                }
                queue.push(request)
                queue.push('POST')
                queue.push('2')
            }
        }
        res.status(200).send(games)
    }
    catch (error) {
        console.warn("Node 0 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 1");
        try{
            const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
            if (windows == true && linux == false && mac == false){
                const games = await withTimeout(createGame_2(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)
                const newId = games.insertId
                const request ={   
                    newId: newId,
                    name: name,
                    windows: windows,
                    linux: linux,
                    mac: mac,
                    price: price,
                    required_age: required_age,
                    dlc_count: dlc_count
                }
                queue.push(request)
                queue.push('POST')
                queue.push('0')
                console.log(games);
                res.status(200).send(games)
            }
            else if (windows == true && linux == true && mac == true || windows == false && linux == true && mac == true || windows == true && linux == false && mac == true || windows == true && linux == true && mac == false){
                console.log("Game REJECTED by Node 1, checking for Node 2")
                const games = await withTimeout(createGame_3(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)   
                console.log("Game Created successfully at Node 2"); 
                const newId = games.insertId
                const request ={   
                    newId: newId,
                    name: name,
                    windows: windows,
                    linux: linux,
                    mac: mac,
                    price: price,
                    required_age: required_age,
                    dlc_count: dlc_count
                }
                queue.push(request)
                queue.push('POST')
                queue.push('0')
                console.log(games);//  send to node2
            }
            else{
                console.log("Game REJECTED by Node 1 & 2")
                const request ={
                    name: name,
                    windows: windows,
                    linux: linux,
                    mac: mac,
                    price: price,
                    required_age: required_age,
                    dlc_count: dlc_count
                }
                queue.push(request)
                queue.push('POST')
                queue.push('0')
            }
        }
        catch(error){
            console.warn("Node 1 is DOWN or TIMED-OUT, \n.\n.\n.\n Redirecting To Node 2");
            try{
                const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
                if (windows == true && linux == true && mac == true || windows == false && linux == true && mac == true || windows == true && linux == false && mac == true || windows == true && linux == true && mac == false){
                    const games = await withTimeout(createGame_3(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000)   
                    console.log(games);
                    const newId = games.insertId
                    const request ={   
                        newId: newId,
                        name: name,
                        windows: windows,
                        linux: linux,
                        mac: mac,
                        price: price,
                        required_age: required_age,
                        dlc_count: dlc_count
                    }
                    queue.push(request)
                    queue.push('POST')
                    queue.push('0')
                    res.status(200).send(games)    //  send to node2
                }
                else{
                    if (windows == true && linux == false && mac == false){
                        const request ={   
                            name: name,
                            windows: windows,
                            linux: linux,
                            mac: mac,
                            price: price,
                            required_age: required_age,
                            dlc_count: dlc_count
                        }
                        queue.push(request)
                        queue.push('POST')
                        queue.push('1')
                    }
                    const request ={   
                        name: name,
                        windows: windows,
                        linux: linux,
                        mac: mac,
                        price: price,
                        required_age: required_age,
                        dlc_count: dlc_count
                    }
                    queue.push(request)
                    queue.push('POST')
                    queue.push('0')
                    console.log("Game REJECTED by Node 2")
                }
            }
            catch (error){
                console.warn("[!] ALL NODES ARE DOWN [!]");
            }
        }
    }
})

// app.post("/games-2", async (req, res) =>{
//     const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
//     const games = await createGame_2(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
//     res.status(200).send(games)
// })

// app.post("/games-3", async (req, res) =>{
//     const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
//     const games = await createGame_3(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
//     res.status(200).send(games)
// })


async function patchProtocol(req, id, oldVal){
    const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
    var request = req.body;

    if (oldVal.windows == 1 && oldVal.linux == 0 && oldVal.mac == 0){
        if (windows == 1 && linux == 0 && mac == 0){
            try{
                await withTimeout(updateGame_2(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners),2000)
            }catch (error){
                request.newId = parseInt(id.replace(":",''))
                queue.push(request)
                queue.push('PATCH')
                queue.push('1')
            }
        } else if (parseInt(windows) + parseInt(mac) + parseInt(linux) > 1){
            console.log("test test test")
            try{
                await withTimeout(deleteGame_2(parseInt(id.replace(":",''))), 2000)
            }catch (error) {
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('1')
            }
            
            try{
                await withTimeout(createReplicaGame_3(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000) 
            }catch (error) {
                queue.push(parseInt(id.replace(":",'')))
                queue.push('POST')
                queue.push('2')
            }
            
        } else if (parseInt(windows) + parseInt(mac) + parseInt(linux) < 2){
            try{
                await withTimeout(deleteGame_2(parseInt(id.replace(":",''))), 2000)
            }catch (error) {
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('1')
            }
        }
    } else if(parseInt(oldVal.windows) + parseInt(oldVal.linux) + parseInt(oldVal.mac) > 1) {
        if (parseInt(windows) + parseInt(mac) + parseInt(linux) > 1){
            try{
                await withTimeout(updateGame_3(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners),2000)
            }catch (error){
                request.newId = parseInt(id.replace(":",''))
                queue.push(request)
                queue.push('PATCH')
                queue.push('2')
            }
        } else if (windows == 1 && linux == 0 && mac == 0){
            try{
                await withTimeout(deleteGame_3(parseInt(id.replace(":",''))), 2000)
            }catch (error) {
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('2')
            }
            
            try{
                await withTimeout(createReplicaGame_2(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners), 2000) 
            }catch (error) {
                queue.push(parseInt(id.replace(":",'')))
                queue.push('POST')
                queue.push('1')
            }   
        } else if (parseInt(windows) + parseInt(mac) + parseInt(linux) < 2){
            try{
                await withTimeout(deleteGame_3(parseInt(id.replace(":",''))), 2000)
            }catch (error) {
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('2')
            }
        }
    }
}

//update
app.patch("/games/:id", async (req, res) =>{
    
    const id = req.params.id
    let oldVal
    try{
        oldVal = await getGame(parseInt(id.replace(":",'')))
    }catch (e) {
        try{
            oldVal = await getGame_2(parseInt(id.replace(":",'')))
        }catch (e) {
            try{
                oldVal = await getGame_3(parseInt(id.replace(":",'')))
            }catch (e) {
                console.log("ID not found")
            }
        }
    }
    try{
        const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
        var request = req.body;

        
        const games = await withTimeout(updateGame(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners),2000)

        patchProtocol(req, id, oldVal)


        console.log("Succesfully Connected to Node 0!");
        console.log(games);
        res.status(200).send(games)
        
    }
    catch (error) {
        request.newId = parseInt(id.replace(":",''))
        queue.push(request)
        queue.push('PATCH')
        queue.push('0')

        console.warn(error);
        try{
            const id = req.params.id
            patchProtocol(req, id, oldVal)
            console.log(games);
            res.status(200).send(games)
        }
        catch(error){

            queue.push(parseInt(id.replace(":",'')))
            queue.push('DELETE')
            queue.push('2')

            console.warn("Node 0 is DOWN or TIMED-OUT \n.\n.\n.\n Redirecting To Node 1");
            try{
                const id = req.params.id
                patchProtocol(req, id, oldVal)
                console.log(games);
                res.status(200).send(games)
            }
            catch (error){
                console.warn("[!] ALL NODES ARE DOWN [!]");
            }
        }
    }
})

// app.patch("/games-2/:id", async (req, res) =>{
//     const id = req.params.id
//     const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
//     const games = await updateGame_2(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
//     res.status(200).send(games)
// })

// app.patch("/games-3/:id", async (req, res) =>{
//     const id = req.params.id
//     const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
//     const games = await updateGame_3(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
//     res.status(200).send(games)
// })

//delete
app.delete("/games/:id", async (req, res) =>{
    try{    
        const id = req.params.id
        const oldVal = await getGame(parseInt(id.replace(":",'')))
        const games = await withTimeout(deleteGame(parseInt(id.replace(":",''))),2000)
        console.log("Succesfully Connected to Node 0!");
        console.log(games);

        if (oldVal.windows == 1 && oldVal.linux == 0 && oldVal.mac == 0){
            try{
                await withTimeout(deleteGame_2(parseInt(id.replace(":",''))),2000)
            }
            catch(error){
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('1')
            }
        } else if(parseInt(oldVal.windows) + parseInt(oldVal.linux) + parseInt(oldVal.mac) > 1){
            try{
                await withTimeout(deleteGame_3(parseInt(id.replace(":",''))),2000)
            }
            catch(error){
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('2')
            }
        }

        res.status(200).send(games)
    }
    catch (error) {
        console.warn("Node 0 is DOWN or TIMED-OUT! \n.\n.\n.\n Redirecting To Node 1");
        const id = req.params.id
        //push request to the queue
        const request ={   
            newId: id
        }
        queue.push(request)
        queue.push('DELETE')
        queue.push('0')
        try{
            const games = await withTimeout(deleteGame_2(parseInt(id.replace(":",''))),2000)
            console.log(games);
            res.status(200).send(games)
        }
        catch(error){
                //send request if node1 unavailable
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('0')
                console.warn("Node 0 is DOWN or TIMED-OUT! \n.\n.\n.\n Redirecting To Node 1");
            try{
                const id = req.params.id
                const games = await withTimeout(deleteGame_3(parseInt(id.replace(":",''))),2000)
                console.log(games);
                res.status(200).send(games)
            }
            catch (error){
                //send request if node2 unavailable
                const request ={   
                    newId: id
                }
                queue.push(request)
                queue.push('DELETE')
                queue.push('2')
                console.warn("[!] ALL NODES ARE DOWN [!]");
            }
        }
    }
})


// app.delete("/games-2/:id", async (req, res) =>{
//     const id = req.params.id
//     const games = await deleteGame_2(parseInt(id.replace(":",'')))
//     res.status(200).send(games)
// })

// app.delete("/games-3/:id", async (req, res) =>{
//     const id = req.params.id
//     const games = await deleteGame_3(parseInt(id.replace(":",'')))
//     res.status(200).send(games)
// })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Unfortunately Broke!')
})

app.get("/concurrency/:id", async (req, res) =>{
    const id = req.params.id.replace(":",'')
    console.log("working "+id)
    let result = ""
    if(id == 1){
        await readUncommitted()
        await readUncommitted_2()
        await readUncommitted_3()
        result = "read uncommited"
    }
    else if(id == 2){
        await readCommitted()
        await readCommitted_2()
        await readCommitted_3()
        result = "read readCommitted"
    }
    else if(id == 3){
        await repeatableRead()
        await repeatableRead_2()
        await repeatableRead_3()
        result = "read repeatableRead"
    }
    else if(id == 4){
        await serializable()
        await serializable_2()
        await serializable_3()
        result = "read serializable"
    }
    res.status(200).send("should be "+ result)
})

app.get("/game2/:id", async (req, res) =>{
    const id = req.params.id
    const games = await withTimeout(getGame_2(parseInt(id.replace(":",''))), 1000)

    console.log("Succesfully Connected to Node 2");
    if (games == undefined){
        console.log("\nNot Found!")
    }
    res.status(200).send(games)
})

app.get("/game3/:id", async (req, res) =>{
    const id = req.params.id
    const games = await withTimeout(getGame_3(parseInt(id.replace(":",''))), 1000)

    console.log("Succesfully Connected to Node 3");
    if (games == undefined){
        console.log("\nNot Found!")
    }
    res.status(200).send(games)
})


app.listen(8080, () => {
    console.log('------------------------------')
    console.log('App is running at port -> 8080 ')
    console.log('------------------------------')
})