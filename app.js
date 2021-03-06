const checkEmail = document.getElementById('checkEmail');
const wrongEmailDiv = document.getElementById('wrong-email');
const imageDiv = document.getElementById('image-container')
const emailImg = []

let tempUrl = '';

// Use fetch api to get image from unsplash
// When promise is resolved sets imageDiv html to the called image

function getImage() {
    fetch(`https://source.unsplash.com/600x400/?archery`).then(function (response) {
        tempUrl = response.url;
        imageDiv.innerHTML = `<img src="${tempUrl}">`
    })
}

function wrongEmail() {
    wrongEmailDiv.innerHTML = "<p>Please enter an email address</p>"
}

function runEmailValidation(email){
    if (email.indexOf("@") != -1) {

        // Check that email has a dot after the @

        if (email.indexOf("@") < email.lastIndexOf(".")) {

            // Check that there are characters after the final dot

            if (email.lastIndexOf('.') < email.length - 1) {
                let emailExists = false;
                for (let x = 0; x < emailImg.length; x++) {

                    // If email exists in array then store new image

                    if (email === emailImg[x].name) {
                        emailImg[x].count ++;
                        emailImg[x].pictures.push(tempUrl);
                        emailExists = true;
                        break;
                    }
                }
                // If email doesn't exist create object and store image 

                if (!emailExists) {
                    const obj = {
                        name: email,
                        count: 1,
                        pictures: [tempUrl]
                    }
                    emailImg.push(obj)
                }
                // Get new image from api
                getImage();
            }
            else {
                wrongEmail();
            }
        }
        else {
            wrongEmail();
        }
    }
    else {
        wrongEmail();
    }
}

function addImage(){
    // Store string that add list of images
    let temp = "<div class='stored'>";
    for (let i = 0; i < emailImg.length; i++) {
        temp += "<h3>" + emailImg[i].name + " currently has " + emailImg[i].pictures.length + " images saved:</h3><ul>";
        for (let b = 0; b < emailImg[i].pictures.length; b++) {
            let jreal = b + 1
            temp +=`<a href='${emailImg[i].pictures[b]}' target="_blank">Picture ` + jreal + "</a>";
        }
        temp += "</ul><br>";
    }
    temp += "</div>";
    document.getElementById('stored').innerHTML = temp;
}

// Call getImage once 

getImage();

checkEmail.addEventListener('click', function() {
    emailValidation()
});

var emailValidation = () => {
    wrongEmailDiv.innerHTML = "";
    let email = document.getElementById('email').value;
    // Check that email contains @
    runEmailValidation(email)    

    // Store string that add list of images
    // Add Image to list
    addImage()
}