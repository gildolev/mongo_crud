const express = require('express')
const router = express();
const port = 8080;
router.use(express.json());
router.use(require('./routes'));
const {connect}=require('./db');




router.listen(port, () => {
   connect();
   console.log(`Example app listening at http://localhost:${port}`)
})
