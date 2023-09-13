const valueNameRol = document.getElementById("valor-container");
const NameRole = valueNameRol.getAttribute("data-valor");

const valueDocumento = document.getElementById("valor-documento");
const documentoUser = valueDocumento.getAttribute("data-valor");

const listBooks = async () => {
    try {
        load();
        const response = await fetch(`http://localhost:8282/api/libros/`);
        const data = await response.json();
        await data.forEach(book =>{
            availableCounter(book.idLibro)
        })

        const dato = await fetch(`http://localhost:8282/api/libros/`);
        const datos = await dato.json();

        if (response.status === 200) {

            renderBooksResult(datos)

        } else if (response.status === 404) {
            console.log('el libro que buscas no existe');
        } else {
            console.log('error');
        }

    } catch (error) {
        console.log(error);
    }
}

const renderBooksResult = (data) => {
    const table = $('#tableBooks').DataTable();
    table.clear().draw();

    if(NameRole === 'Administrador'){
        data.forEach(book => {
            let books = `
            
                    <tr>
                        <td id ="idLibro" value="${book.idLibro}" hidden></td>
                        <td>${book.isbn}</td>
                        <td>${book.titulo}</td>
                        <td>${book.autor}</td>
                        <td>${book.editorial}</td>
                        <td>${book.disponibles}</td>
                        <td style="text-align: center;">
                            <button onclick="listCopies(${book.idLibro})" type="button" class="btn btn-copies" data-bs-target="#modalCopies"data-bs-toggle="modal"><i class="fa-solid fa-book-medical"></i></button>
                            <button onclick=" LoadData(${book.idLibro})" type="button" class="btn btn-z" data-bs-target="#modalUpdateBook"data-bs-toggle="modal"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" class="btn btn-libver" onclick="LoadDataDetails(${book.idLibro})" data-bs-target="#modalViewEjemplares"
                                data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>
                `;
                table.row.add($(books)).draw();
                
            });       
    }else{
        data.forEach(book => {
            let books = `
                    <tr>
                        <td id ="idLibro" value="${book.idLibro}" hidden></td>
                        <td>${book.isbn}</td>
                        <td>${book.titulo}</td>
                        <td>${book.autor}</td>
                        <td>${book.editorial}</td>
                        <td>${book.disponibles}</td>
                        <td style="text-align: center;">
                            <button type="button" class="btn btn-libver" onclick="LoadDataDetails(${book.idLibro})" data-bs-target="#modalViewEjemplares"
                                data-bs-toggle="modal"><i class="fa-solid fa-eye"></i></button>
                        </td>   
                    </tr>
                `;
                table.row.add($(books)).draw();
            }); 
    } 
    setTimeout(()=>{
        closeLoad()
    },1000)
};

const availableCounter = async (idLibro) => {
    try {
        const response = await fetch(`http://localhost:8282/api/libros/copies/count/${idLibro}`);
        if (response.status === 200) {        
        }else if(response.length == 0) {
            console.log('No disponible en el momento')
        }
    } catch (error) {
        console.log(error);
    }
}