/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("[data-nav]");
const navMenu = document.querySelector('nav');
let timer = null;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Check if an element is currently at the display area
function onSpot(element){
    const boundries = element.getBoundingClientRect();
    return (boundries.top >=0 &&  boundries.top <= 150);
}

// Construct a new link element for the nav menu
function constructLink(element){
    const linkData = {
        id: element.getAttribute("id"),
        text: element.getAttribute("data-nav"),
        class: 'menu__link'
    };
    return (
        `<a id=${linkData.id}_link href='#${linkData.id}' class=${linkData.class}>
            ${linkData.text}
        </a>`);
}

// Add active class to an element
function setActive(elem, focused){
    if (focused){
        elem.classList.add("active");
    }else{
        elem.classList.remove("active");
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav (){
    const navBarUl = document.querySelector("#navbar__list");
    for(const section of sections){
        const li = document.createElement("LI");
        li.innerHTML = constructLink(section);
        navBarUl.appendChild(li);
    } 
}

// set the active element
function activateSection(){
    for(const section of sections){
        const focused = onSpot(section.firstElementChild);
        setActive(section, focused);
        if(focused){
            const menu_link = document.querySelector(`#${section.getAttribute('id')}_link`);
            activateMenuLink(menu_link);
        }
    }
}

// Activate menu links
function activateMenuLink(elem){
    const menu_items = document.querySelectorAll('.menu__link');
        menu_items.forEach(item =>{
            setActive(item, false);
        });
        setActive(elem, true);
}

// Scroll to anchor ID 
function scrollToSection(elem){
    const sectionID = elem.getAttribute('href');
    const section = document.querySelector(sectionID);
    const LandingContainer = section.firstElementChild;
    LandingContainer.scrollIntoView({behavior: 'smooth'});
}

// Hide or show the navbar based on the scrolling action
function toggleNavBar(){
    if (timer !== null){
        navMenu.style.display = 'block';
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        navMenu.style.display = 'none';
    }, 3000);
}

// Check if the page is scrolled down or not to show the Back To Top button
function checkToTopBtn(){
    const btn  = document.querySelector('#toTopBtn');
    const body_scrollTop = document.body.scrollTop;
    const document_scrollTop = document.documentElement.scrollTop;

    if (body_scrollTop > 50 || document_scrollTop > 50){
        btn.style.display = 'block';
    }else{
        btn.style.display = 'none';
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", buildNav);

// Handle link and button clicks
document.addEventListener("click", (event) => {
    const tagName = event.target.tagName;
    switch (tagName){
        case "A":
            // Scroll to section and activate menu links
            if (event.target.classList.contains('menu__link')){
                scrollToSection(event.target);
                activateMenuLink(event.target);
            }else {
            // Collapse sections
                if(event.target.classList.contains('collapsible')){
                    const content_div = event.target.parentElement.nextElementSibling;
                    const current_display = content_div.style.display;
                    switch(current_display){
                        case 'none':
                            content_div.style.display = 'block';
                            break;
                        case 'block':
                            content_div.style.display = 'none';
                            break;
                        default:
                            content_div.style.display = 'block';
                    }
                }
            }
            event.preventDefault();
            break;
        case "BUTTON":
            // show Back to Top button
            if (event.target.getAttribute('id')==='toTopBtn'){
                [document.body.scrollTop, document.documentElement] = [0, 0];
            }
            break;
    } 
}, true)

// Set sections as active
document.addEventListener('scroll', () => {
    toggleNavBar();
    activateSection();
    checkToTopBtn();
});



