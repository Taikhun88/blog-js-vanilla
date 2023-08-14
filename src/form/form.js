import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
let errors = [];

form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    // final version
    const article = Object.fromEntries(formData.entries());

    if (formIsValid(article)) {
        const json = JSON.stringify(article);
        // fetch
    }});
    
    const formIsValid = (article) => {
        if (!article.author || !article.cateogry || !article.content) {
            errors.push('Vous devez renseigner tous les champs')
        } else {
            errors = [];
        }
        if (errors.length) {
            let errorHTML = '';
            errors.forEach( (e) => {
                errorHTML += `<li>${ e }</li>`
            })
            errorElement.innerHTML = errorHTML;
        } else {
            errorElement.innerHTML = '';
        }
    }
    // Appelée dans la version optimisée ++
    // const entries = formData.entries();

    // version longue
    // const obj = Array.from(entries).reduce( (acc, value) => {
    //     acc[value[0]] = value[1];
    //     return acc;
    // }, {});

    // version optimisée +
    // const obj = Object.fromEntries(entries);
    // const json = JSON.stringify(obj);

    // version optimisée ++
    // const json = JSON.stringify(Object.fromEntries(formData.entries()));