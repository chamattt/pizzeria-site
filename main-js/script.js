//initial data

//events
document.querySelector('.menu-toggle').addEventListener('click',toggleMenu)



//functions

function toggleMenu(){
    document.querySelector('.header-pages--container').classList.add('header-pages--active')
    document.querySelector('.header-pages--container').classList.add('slide-menu')

    document.body.classList.add('no-scroll')
    document.querySelector('.menu-background').classList.add('menu-background--active')
    
    document.querySelector('.mobile-menu--closer').addEventListener('click',()=>{
        document.querySelector('.header-pages--container').classList.remove('slide-menu') 
        document.querySelector('.header-pages--container').classList.add('slide-menu-out')

        setTimeout(()=>{
            document.querySelector('.header-pages--container').classList.remove('slide-menu-out') 
            document.querySelector('.header-pages--container').classList.remove('header-pages--active')
            document.body.classList.remove('no-scroll')
            document.querySelector('.menu-background').classList.remove('menu-background--active')
        },700)
        
    })
}

