function start() {
    //handle create account
    const createButton = document.getElementById('btn-submit-data');
    createButton.onclick = createButtonClick;

    //handle query for book
    const getButton = document.getElementById('submit');
    getButton.onclick = getButtonClick;
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

async function getButtonClick(){
  //get data from input boxes
  let type = (document.getElementById('find')).value;
  let input =(document.getElementById('search')).value;

  //receive data
  let responseData = await get(type,input);

  //select table
  let tableBody =  document.getElementById('table').getElementsByTagName('tbody')[0];

  //clear table
  while(tableBody.rows.length > 0) {
    tableBody.deleteRow(0);
  }

  //iterate through book array
  for (let i =0; i< responseData.length;i++){
    row = tableBody.insertRow(-1);

    //add for each info
    for (let k =0;k<5;k++){
      cell = row.insertCell(k);
      text = document.createTextNode(responseData[i][k]);
      cell.appendChild(text);
    }

  }
}

//use POST to send data to php
async function create(username,password,email) {
    
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

async function get(type,input) {
  let result = "";

  try {
      const response = await fetch(
        'http://localhost/CIS_435_Project_4/php/searchBook.php', 
          {
              method: 'POST',
              headers: {
                  'Accept' : 'application/json'
              },

              
              //pass data 
              body: JSON.stringify({
                0: type,
                1: input,
            })

          }
      );
      result = await response.json();
      
  }
  catch(error) {
      console.log("error");
  }
  return result;
}


window.addEventListener('load', start);