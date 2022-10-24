<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- cdn Bootrap icon -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    
    <link rel="stylesheet" href="styles/forms.css">
    <link rel="stylesheet" href="styles/index.css">

    <script src="scripts/careers.js"></script>
    
    <!-- Favicon–––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon_white.png" />
    <title>Syntax Games careers</title>

</head>

<body class="careers">
    <!-- Header and Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
        <div class="container">
            <a href="index.html" class="navbar-brand"><img src="images/SyntaxGames-logos_white_banner.png" alt="logo-banner"
                style="height:4rem;" class="sg-logo"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Games</a>
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
                        <a href="careers-fr.html" class="nav-link">French/Français</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Careers Section -->
    <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-10">
					<div class="wrapper">
						<div class="row no-gutters">
							<div class="col-md-12 d-flex align-items-stretch">
								<div class="contact-wrap w-100 p-md-5 p-4 py-5  bg-black">
									<h3 class="mb-4 yellow">Build your future with Syntax Games!</h3>
									<div id="form-message-warning" class="mb-4"></div> 
                                   
                                    <?php
                                        if(isset($_POST["Submit"])){

                                            $data["first_name"] = $_POST['firstName'];
                                            $data["last_name"] = $_POST['lastName'];
                                            $data["email"] = $_POST['txtEmail'];
                                            $data["phone"] = $_POST['txtPhone'];
                                            $data["position"] = $_POST['job'];
                                            $data["start_date"] = $_POST['start'];
                                            $data["status"] = $_POST['employment'];

                                            $jsonContent = file_get_contents('data_source/applications.json');
                                            $tempArray = json_decode($jsonContent);
                                            array_push($tempArray, $data);
                                            $jsonData = json_encode($tempArray);
                                            file_put_contents('data_source/applications.json', $jsonData);

                                            echo "<h5 class='green'>Thank you for your application. We will get back to you as soon as possible.</h5>";
                                            
                                            //upload file
                                            $target_dir = "uploads/";
                                            $target_file = $target_dir . basename($_FILES["filename"]["name"]);
                                            $uploadOk = 1;
                        
                                            // Check if file already exists
                                            if (file_exists($target_file)) {
                                            echo "<h5 class='green'></h5>";
                                            $uploadOk = 0;
                                            }

                                            // Check if $uploadOk is set to 0 by an error
                                            if ($uploadOk == 0) {
                                            echo "<h5 class='green'>Sorry, your file was not uploaded.</h5>";
                                            // if everything is ok, try to upload file
                                            } 
                                            else {
                                                if (move_uploaded_file($_FILES["filename"]["tmp_name"], $target_file)) {
                                                     echo "<h5 class='green'>The file ". htmlspecialchars( basename( $_FILES["filename"]["name"])). " has been uploaded.</h5>";
                                                } 
                                                else {
                                                    echo "Sorry, there was an error uploading your file.";
                                                }
                                            }           
                                        }      
                                    ?> 
									<form  id="careersForm" name="frmCareers" class="contactForm" method="POST" enctype="multipart/form-data" onsubmit="return validateCareersForm()">
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" name="firstName"  id="firstName" placeholder="First Name *" onclick="changeBg('firstName');">   
												</div>
											</div>
                                            <div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" name="lastName"  id="lastName" placeholder="Last Name *" onclick="changeBg('lastName');">   
												</div>
											</div>
											<div class="col-md-6"> 
												<div class="form-group">
													<input type="text" class="form-control" name="txtEmail" id="txtEmail" placeholder="email@email.com *" onclick="changeBg('txtEmail');">
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" name="txtPhone" id="txtPhone" placeholder="Phone">
												</div>
											</div>
                                            <div class="col-md-6">
												<div class="form-group">
                                                    <select id="job" name="job" class="form-control " onclick="changeBg('job');">
                                                        <option value="NotChosen">Choose position: *</option>
                                                        <option value="Artist">Artist</option>
                                                        <option value="Designer">Designer</option>
                                                        <option value="Programmer">Programmer</option>
                                                        <option value="Tester">Tester</option>
                                                        <option value="Writer">Writer</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
												<div class="form-group">
                                                    <input class="form-control" type="date" id="start" name="start" value="2022-05-18" min="2022-05-18" max="2022-06-30">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
												<div class="form-group grey">
                                                    <input type="radio" name="employment" id="employed" value="employed" />
                                                    <label for="employed">Employed</label>
                                                    <br />
                                                    <input type="radio" name="employment" id="self-employed" value="self_employed"/>
                                                    <label for="self-employed">Self-employed</label>
                                                    <br />
                                                    <input type="radio" name="employment" id="student" value="student" />
                                                    <label for="student">Student</label>
                                                    <br />
                                                    <input type="radio" name="employment" id="unemployed" value="unemployed"/>
                                                    <label for="unemployed">Unemployed</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
												<div class="form-group">
                                                    <br/><br/><p class="grey">Upload your CV</p>
                                                    <input  type="file" id="myFile" name="filename">
                                                </div>
                                            </div>

											<div class="col-md-12">
												<div class="form-group">
													<input type="submit" class="btn btn-outline-warning btn-lg" name="Submit" id="Submit" value="Apply now">
													<div class="submitting"></div>
												</div>
											</div>
										</div>
									</form>
                                    <!-- end form -->
								</div>
							</div>		
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    <!-- end Careers section -->
    
    <!-- Footer -->

    <footer class="w-100 py-4 flex-shrink-0 footer">
        <div class="container py-4">
            <div class="row gy-4 gx-5">
                <div class="col-lg-5 col-md-6">
                    <h5 class="h2 text-white">Syntax Games. <i class="bi bi-music-player musicbtn"></i></h5>
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
                        <img src="images/SyntaxGames-logos_white_banner.png" alt="logo-white-footer" style="width:20rem;"
                            class="img-fluid">
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