import StartUp from "./startUp";

let port = process.env.PORT || '3001';

StartUp.app.listen(port, function(){
    console.log("Servidor rodando")
})