const selectCategories = document.getElementById('select-categories');
const listCategories = async (valueSelect) => {
    try {
        //Espera de la respuesta de la api
        const response = await fetch(`http://localhost:8282/api/libros/categorias`);
        // Si la respuesta es correcta

        if (response.status === 200) {
            const data = await response.json();

            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.idCategoriaLibro;
                option.text = category.categoria;
                valueSelect.appendChild(option);
            });
            

        } else if (response.status === 404) {
            console.log('La categoria que buscas no existe');
        } else {
            console.log('error');
        }
        
    } catch (error) {
        console.log(error);
    }
}
listCategories(selectCategories);

const selectStateCopy  = document.getElementById('select-statecopy');
const listStateCopy = async (valueSelect) => {
    try {
        const response = await fetch(`http://localhost:8282/api/libros/copie/state`);

        if (response.status === 200) {
            const data = await response.json();
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.idEstadoEjemplar;
                option.text = state.estadoEjemplar;
                valueSelect.appendChild(option);
            });
            

        } else if (response.status === 404) {
            console.log('el estado de ejemplar que buscas no existe');
        } else {
            console.log('error');
        }
        
    } catch (error) {
        console.log(error);
    }
}
listStateCopy(selectStateCopy);


const selectUpdateCopy = document.getElementById('select-updateCopy');
const listCopyState = async (valueSelect, state) => {
    try {
        const response = await fetch(`http://localhost:8282/api/libros/copies/states`);
        if (response.status === 200) {
            const data = await response.json();
            data.forEach(stateCopy => {
                const option = document.createElement('option');
                option.value = stateCopy.idEstadoEjemplar;
                option.text = stateCopy.estadoEjemplar;

                if (stateCopy.estadoEjemplar === state) {
                    option.selected = true;
                }
                valueSelect.appendChild(option);
            });

        } else if (response.status === 404) {
            console.log('El estado que buscas no existe');
        } else {
            console.log('Error');
        }
    } catch (error) {
        console.log(error);
    }
};




