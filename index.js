import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


var node0 = mysql.createPool({
    host: process.env.MYSQL_HOST0,
    port: process.env.MYSQL_PORT0,
    user: process.env.MYSQL_USER0,
    password: process.env.MYSQL_PASS0,
    database: process.env.MYSQL_SCHEMA0
}).promise()

var node1 = mysql.createPool({
    host: process.env.MYSQL_HOST1,
    port: process.env.MYSQL_PORT1,
    user: process.env.MYSQL_USER1,
    password: process.env.MYSQL_PASS1,
    database: process.env.MYSQL_SCHEMA1
}).promise()

var node2 = mysql.createPool({
    host: process.env.MYSQL_HOST2,
    port: process.env.MYSQL_PORT2,
    user: process.env.MYSQL_USER2,
    password: process.env.MYSQL_PASS2,
    database: process.env.MYSQL_SCHEMA2
}).promise()

export async function closeNode0(){
    node0.end(err => {
        if (err) {
          console.error('Error closing connection: ' + err.stack);
        } else {
          console.log('Connection closed');
        }
        }
    )

}

export async function openNode0(){
    node0 = mysql.createPool({
        host: "ccscloud.dlsu.edu.ph",
        port: 21652,
        user: "root",
        password: "1234",
        database: "node0"
    }).promise()
}

export async function closeNode1(){
    node1.end(err => {
        if (err) {
          console.error('Error closing connection: ' + err.stack);
        } else {
          console.log('Connection closed');
        }
        }
    )

}

export async function openNode1(){
    node1 = mysql.createPool({
        host: "ccscloud.dlsu.edu.ph",
        port: 21662,
        user: "root",
        password: "1234@CCs",
        database: "steamgames_node2"
    }).promise()
}

export async function closeNode2(){
    node2.end(err => {
        if (err) {
          console.error('Error closing connection: ' + err.stack);
        } else {
          console.log('Connection closed');
        }
        }
    )

}

export async function openNode2(){
    node2 = mysql.createPool({
        host: "ccscloud.dlsu.edu.ph",
        port: 21672,
        user: "root",
        password: "1234",
        database: "node2"
    }).promise()    
}
// async function replicateToCentralNode(transaction) {
//     try {
//         if (!isNode0Available) throw new Error("Node 0 is unavailable");

//         await node0.query(transaction);
//     } catch (error) {

//         console.log("Central node failure detected, logging transaction");

//         await node2.query('INSERT INTO transaction_log (query, status) VALUES (?, `pending`)', [transaction]);
//     }
// }

// async function recoverNode0() {
//     const pendingTransactions = await node2.query('SELECT query FROM transaction_log WHERE status = `pending`');
//     for (const txn of pendingTransactions[0]) {
//         await node0.query(txn.query);
//         await node2.query('UPDATE transaction_log SET status = `completed` WHERE query = ?', [txn.query]);
//     }
// }

//node 1
//get
export async function getAll() {
    const result = await node0.query(`
        SELECT *
        FROM fact_game;
    `)
    return result[0]
}

export async function get100(start) { 
    const result = await node0.query(`
        SELECT *
        FROM fact_game
        LIMIT 100 OFFSET ?;
    `, [start])
    return result[0]
}

