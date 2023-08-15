import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
let errors = [];

form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);
    // final version
    const article = Object.fromEntries(formData.entries());

    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            const response = await fetch('https://restapi.fr/api/article', {
                method: "POST",
                body: json,
                headers: {
                    'Content-Type': "application/json",
                }
            });
            // const body = await response.json();
            // console.log(body);
            window.location.href = "index.html";
        } catch (e) {
            console.log('e :', e);
        }
    }
});

const formIsValid = (article) => {
    if (!article.author || !article.category || !article.content || !article.img || !article.title) {
        errors.push('Vous devez renseigner tous les champs')
    } else {
        errors = [];
    }
    if (errors.length) {
        let errorHTML = '';
        errors.forEach((e) => {
            errorHTML += `<li>${e}</li>`
        })
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
};
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