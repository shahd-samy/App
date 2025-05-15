
// Variables

const categoryUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const areaUrl = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
const ingredientUrl = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
let currentli = "";
let flag;


// regex
let validatename = /^[a-zA-Z]{1,}$/;
let validatemail = /^[^.@]{1,20}(@gmail\.com)$/;
let validatephone = /^01[0125][0-9]{8}$/;


// Nav-Bar
let wd = $('.black-nav').outerWidth(true);
$('.nav-btns i').on('click', function () {

    if ($(this).hasClass('fa-bars')) {
        if (wd == 0) {
            $('.black-nav').css('width', 'auto');
            wd = $('.black-nav').outerWidth(true);

        }
        $('.black-nav').css('width', '0px');
        $('.black-nav').animate({ width: wd }, 600, function () {
               $('.black-nav nav li').show(); 
                $('.black-nav nav .li1').addClass('animate__animated animate__fadeInUp ');
                $('.black-nav nav .li2').addClass('animate__animated animate__fadeInUp animate__delay-1s');
                $('.black-nav nav .li3').addClass('animate__animated animate__fadeInUp animate__delay-2s');
                $('.black-nav nav .li4').addClass('animate__animated animate__fadeInUp animate__delay-3s');
                $('.black-nav nav .li5').addClass('animate__animated animate__fadeInUp animate__delay-4s');

        });

    }

    else {

        $('.black-nav').animate({ width: 0 }, 600, function () {
        });
        $('.black-nav nav li').slideUp(200);

    }


    $(this).toggleClass('fa-bars fs-2 fa-xmark fs-1');
    //console.log($(this).attr('class'));

})


$(document).on('click', '.card', function () {
            $('.black-nav').animate({ width: 0 }, 600);
    $('.white-nav .nav-btns i').toggleClass('fa-bars fs-2 fa-xmark fs-1');

});





// Functions

function isValid(inputname, errorp, regex) {

    flag = false;
    let name = $(`#${inputname}`).val();
    if (name != "") {

        if (regex.test(name)) {
            $(`.${errorp}`).addClass('d-none');
            flag = true;
        }
        else {
            $(`.${errorp}`).removeClass('d-none');
            flag = false;
        }
    }
    return flag;
}

function isValidPassword() {
    flag = false;
    let password = $('#inputPassword').val();
    if (password != "") {

        if (password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password)) {
            $('.passError').addClass('d-none');
            flag = true;
        }
        else {
            $('.passError').removeClass('d-none');
            flag = false;
        }
    }
    return flag;
}

function isValidRePassword() {
    flag = false;

    let password = $('#inputPassword').val();
    let repassword = $('#inputRepassword').val();
    if (repassword != "") {
        if (password == repassword) {
            $('.repassError').addClass('d-none');
            flag = true;
        }
        else {
            $('.repassError').removeClass('d-none');
            flag = false;
        }
    }
    return flag;
}

function isValidAge() {
    flag = false;
    let age = $('#inputAge').val();
    if (age != "") {

        if (age > 0 && age < 100) {
            $('.ageError').addClass('d-none');
            flag = true;
        }
        else {
            $('.ageError').removeClass('d-none');
            flag = false;
        }
    }
    return flag;
}

function isValidForm() {

    if (!isValid("inputName", "nameError", validatename)) flag = false;
    if (!isValid("inputEmail", "emailError", validatemail)) flag = false;
    if (!isValid("inputPhone", "phoneError", validatephone)) flag = false;
    if (!isValidAge()) flag = false;
    if (!isValidPassword()) flag = false;
    if (!isValidRePassword()) flag = false;

    if (flag == true) {
        $('form button').removeClass('disabled');
    } else {
        $('form button').addClass('disabled');
    }
}


function showSection(sectionname) {
    $('.home,.details,.display,.filter,.searchsection,.contact').hide();
    $(sectionname).show();
}

async function displayCards() {

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    const data = await response.json();
    const meals = data.meals;

    $('.home').show();
    $('.home .cards').html("");

    for (var i = 0; i < 20; ++i) {

        let mealimg = meals[i].strMealThumb;
        let mealname = meals[i].strMeal;

        let card = `<div class="col-12 col-md-3">
                        <div class="card bg-black">
                            <img src="${mealimg}" class="card-img w-100 h-100" alt="${mealname}">
                            <div class="card-img-overlay d-flex align-items-center top-100">
                                <h3 class="card-title text-black">${mealname}</h3>
                            </div>
                        </div>
                    </div>
                        `

        $('.home .cards').append(card);

    }
}

