<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/index.css">
    <script src="js\wishlist.js"></script>
    <title>Project 4 Index</title>
</head>
<body>
    
    <div class="flex-container">

        <div class ="displayName">
            <p>
                Welcome
            </p>
            
            <!--get username from php-->
            <p id = "displayName">
                <?php
                        echo $_GET['x'];   
                ?>
            </p>
            
        </div>

        <div>
            <header>
                <img src="./images/books.png" alt="bookes" width="100" height="100">
                <h1 class="head">The Book Store</h1>
                <img src="./images/books.png" alt="bookes" width="100" height="100">
            </header>

        </div>

        <div>
            <main>


                <div class="search-bar">
                    <label for="find">Search By: </label>
                    <select name="find" id="find">
                        <option value="Author">Author</option>
                        <option value="Title">Title</option>
                        <option value="ISBN">ISBN</option>
                    </select>

                    <label for="search">Looking For</label>
                    <input type="text" id="search" placeholder="Seacrh...">
                    <button id="submit">Go</button>
                </div>

                <div class="result-table">
                    <table class ="table" id = "table">
                        <thead>
                            <tr>
                                <th>Author</th>
                                <th>Title</th>
                                <th>ISBN</th>
                                <th>Genre</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>------------------</th>
                                <th>------------------</th>
                                <th>------------------</th>
                                <th>------------------</th>
                                <th>------------------</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>

        <div>
            <label for="selectBook">Select Book by ISBN: </label>
                <select name="selectBook" id="selectBook">
                </select>
        </div>

        <div class="create">
    
            <button id="btn-submit-wishlist">Add to Wishlist</button>
            
         </div>

         <div class="getWishlist">
    
            <button id="btn-get-wishlist">View Wishlist</button>
            
         </div>

         <div class="wishlist-table">
                    <table class ="table2" id = "table2">
                        <thead>
                            <tr>
                                <th>ISBN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                
                            </tr>
                        </tbody>
                    </table>
         </div>


        <div>
            <footer><h3>© 2023 Book Store, LLC.</h3></footer>
        </div>
    </div>

    
    

</body>
</html>