let uri = "https://accounts.spotify.com/api/token";
let dato1 = "grant_type=client_credentials";
let dato2 = "client_id=bcce4039e11d4056b37e0c6a53a62eaa";
let dato3 = "client_secret=f39c883425314590b35c5f98669913b0";

let parametrosPOST = {
    method: "POST",
    headers: { //Aca se trae el Content-Type de los de POSTMAN que estan en header en Hidden//
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body: `${dato1}&${dato2}&${dato3}`
}

fetch(uri,parametrosPOST)
.then(function(respuesta){//Verifica que llegue en formato json//
    return(respuesta.json())
})
.then(function(respuesta){//Qué hare con la respuesta anterior acá se hace lo que uno quiere que
    //sucede al respondercorrectamente el formato json//
    console.log(respuesta)
    obtenerToken(respuesta)
})
.catch(function(error){//Mensaje de error si falla
    console.log(error)
})

function obtenerToken(respuesta){
    let token=respuesta.token_type+" "+respuesta.access_token
    obtenerCanciones(token)
}

function obtenerCanciones(token){
    //console.log(token) esto se hizo para probar que si llevara el token
    let uri="https://api.spotify.com/v1/artists/3LLNDXrxL4uxXtnUJS5XWM/top-tracks?market=US";
    let parametrosEnvio={
        method:"GET",
        headers:{
            Authorization: token
        }
    }

    fetch (uri,parametrosEnvio)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(respuesta){
        console.log(respuesta)
        pintarDatos(respuesta);
        /*console.log(respuesta.tracks)    
        console.log(respuesta.tracks[0])  
        console.log(respuesta.tracks[0].preview_url)  
        console.log(respuesta.tracks[0].album)      
        console.log(respuesta.tracks[0].album.images)  
        console.log(respuesta.tracks[0].album.images[0])  
        console.log(respuesta.tracks[0].album.images[0].url)  */
    })
    .catch(function(error){
        console.log(error)
    })    
}

function pintarDatos(datos){
    let fila=document.getElementById("fila")
    datos.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)
        
        // Crear div con js
        let columna=document.createElement("div")
        
        //Crear la clase col
        columna.classList.add("col")
        
        //Creo un div que sirve de tarjeta
        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")
        
        //Creo una img de tarjeta
        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top")
        imagen.src=cancion.album.images[0].url

        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.src=cancion.preview_url
        audio.setAttribute("controls","controls")
        
        //PADRES E HIJOS de adentro hacia afuera
        tarjeta.appendChild(imagen)
        tarjeta.appendChild(audio)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)
    })
}