async function display(url, name) {

    const response = await fetch(url);
    const data = await response.json();
    const meals = data.meals || data.categories;
    $('.display .cards').html("");

    if (name == "category") {

        for (let i = 0; i < meals.length; ++i) {

            let categoryimg = meals[i].strCategoryThumb;
            let categoryname = meals[i].strCategory;
            let categoryDescription = meals[i].strCategoryDescription ? meals[i].strCategoryDescription.substring(0, 134) : "";

            let card = `<div class="col-12 col-md-3">
                        <div class="card bg-black">
                            <img src="${categoryimg}" class="card-img w-100 h-100" alt="${categoryname}">
                            <div class="card-img-overlay d-flex flex-column align-items-center text-center top-100">
                                <h3 class="card-title text-black">${categoryname}</h3>
                                <p>${categoryDescription}</p>
                            </div>

                        </div>
                    </div>
                        `
            $('.display .cards').append(card);

        }

    }

    else if (name == "area") {
        for (let i = 0; i < meals.length; ++i) {

            let areaname = meals[i].strArea;

            let card = `<div class="col-12 col-md-3">
                        <div class="card bg-black text-white text-center">
                        <i class="fa-solid fa-house-laptop" style="font-size: 4em;"></i>
                            <h3 class="card-title">${areaname}</h3>
                        </div>
                    </div>
                        `
            $('.display .cards').append(card);
        }
    }

    else if (name == "ingredient") {

        for (let i = 0; i < meals.length; ++i) {

            let ingredientname = meals[i].strIngredient;
            let ingredientDesc = meals[i].strDescription ? meals[i].strDescription.substring(0, 134) : "";

            let card = `<div class="col-12 col-md-3">
                        <div class="card bg-black text-white text-center">
                        <i class="fa-solid fa-drumstick-bite"style="font-size: 4em;"></i>
                            <h3 class="card-title">${ingredientname}</h3>
                            <p>${ingredientDesc}</p>
                        </div>
                    </div>
                        `
            $('.display .cards').append(card);
        }

    }


}

