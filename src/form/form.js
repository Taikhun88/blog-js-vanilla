import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
const btnCancel = document.querySelector('.btn-secondary');
let articleId;
let errors = [];

const fillForm = (article) => {
    const author = document.querySelector('input[name="author"]');
    const img = document.querySelector('input[name="img"]');
    const category = document.querySelector('input[name="category"]');
    const title = document.querySelector('input[name="title"]');
    const content = document.querySelector('textarea');

    author.value = article.author || "";
    img.value = article.img || "";
    category.value = article.category || "";
    title.value = article.title || "";
    content.value = article.content || "";
}

const initForm = async () => {
    const params = new URL(location.href);
    articleId = params.searchParams.get('id');
    
    if (articleId) {
        const response = await fetch(`https://restapi.fr/api/article/${ articleId }`);
        if (response.status < 300) {
            const article = await response.json();
            fillForm(article);
        }
    }
}

initForm();

btnCancel.addEventListener('click', () => {
    location.assign('/index.html');
})

form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);
    // final version
    const article = Object.fromEntries(formData.entries());

    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            let response;
            if (articleId) {
                response = await fetch(`https://restapi.fr/api/article/${ articleId }`, {
                    method: "PATCH",
                    body: json,
                    headers: {
                        'Content-Type': "application/json",
                    }
                });
            } else {
                response = await fetch('https://restapi.fr/api/article/', {
                    method: "POST",
                    body: json,
                    headers: {
                        'Content-Type': "application/json",
                    }
                });
            }
            if (response.status < 299) {
                location.assign('/index.html');
            }
        } catch (e) {
            console.log('e :', e);
        }
    }
});

const formIsValid = (article) => {
    errors = [];
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