function start() {
    //handle create account
    const createButton = document.getElementById('btn-submit-data');
    createButton.onclick = createButtonClick;
}

//create button, passes html data to php
async function createButtonClick(){

    //get data from input boxes
    let username = (document.getElementById('username')).value;
    let password = (document.getElementById('password')).value;
    let email = (document.getElementById('email')).value;
  
    //pass data and call php
    await create(username,password,email);
  }

//use POST to send data to php
async function create(username,password,email) {
    console.log(username);
    console.log(password);
    console.log(email);
    try {
        await fetch(
            'http://localhost/CIS_435_Project_4/php/createAccount.php', 
            {
                method: 'POST',
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                },
                
                //pass data 
                body: JSON.stringify({
                    0: username,
                    1: password,
                    2: email
                })
            }
        );
  
    }
    catch(error) {
      console.log("error");
    }
  }


window.addEventListener('load', start);