//TABS AND MENUES
function showMenu(){
    let menu = document.getElementById('menu')
    menu.style.left='0';
    document.body.style.overflowY='hidden'
}
function hideMenu()
{
    let menu = document.getElementById('menu')
    menu.style.left='-100%';
    document.body.style.overflowY='auto'
}
var menu = document.getElementById('menu')
menu.addEventListener('click',event =>{
    if(event.target!=event.currentTarget)
        return 
    menu.style.left='-100%';
    document.body.style.overflowY='auto'
})
var loading = document.getElementById('loading')
var menuButtons = document.querySelectorAll('[option]')
var tabs = document.querySelectorAll('[tab]')
menuButtons.forEach(menuButton=>{
    menuButton.addEventListener('click',async function(){
        loading.style.display='flex'
        let tabName = menuButton.attributes.option.value

        menuButtons.forEach(menuButton2 =>{
            menuButton2.classList.remove('active')
        })
        menuButton.classList.add('active')

        tabs.forEach(tab =>{
            tab.classList.remove('active')
        })
        let targetTab = document.querySelector('[tab='+tabName+']')
        targetTab.classList.add('active')

        let tabTitle = document.getElementById('tab-title')
        tabTitle.innerText = menuButton.innerText
        loading.style.display='none'
        hideMenu()
    })
})

//LOAD CURENTE
window.addEventListener('DOMContentLoaded',loadCurente)

var curenteBTN = document.querySelector('[option=curente]')
curenteBTN.addEventListener('click',loadCurente)
async function loadCurente(){
    let curente = await (await fetch('/getcollection/curente')).json()
    let allperioade = await (await fetch('/getcollection/perioade')).json()

    curente.forEach(curent =>{
        allperioade.forEach(perioada => {
            if(JSON.stringify(curent.perioada)==JSON.stringify(perioada.short))
            {
                curent.perioadaName = perioada.name
            }
        });
    })

    let curenteContainer = document.querySelector('[tab=curente]')
    curenteContainer.innerHTML=''
    curente.forEach(curent=>{
        curenteContainer.insertAdjacentHTML('beforeend',renderCurent(curent))
    })
}
function renderCurent(curent){

    let renderedCurent = 
    `
    <div class="card flex-column">
        <div class="top flex-row" style="background-color: var(--${curent.short})">
            <h2 class="tit" style="color: ${curent.titlecolor}">${curent.name}</h2>
        </div>
        <div class="bottom flex-column">
            <h3>${curent.perioadaName}</h3>
            <p>${curent.definitie}</p>
            <div class="flex-row ui">
                <a href="/curente/${curent.short}">Read more</a>
                <div class="flex-row">
                    <p>Compara</p>
                    <img src="../public/res/UI/check.svg"/>
                </div>
            </div>
            
        </div>
    </div>
    `
    return renderedCurent
}


//LOAD PERIOADE
var perioadeBTN = document.querySelector('[option=perioade]')
perioadeBTN.addEventListener('click',loadPerioade)

async function loadPerioade(){
    let allperioade = await (await fetch('/getcollection/perioade')).json()
    let perioadeContainer = document.querySelector('[tab=perioade]')
    perioadeContainer.innerHTML=''

    allperioade.forEach(perioada=>{
        perioadeContainer.insertAdjacentHTML('beforeend',renderPerioada(perioada))
    })
}
function renderPerioada(perioada){
    let PERIOADA=
    `
    <div class="card flex-column">
        <div class="top flex-row" style="background-color: var(--${perioada.short})">
            <h2 class="tit" style="color: ${perioada.titlecolor}">${perioada.name}</h2>
        </div>
        <div class="bottom flex-column">
            <h3>${perioada.date}</h3>
            <p>${perioada.about}</p>
            <div class="flex-row ui">
                <a href="/perioade/${perioada.short}">Read more</a>
                <div class="flex-row">
                    <p>Compara</p>
                    <img src="../public/res/UI/check.svg"/>
                </div>
            </div>
            
        </div>
    </div>
    `
    return PERIOADA
}

//LOAD AUTORI
var autoriBTN = document.querySelector('[option=autori]')
autoriBTN.addEventListener('click', loadAutori)

async function loadAutori(){
    let allautori = await (await fetch('/getcollection/autori')).json()
    let allperioade = await (await fetch('/getcollection/perioade')).json()

    allautori.forEach(autor => {
        allperioade.forEach(perioada => {
            if(JSON.stringify(autor.perioada)==JSON.stringify(perioada.short)){
                autor.perioadaName = perioada.name
                
            }
        });
    });

    let autoriContainer = document.querySelector('[tab=autori]')
    autoriContainer.innerHTML=''

    allautori.forEach(autor=>{
        autoriContainer.insertAdjacentHTML('beforeend',renderAutor(autor))
    })
}

function renderAutor(autor){
    let AUTOR=
    `
    <div class="card flex-column">
        <div class="top flex-row" style="background-image: url('../public/res/images/${autor.short}.png')" >
            <div class="overlay" style="background-color: var(--${autor.perioada})"></div>
            <h2 class="tit" >${autor.name}</h2>
        </div>
        <div class="bottom flex-column">
            <h3>${autor.perioadaName}</h3>
            <p>${autor.date}</p>
            <div class="flex-row ui">
                <a href="/autori/${autor.short}">Read more</a>
                <div class="flex-row">
                    <p>Compara</p>
                    <img src="../public/res/UI/check.svg"/>
                </div>
            </div>
            
        </div>
    </div>
    `
    return AUTOR;

}