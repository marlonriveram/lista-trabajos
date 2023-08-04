const section = document.querySelector('.container_cards');
let containerFilter = document.querySelector('.container_filters'); //aqui container filters html
// array para el filtrado
let filter = new Set();



// Imprimir cards
 function ImprimirCards (jobs){
      
        // para crear  cada car 
        jobs.forEach(elemens =>{
           // elementos html credos con js
            const card = document.createElement('div');
            const itemStart = document.createElement('div');
            const containerCompanyt = document.createElement('div');
            const company = document.createElement('span');
            const tipoProg = document.createElement('div');
            const experiencia = document.createElement('div');
            const spanDay = document.createElement('span');
            const spanTime = document.createElement('span');
            const spanCity = document.createElement('span');
            const filters = document.createElement('div');
            const circulo = document.createElement('div');
            const imgCirculo = document.createElement('img');
            const role = document.createElement('div');
            const level = document.createElement('div');
           
            
            // escuchar evento de cada boton role
            role.addEventListener('click', (e)=>{
                filtrado(elemens.role,jobs);
                
            });
            
            
            // escuchar evento de cada boton level
            level.addEventListener('click', (e)=>{
                filtrado(elemens.level,jobs);
            
                
            });

            // crear los boton de level
            level.innerText = elemens.level;
            // crear los boton de role
            role.innerText = elemens.role;
            imgCirculo.src = elemens.logo; 
            circulo.append(imgCirculo)
            filters.append(role,level);

            // crear los botones de array lenguajes
            elemens.languages.forEach((language) =>{
                const spanLeng =document.createElement('div');

                // escuchar evento de cada boton lenguaje
                spanLeng.addEventListener('click', ()=>{
                    filtrado(language,jobs); 
                    
                });

                spanLeng.setAttribute(`data-languages`,`${language}`);
                spanLeng.classList.add('btn__filter');
                spanLeng.innerText = language;
                filters.append(spanLeng);
            });

            // crear los botones de  array de tools
             elemens.tools.forEach(tool =>{
                const spanTools = document.createElement('div');
                // escuchar evento de cada boton tools
                spanTools.addEventListener('click', ()=>{
                    filtrado(tool,jobs);
        
                });
                spanTools.setAttribute(`data-tools`,`${tool}`);
                spanTools.classList.add('btn__filter');
                spanTools.innerText = tool;
                filters.append(spanTools);
            });

            spanCity.innerText = elemens.location;
            spanTime.innerText = elemens.contract;
            spanDay.innerText = elemens.postedAt;

            tipoProg.innerText = elemens.position;
            company.innerText = elemens.company;

            // crea las etiquetas featured y el new en funcio de si son true o false
            if(elemens.featured == true && elemens.new == true){  // imprimir solo featured == true y new == true
                const spanNew = document.createElement('span');
                spanNew.innerText = 'New !'
                const spanFeatured = document.createElement('span');
                spanFeatured.innerText = 'Featured'
                containerCompanyt.append(company,spanNew,spanFeatured);
                spanNew.classList.add('new','span');
                spanFeatured.classList.add('featured','span');

            } else if(elemens.new == true && elemens.featured == false){ // imprimir solo new == true
                const spanNew = document.createElement('span');
                spanNew.innerText = 'New !'
                containerCompanyt.append(company,spanNew);
                spanNew.classList.add('new','span');

            } else if(elemens.featured == true && elemens.new == false){  // imprimir solo featured == true
                const spanFeatured = document.createElement('span');
                spanFeatured.innerText = 'Featured'
                containerCompanyt.append(company,spanFeatured);
                spanFeatured.classList.add('featured','span');
            } else {
                containerCompanyt.append(company);
            };

            experiencia.append(spanDay,spanTime,spanCity);
            itemStart.append(containerCompanyt,tipoProg,experiencia);
            card.append(circulo,itemStart,filters);
            section.append(card);

            // Clases de las etiquetas
            card.classList.add('cards');
            itemStart.classList.add('Item_Start');
            containerCompanyt.classList.add('container__company')
            tipoProg.classList.add('level__rol');
            experiencia.classList.add('experiencia');
            filters.classList.add('container__btn__filters')
            company.classList.add('company');
            role.setAttribute(`data-role`,`${elemens.role}`);
            role.classList.add('btn__filter');
            level.setAttribute(`data-level`,`${elemens.level}`);
            level.classList.add('btn__filter');
            circulo.classList.add('circulo');
            imgCirculo.classList.add('img__circulo');
                
        });
 

 

};