export async function getGame(id) {
    const result = await node0.query(`
        SELECT *
        FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0][0]
}

export async function getInfo() {
    const result = await node0.query(`
        SELECT COUNT(*) as count FROM fact_game;
    `)
    // check for count
    // console.log(result)
    return result[0][0]
}

//create
export async function createGame(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node0.query(`
        INSERT INTO fact_game(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

export async function createReplicaGame(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node0.query(`
        INSERT INTO fact_game(game_id ,name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

//update
export async function updateGame(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node0.query(`
        UPDATE fact_game SET name = ?, windows = ?, linux = ?, mac = ?, price = ?, release_date = ?, required_age = ?, dlc_count = ?, metacritic_score = ?, achievements = ?, positive = ?, negative = ?, estimated_owners = ?
        WHERE game_id = ?;
    `, [ name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners, id])
    return result[0]
}


//delete
export async function deleteGame(id) {
    const result = await node0.query(`
        DELETE FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0]
}


export async function readUncommitted() {
    const result = await node0.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    `)
    return result[0]
}

export async function readCommitted() {
    const result = await node0.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
    `)
    return result[0]
}

export async function repeatableRead() {
    const result = await node0.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL repeatable read;
    `)
    return result[0]
}

export async function serializable() {
    const result = await node0.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    `)
    return result[0]
}


//node2
//get
export async function getAll_2() {
    const result = await node1.query(`
        SELECT *
        FROM fact_game;
    `)
    return result[0]
}

export async function get100_2(start) { 
    const result = await node1.query(`
        SELECT *
        FROM fact_game
        LIMIT 100 OFFSET ?;
    `, [start])
    return result[0]
}

export async function getGame_2(id) {
    const result = await node1.query(`
        SELECT *
        FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0][0]
}

export async function getInfo_2() {
    const result = await node1.query(`
        SELECT COUNT(*) as count FROM fact_game;
    `)
    return result[0][0]
}

//create
export async function createGame_2(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node1.query(`
        INSERT INTO fact_game(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

export async function createReplicaGame_2(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node1.query(`
        INSERT INTO fact_game(game_id ,name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

//update
export async function updateGame_2(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node1.query(`
        UPDATE fact_game SET name = ?, windows = ?, linux = ?, mac = ?, price = ?, release_date = ?, required_age = ?, dlc_count = ?, metacritic_score = ?, achievements = ?, positive = ?, negative = ?, estimated_owners = ?
        WHERE game_id = ?;
    `, [ name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners, id])
    return result[0]
}

//delete
export async function deleteGame_2(id) {
    const result = await node1.query(`
        DELETE FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0]
}


export async function readUncommitted_2() {
    const result = await node1.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    `)
    return result[0]
}

export async function readCommitted_2() {
    const result = await node1.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
    `)
    return result[0]
}

export async function repeatableRead_2() {
    const result = await node1.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL repeatable read;
    `)
    return result[0]
}

export async function serializable_2() {
    const result = await node1.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    `)
    return result[0]
}


//node3
//get
export async function getAll_3() {
    const result = await node2.query(`
        SELECT *
        FROM fact_game;
    `)
    return result[0]
}

export async function get100_3(start) { 
    const result = await node2.query(`
        SELECT *
        FROM fact_game
        LIMIT 100 OFFSET ?;
    `, [start])
    return result[0]
}

export async function getGame_3(id) {
    const result = await node2.query(`
        SELECT *
        FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0][0]
}

export async function getInfo_3() {
    const result = await node2.query(`
        SELECT COUNT(*) as count FROM fact_game;
    `)
    return result[0][0]
}

//create
export async function createGame_3(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node2.query(`
        INSERT INTO fact_game(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

export async function createReplicaGame_3(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node2.query(`
        INSERT INTO fact_game(game_id ,name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

//update
export async function updateGame_3(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node2.query(`
        UPDATE fact_game SET name = ?, windows = ?, linux = ?, mac = ?, price = ?, release_date = ?, required_age = ?, dlc_count = ?, metacritic_score = ?, achievements = ?, positive = ?, negative = ?, estimated_owners = ?
        WHERE game_id = ?;
    `, [ name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners, id])
    return result[0]
}


//delete
export async function deleteGame_3(id) {
    const result = await node2.query(`
        DELETE FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0]
}


export async function readUncommitted_3() {
    const result = await node2.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    `)
    return result[0]
}

export async function readCommitted_3() {
    const result = await node2.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
    `)
    return result[0]
}

export async function repeatableRead_3() {
    const result = await node2.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL repeatable read;
    `)
    return result[0]
}

export async function serializable_3() {
    const result = await node2.query(`
        SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    `)
    return result[0]
}




