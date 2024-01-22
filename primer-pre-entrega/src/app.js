const app = require("./server");

const port = 8080

app.listen(port, () => {

    console.log(`server running at port ${port}`);
})