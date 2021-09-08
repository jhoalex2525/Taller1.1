//CLIENTE (VOY PARA EL RESTAURANTE)
//RESTAURANTE = SERVIDOR DE SPOTIFY
let uri="https://api.spotify.com/v1/artists/3LLNDXrxL4uxXtnUJS5XWM/top-tracks?market=US";
let token="Bearer BQAgZ9lyr00jprGoIKKzvy4jIRr8uxGsYz2CXj94y_IpPA9BxMlawUSSfjxx1kEWo4ruYLoFGQaq7Ft8Ggea6T0vb7DBI8ybln9p1GD3cd0irLEnRpvFHXJMF1Xwk2-7m-vQEIu1Md0kP8Qy";
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
        
        //PADRES E HIJOS de adentro hacia afuera
        tarjeta.appendChild(imagen)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)
    })
}