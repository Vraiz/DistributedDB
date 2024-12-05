import axios from "axios";
import assert from "assert";

async function testConcurrentReadsTwoNodes() {
    const gameId = 20; // ID
    const endpointNode0 = `http://localhost:8080/game/${gameId}`;
    const endpointNode2 = `http://localhost:8080/game3/${gameId}`;

    console.log("Starting concurrent read test from two nodes...");

    try{

        const [responseNode0, responseNode2] = await Promise.all([

            axios.get(endpointNode0),
            axios.get(endpointNode2),

        ]);

        assert.strictEqual(responseNode0.status, 200, "Node 0 request failed");
        assert.strictEqual(responseNode2.status, 200, "Node 2 request failed");

        assert.deepStrictEqual(
            responseNode0.data,
            responseNode2.data,
            "Data mismatch between Node 0 and Node 2"
        );

        console.log("Node 0 Data:", responseNode0.data);
        console.log("Node 2 Data:", responseNode2.data);
        console.log("\n\n✅ Concurrent reads from two nodes are consistent!\n");

    }catch( error ){

        console.error("❌ Concurrent read test from two nodes failed:", error);
    }
}

testConcurrentReadsTwoNodes();