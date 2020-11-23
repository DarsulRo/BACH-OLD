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
        await loadCurente()
        loading.style.display='none'
        hideMenu()
    })
})

//LOAD CURENTE
var curenteBTN = document.querySelector('[option=curente]')
curenteBTN.addEventListener('click',loadCurente)
async function loadCurente(){
    let curente = await (await fetch('/getallcurente')).json()
    
}