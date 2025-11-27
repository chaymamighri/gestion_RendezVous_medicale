const mongoose = require('mongoose');

//create connection data base
mongoose.connect("mongodb://localhost:27017/users")
    .then( 
        ()=> {
            console.log('connected to db');
        }
    )
    .catch((err)=>{
        console.log(err);
        }
    )
    

