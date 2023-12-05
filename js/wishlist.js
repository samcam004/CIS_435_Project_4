function start() {
    //button for getting books from search
    const getButton = document.getElementById('submit');
    getButton.onclick = getButtonClick;

    //button for adding book to wishlist
    const addButton = document.getElementById('btn-submit-wishlist');
    addButton.onclick = createButtonClick;
}

//get data when cliking button
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

  //update dropdown for wishlist
  let select = document.getElementById("selectBook"); 
  select.innerHTML="";
    
    //add names to drop down list
    for( let i=0;i<responseData.length;i++){ 

      let el = document.createElement("option");
      el.textContent = responseData[i][2];
      el.value = responseData[i][2];
      select.appendChild(el);
      
    }

}

async function createButtonClick(){
  //get isbn and username
  let username = (document.getElementById('displayName')).innerText;
  let ISBN =(document.getElementById('selectBook')).value;

  await create(username,ISBN);
  
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

//use POST to send data to php
async function create(username,ISBN) {
    
  try {
      await fetch(
          'http://localhost/CIS_435_Project_4/php/addWishlist.php', 
          {
              method: 'POST',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              
              //pass data 
              body: JSON.stringify({
                  0: username,
                  1: ISBN
              })
          }
      );

  }
  catch(error) {
    console.log("error");
  }
}


window.addEventListener('load', start);