// Imprimir filters
function ImprimirFiltros(dataFiltros){
// ------ crear el btn clear una sola vez en el fileters-----
    const btnClear = document.createElement('div');
    const parrafoClear = document.createElement('p');
    const groupFilterApliied = document.createElement('div');
    parrafoClear.innerText = 'Clear';
    btnClear.classList.add('btn__clear');
    btnClear.append(parrafoClear);
//-----------------------------------------------------------
    borrarTodo(parrafoClear);

    // Imprimir los filtros en el dom
     dataFiltros.forEach((filters,index)=>{

        const filterApliied = document.createElement('div');
        const containerFilterApliied = document.createElement('div');
        const containerImagenClose =document.createElement('figure');
        const imagenClose = document.createElement('img');
        imagenClose.src = "./images/icon-remove.svg";

        containerImagenClose.append(imagenClose)
        
        containerFilterApliied.append(filterApliied,containerImagenClose);
        filterApliied.innerText = filters;
        groupFilterApliied.append(containerFilterApliied);
        containerFilter.append(groupFilterApliied,btnClear);

        filterApliied.classList.add('filterApliied');
        imagenClose.classList.add('img__close');
        containerFilterApliied.classList.add('containerFilterApliied');
        containerImagenClose.classList.add('containerImagenClose');
        groupFilterApliied.classList.add('groupFilter__Apliied');
        
        // Escuchar vento del Imagen close
        imagenClose.onclick = () =>{removerFiltro(index,jobs)};
        

    });
};

// jobs filtrados 
function filtrarJobs(filter,jobs){
    let combinarArrays = [''];
    const copiaFilter = [...filter];
    // filtrar data original
    const dataNew = jobs.filter((card)=>{

        // para facilidad uni los [role,level,languages,tools en un solo array]
        combinarArrays = [card.role,card.level,...card.languages,...card.tools];
        // esta parte es la que condicion para filtrar solo los elementos del data original que tengan los filtros aplicados
         return copiaFilter.every(valuefilter =>{
            return combinarArrays.includes(valuefilter);
        });
    });

    return dataNew;
}

//funcion para añadir los filtros
 function filtrado (Filtro,jobs){
    filter.add(Filtro);
    containerFilter.innerText = "";
    ImprimirFiltros(filter);
  
    //---------- Filtra los datos del filter original -----------------------------
   const data = filtrarJobs(filter,jobs);
    //-------------------------------------------------------------
    section.innerText = '';
    ImprimirCards (data);
    
};

// remover filtros
function removerFiltro (index,jobs){
    filter.delete(index);
    containerFilter.innerText = "";
    ImprimirFiltros(filter);

      //---------- Filtra los datos del filter original -----------------------------
      const data = filtrarJobs(filter,jobs);
      //-------------------------------------------------------------
      section.innerText = '';
      ImprimirCards (data);
};
// funcion borrar todos los filtros
function borrarTodo(btn){
    btn.addEventListener('click',() =>{
       filter.clear()
       containerFilter.innerText = "";
       section.innerText = '';
       ImprimirCards(jobs);
    });
};

//NOTA:JOBS ES UN ARRAY DE OBJETOS QUE VIENE DEL DATOS.JS

ImprimirCards(jobs);



