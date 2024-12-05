async function globalFailure3(){
    
    const object = {
        name: "From Testscript",
        windows: 1,
        linux: 0,
        mac: 0,
        price: 0,
        required_age: 0,
        dlc_count: 0
    }

    try{

        console.log("closing the connection");
        await fetch("http://localhost:8080/closenode")
        console.log("closed the connection");

        await fetch(('http://localhost:8080/games'), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": object.name, 
                "windows": object.windows, 
                "linux": object.linux, 
                "mac": object.mac, 
                "price": object.price,
                "required_age": object.required_age, 
                "dlc_count": object.dlc_count,
            })
        }).then(response => response.json())
        .then(res => console.log(res))

        await fetch("http://localhost:8080/execute-queue")

        console.log("Test concluded");

    }  
    catch(error){

        console.error("❌ Test failed:", error);

    }

}
globalFailure3()