async function filter(type, key, searchname) {

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${type}.php?${key}=${searchname}`)
    const data = await response.json();
    const meals = data.meals;
    let len = Math.min(20, meals.length);

    if (type == "search") {
        len = meals.length;
    }

    $('.filter .cards').html("");
    $('.searchResult .cards').html("");

    for (let i = 0; i < len; ++i) {

        let img = meals[i].strMealThumb;
        let name = meals[i].strMeal;

        let card = `<div class="col-12 col-md-3">
                        <div class="card bg-black">
                            <img src="${img}" class="card-img w-100 h-100" alt="${name}">

                            <div class="card-img-overlay d-flex">
                                <h3 class="card-title text-black align-self-center">${name}</h3>
                            </div>

                        </div>
                    </div>
                        `

        if (type == "search") {
            if (key == "s" && name.toLowerCase().includes(searchname)) {
                $('.searchResult .cards').append(card);
            }
            else if (key == "f" && name[0].toLowerCase() == searchname) {
                $('.searchResult .cards').append(card);
            }

        }

        if (type != "search")
            $('.filter .cards').append(card);

    }
}

async function showMealDetail(meal) {


    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    const data = await response.json();
    const meals = data.meals[0];
    let mealimg = meals.strMealThumb;
    let mealname = meals.strMeal;
    let mealinstructions = meals.strInstructions;
    let mealarea = meals.strArea;
    let mealcategory = meals.strCategory;
    let mealSource = meals.strSource;
    let mealsYoutube = meals.strYoutube;
    $('.details-container').html("");


    let tagsHtml = "";
    let mealtags = meals.strTags;
    if (mealtags != null) {
        mealtags = mealtags.split(",");
        for (let i of mealtags) {
            if (i != "")
                console.log(i);
            tagsHtml += `<li class="alert alert-danger me-3 p-1">${i}</li>`;
        }
    }


    let recipeHtml = "";
    for (let i = 1; i < 21; ++i) {
        let mealrecipe = meals[`strMeasure${i}`] + " " + meals[`strIngredient${i}`];
        if (meals[`strMeasure${i}`] != "" && meals[`strIngredient${i}`] != "") {
            //console.log(meals[`strMeasure${i}`] );
            recipeHtml += `<li class="alert alert-info me-3 p-1">${mealrecipe}</li>`;
            mealrecipe = "";
        }

    }

    let detailsHtml = `
                    <div class="col-md-4 ">
                        <img src="${mealimg}" class="w-100 bg-danger rounded-3" alt="${meal}">
                        <h2 class="title">${meal}</h2>
                    </div>

                     <div class="col-md-8">

                        <h2>Instructions</h2>
                        <p>${mealinstructions}</p>
                        <h3><span class="fw-bold">Area : </span>${mealarea}</h3>
                        <h3><span class="fw-bold">Category : </span>${mealcategory}</h3>
                        <h3><span>Recipes : </span></h3>
                        <ul class="list-unstyled d-flex align-items-start ms-2 mt-3 mb-2 flex-wrap">
                          ${recipeHtml}
                        </ul>

                        <h3>Tags :</h3>
                        <ul class="list-unstyled d-flex align-items-start ms-2 mt-3 mb-2">
                           ${tagsHtml}
                        </ul>

                         <ul class="list-unstyled">
                            <a href="${mealSource}" class="btn btn-success">Source</a>
                            <a href="${mealsYoutube}" class="btn btn-danger">Youtube</a>
                        </ul>

                    </div>
                        `

    $('.details-container').append(detailsHtml);
}



function displayEvent(name, url, key) {

    $(`.black-nav .${name}`).on('click', async function () {

        $(".loading").show();
        $(".loading").css({ "z-index": "1" });
        $('.black-nav').animate({ width: 0 });
        $('.nav-btns i').toggleClass('fa-bars fs-2 fa-xmark fs-1');
        showSection($('.display'));
        currentli = key;
        await display(url, name);
        $(".loading").fadeOut(500);

    });
}
function showDetailEvent(name) {
    $(`.${name} .cards`).on('click', async function (e) {

        let clickedimg = $(e.target).closest('.card');
        const name = clickedimg.find('h3').html();
        $(".loading").show();
        $(".loading").css({ "z-index": "1" });
        showSection($('.details'));
        await showMealDetail(name);
        $(".loading").fadeOut(500);

    });

}








// Events

$('.inputname').on('input', async function () {
    let inputname = $('.inputname').val().toLowerCase();
    $(".loading").show();
    $(".loading").css({ "z-index": "1" });

    await filter("search", "s", inputname);
    $(".loading").fadeOut(500);

})
$('.inputletter').on('input', async function () {
    let inputletter = $('.inputletter').val().toLowerCase();
    $(".loading").show();
    $(".loading").css({ "z-index": "1" });

    await filter("search", "f", inputletter);
    $(".loading").fadeOut(500);

})


$('.display .cards').on('click', async function (e) {

    let clickedimg = $(e.target).closest('.card');
    const mealname = clickedimg.find('h3').html();
    $(".loading").show();
    $(".loading").css({ "z-index": "1" });
    showSection($('.filter'));
    await filter("filter", currentli, mealname);
    $(".loading").fadeOut(500);

});

$('.searchResult .cards').on('click', async function (e) {

    let clickedimg = $(e.target).closest('.card');
    const name = clickedimg.find('h3').html();
    $(".loading").show();
    $(".loading").css({ "z-index": "1" });
    showSection($('.details'));
    await showMealDetail(name);
    $(".loading").fadeOut(500);

});

$('.black-nav .search').on('click', async function () {

    $('.black-nav').animate({ width: 0 });
    $('.nav-btns i').toggleClass('fa-bars fs-2 fa-xmark fs-1');
    showSection($('.searchsection'));
})

$('.black-nav .contactus').on('click', function () {
    $('.black-nav').animate({ width: 0 });
    $('.nav-btns i').toggleClass('fa-bars fs-2 fa-xmark fs-1');
    showSection($('.contact'));
})




$('#inputName').on('input', function () {
    isValid("inputName", "nameError", validatename);
    isValidForm();
});

$('#inputEmail').on('input', function () {
    isValid("inputEmail", "emailError", validatemail);
    isValidForm();
});

$('#inputPhone').on('input', function () {
    isValid("inputPhone", "phoneError", validatephone);
    isValidForm();
});

$('#inputAge').on('input', function () {
    isValidAge();
    isValidForm();
});

$('#inputPassword').on('input', function () {
    isValidPassword();
    isValidForm();
});

$('#inputRepassword').on('input', function () {
    isValidRePassword();
    isValidForm();
});

$('.searchsection').hide();
$('.contact').hide();








// Calling

displayCards();

displayEvent("category", categoryUrl, "c");
displayEvent("area", areaUrl, "a");
displayEvent("ingredient", ingredientUrl, "i");

showDetailEvent("filter");
showDetailEvent("home");



jQuery(function () {
    $(".loading").fadeOut(2000, function () {
        $('body').css({ overflow: 'auto' })
    })
})



