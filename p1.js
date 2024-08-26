const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', () => {
    const handIcon = document.querySelector('.home-content i.bxs-hand');
    handIcon.style.color = 'yellow'; // Change color of the hand icon

    // Apply animation
    const heading = document.querySelector('.home-content h1');
    heading.classList.add('fade-in');
});
document.addEventListener('DOMContentLoaded', () => {
    const handIcon = document.querySelector('.home-content i.bxs-hand');
    handIcon.style.color = 'yellow'; // Change color of the hand icon
});




function toggleText(button) {
    // Get the next sibling element (the .more-text paragraph)
    var moreText = button.previousElementSibling;
    
    // Toggle the 'visible' class on the .more-text paragraph
    if (moreText.classList.contains('visible')) {
        moreText.classList.remove('visible');
        button.textContent = 'read more'; // Change button text
    } else {
        moreText.classList.add('visible');
        button.textContent = 'read less'; // Change button text
    }
}


// contact
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');

    if (name.value.length < 5 || name.value.length > 10) {
        result.innerHTML = "Full Name must be between 5 and 10 characters";
        result.style.color = "red";
        result.style.display = "block"; // Ensure error message is shown
        return;
    }

    if (!phone.checkValidity()) {
        result.innerHTML = "Phone Number must be exactly 10 digits";
        result.style.color = "red";
        result.style.display = "block"; // Ensure error message is shown
        return;
    }

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";
    result.style.color = "black";
    result.style.display = "block"; // Ensure the result message is shown

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                result.style.color = "green";
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.style.color = "red";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none"; // Hide the result message after 3 seconds
            }, 3000);
        });
});

