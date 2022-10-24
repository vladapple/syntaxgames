
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- cdn Bootstrap icon -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="styles/forms.css">
    <link rel="stylesheet" href="styles/index.css">

    <script  src="data_source/contact.json"></script>
    <script  src="scripts/contact.js"></script>
    <script  src="scripts/chat_bot.js"></script>


    <!-- Favicon–––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon_white.png" />
    <title>Contact Us: Syntax Games</title>
                                                    
</head>

<body class="contact">
    <!-- Header and Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
        <div class="container">
            <a href="index.html" class="navbar-brand"><img src="images/SyntaxGames-logos_white_banner.png"
                    alt="logo-banner" style="height:4rem;" class="sg-logo"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">Games</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="games/game1.html">Ascii's Quest</a>
                            <a class="dropdown-item" href="games/game2.html">Monster Hunter</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">Contact</a>
                    </li>
                    <li class="nav-item">
                        <a href="about.html" class="nav-link">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact-fr.html" class="nav-link">French/Français</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contact US Section -->
    <section class="ftco-section" id="disappear">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="wrapper">
                        <div class="row no-gutters">
                            <div class="col-md-6 d-flex align-items-stretch">
                                <div class="contact-wrap w-100 p-md-5 p-4 py-5   bg-dark">
                                    <h3 class="mb-4 yellow">Get In Touch</h3>
                                    <div id="form-message-warning" class="mb-4"></div>
                                   
                                    <?php
                                        if(isset($_POST["Submit"])){

                                            $name = $_POST['name'];
                                            $email = $_POST['email'];
                                            $phone = $_POST['txtPhone'];
                                            $message = $_POST['txtMessage'];

                                            $data["name"] = $name; 
                                            $data["email"] = $email;
                                            $data["phone"] = $phone;
                                            $data["message"] = $message;

                                            $jsonContent = file_get_contents('data_source/contact.json');
                                            $tempArray = json_decode($jsonContent);
                                            array_push($tempArray, $data);
                                            $jsonData = json_encode($tempArray);
                                            file_put_contents('data_source/contact.json', $jsonData);

                                            echo "<h5 class='green'>Thank you for contacting us!</h5>";             
                                        }      
                                    ?> 
                                    <form id="contactForm" name="frmContact" class="contactForm" method="POST" onsubmit="return validateForm()">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="name" 
                                                        id="name" placeholder="Name *" onclick = "changeBg('name');">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="email" 
                                                        id="email" placeholder="email@email.com *" onclick = "changeBg('email');">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="txtPhone"
                                                        id="txtPhone" placeholder="Phone">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <textarea name="txtMessage" class="form-control" id="txtMessage"
                                                        cols="30" rows="4" placeholder="Message"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="submit" class="btn btn-outline-warning btn-lg"
                                                        name="Submit" id="Submit" value="Send Message" onclick="contactSubmit();">
                                                    <div class="submitting"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <!-- end form -->
                                </div>
                            </div>
                            <div class="col-md-6 d-flex align-items-stretch">
                                <div class="info-wrap w-100 p-md-5 p-4 py-5 img">
                                    <h3>Contact information</h3>
                                    <p class="mb-4 grey">Do you want to chat? <input type="button" class="btn btn-outline-warning btn-sm"
                                                        name="chatbot" id="chatbot" value="Click here!" onclick="chatBot();"></p>
                                    <div class="dbox w-100 d-flex align-items-start">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-map-marker"></span>
                                        </div>
                                        <div class="text pl-3">
                                            <p><span>Address:</span> <span style="color:grey;">21th Street, Office 721
                                                    Montreal QC 2H1 5Z7</span></p>
                                        </div>
                                    </div>
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-phone"></span>
                                        </div>
                                        <div class="text pl-3">
                                            <p><span>Phone:</span> <a href="#">1 514-435-7412</a></p>
                                        </div>
                                    </div>
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-paper-plane"></span>
                                        </div>
                                        <div class="text pl-3">
                                            <p><span>Email:</span> <a href="#">info@syntaxgames.com</a></p>
                                        </div>
                                    </div>
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <div class="icon d-flex align-items-center justify-content-center">
                                            <span class="fa fa-globe"></span>
                                        </div>
                                        <div class="text pl-3">
                                            <p><span>Website:</span> <a href="#">syntax-games.com</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end Contact us section -->

    <!-- chat bot section -->
    <section class="ftco-section" id="appear" style="display: none;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="wrapper">
                        <div class="row no-gutters">
                            <div class="col-md-6 d-flex align-items-stretch">
                                <div class="contact-wrap w-100 p-md-5 p-4 py-5  bg-dark">
                                    <h3 class="mb-4 yellow">Let's chat:</h3>
                                    <div class="dbox w-100 d-flex align-items-center">
                                      <div id="chatarea" style="color:#50C7C7;"></div>
                                    </div><br/>
                                    <form id="formChat">
                                      <input type="text" id="chat" name="chat" placeholder="type here">
                                      <input type="button" id="sendToChat" name="sendToChat" class="btn btn-outline-warning btn-sm" value="->">
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-6 d-flex align-items-stretch">
                                <div class="info-wrap w-100 p-md-5 p-4 py-5 img">
                                    <p class="mb-4 grey">Do you want to finish chat? <input type="button" class="btn btn-outline-warning btn-sm"
                                                        name="chatbot1" id="chatbot1" value="Click here!" onclick="chatBotEnd();"></p>
                                
                                    <div class="dbox w-100 d-flex align-items-center">
                                        <img src="images/chatbot.png" alt="agent"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end chat bot section -->

    <!-- Newsletter DONE-->
    <section class="p-5 text-light newsletter">
        <div class="container">
            <form name="frmEmails" id= "frmEmails" method="POST" onsubmit="return validateEmailForm()">
                <div style="text-align:center">
                            <?php
                                if(isset($_POST["Submit1"])){
                                    
                                        $txtEmail = $_POST['txtEmail'];
                                        $data["email"] = $txtEmail;
                                        $jsonContent = file_get_contents('data_source/contact_emails.json');
                                        $tempArray = json_decode($jsonContent);
                                        array_push($tempArray, $data);
                                        $jsonData = json_encode($tempArray);
                                        file_put_contents('data_source/contact_emails.json', $jsonData);

                                        echo "<h5 class='green'>You have Successfully subscribed to the Newsletter!</h5>";
                                }
                            ?> 
                </div><br />
                <div class="d-md-flex justify-content-between align-items-center">
                    <h3 class="mb-3 mb-md-0  yellow">Sign up for our Newsletter</h3>
                    <div class="input-group news-input">
                        <input type="text" class="form-control" placeholder="Email Address (Example@domain.com)"
                            aria-label="Email Address" name="txtEmail" id="txtEmail" onclick = "changeBg('txtEmail');">
                        <div class="input-group-append">
                            <input type="submit" class="btn btn-outline-warning btn-lg" name="Submit1" id="Submit1"
                                value="Subscribe">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
    <!-- END OF Newsletter -->
    <!-- Footer -->

    <footer class="w-100 py-4 flex-shrink-0 footer">
        <div class="container py-4">
            <div class="row gy-4 gx-5">
                <div class="col-lg-5 col-md-6">
                    <h5 class="h2 text-white">Syntax Games.</h5>
                    <p class="small text-muted">Committed to creating engaging, pro-consumer gaming experiences free
                        from intrusive DRM and predatory monetization.</p>
                    <p class="small text-muted mb-0">&copy;2022 Syntax Games. All rights reserved.</p>
                </div>
                <div class="col-lg-2 col-md-6">
                    <h5 class="text-white mb-3">Quick links</h5>
                    <ul class="list-unstyled text-muted">
                        <li><a href="careers.html">Careers</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="games/game1.html">Ascii's Quest</a></li>
                        <li><a href="games/game2.html">Monster Hunter</a></li>
                    </ul>
                </div>
                <div class="col-lg-5 col-md-6">
                    <div class="text-center">
                        <img src="images/SyntaxGames-logos_white_banner.png" alt="logo-white-footer"
                            style="width:20rem;" class="img-fluid">
                    </div>
                    <div class="social">
                        <i class="bi bi-facebook icon"></i>
                        <i class="bi bi-twitter icon"></i>
                        <i class="bi bi-google icon"></i>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- End of Footer  -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</body>

</html>