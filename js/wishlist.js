function start() {
    //button for getting books from search
    const getButton = document.getElementById('submit');
    getButton.onclick = getButtonClick;

    //button for adding book to wishlist
    const addButton = document.getElementById('btn-submit-wishlist');
    addButton.onclick = addButtonClick;

    //button for view wishlist
    const viewButton = document.getElementById('btn-get-wishlist');
    viewButton.onclick = viewButtonClick;
}

//get data when cliking button
async function getButtonClick(){
  //get data from input boxes
  let type = (document.getElementById('find')).value;
  let input =(document.getElementById('search')).value;

  //receive data
  let responseData = await get(type,input);

  //select table
  let tableID =  document.getElementById('table').getElementsByTagName('tbody')[0];

  //clear table
  while(tableID.rows.length > 0) {
    tableID.deleteRow(0);
  }

  //iterate through book array
  for (let i =0; i< responseData.length;i++){
    row = tableID.insertRow(-1);

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
    
    //add to drop down list
    for( let i=0;i<responseData.length;i++){ 

      let el = document.createElement("option");
      el.textContent = responseData[i][2];
      el.value = responseData[i][2];
      select.appendChild(el);
      
    }

}

//handle get wishlist function
async function viewButtonClick(){
  let username = (document.getElementById('displayName')).innerText;
  let responseData  = await view(username);

  //get table id
  let tableID =  document.getElementById('table2').getElementsByTagName('tbody')[0];

  //clear table
  while(tableID.rows.length > 0) {
    tableID.deleteRow(0);
  }

  for (let i =0; i< responseData.length;i++){
    row = tableID.insertRow(-1);

    //add for each info
    
    cell = row.insertCell(0);
    text = document.createTextNode(responseData[i][2]);
    cell.appendChild(text);
  

  }

}

//handle add to wishlist fucntion
async function addButtonClick(){
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

async function view(username) {
  let result = ""; 

  try {
      const response = await fetch(
        'http://localhost/CIS_435_Project_4/php/getWishlist.php', 
          {
              method: 'POST',
              headers: {
                  'Accept' : 'application/json'
              },

              
              //pass data 
              body: JSON.stringify({
                0: username
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