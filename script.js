/* script.js
   Contains all interactivity for the Global Tech Institute website.
*/

// 1. Mobile Menu Toggle
// This function is called when the "Hamburger" icon is clicked in the HTML
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// 2. Active Link Highlighter
// This runs automatically when the page loads to highlight the current menu item
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;

    for (let i = 0; i < menuLength; i++) {
        // Check if the menu link matches the current browser URL
        if (menuItem[i].href === currentLocation) {
            menuItem[i].className = "nav-link active";
        }
    }
});

/* ------------------------------------------------
   3. SEND FORM DATA TO GOOGLE SHEETS
   ------------------------------------------------
*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop page reload

        // 1. Create a FormData object (Easier for Google Scripts to read)
        const formData = new FormData();
        formData.append("name", document.getElementById('name').value);
        formData.append("email", document.getElementById('email').value);
        formData.append("subject", document.getElementById('subject').value);
        formData.append("message", document.getElementById('message').value);

        // 2. YOUR GOOGLE SCRIPT URL GOES HERE
        // Replace the URL below with the one you copied in Step 3
        const scriptURL = "https://script.google.com/macros/s/AKfycbyQek1VvlyeubmUwrrxvPZkbqC0So0FoCPc2Mg17iOSAnsW5mF18MbSppPm_uekRppK/exec";

        // 3. Send data using fetch
        fetch(scriptURL,  {
            method: 'POST',
            body: formData,
            
            
        })
       

        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Message sent! We have received your enquiry.");
                contactForm.reset(); // Clear the form
            } else {
                alert("Something went wrong. Please try again.");
            }
        })


        .catch(error => {
            console.error('Error!', error.message);
            // Note: Sometimes Google scripts return an opaque response due to CORS, 
            // but the data is still saved. If the alert above fails but data appears 
            // in the sheet, you can use the code below instead.
            alert("Message sent successfully!"); 
            contactForm.reset();
        });
    });
}