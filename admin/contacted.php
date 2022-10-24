<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <title>Contacts</title>
    <style>
        body{
            text-align: center;
            background-color: #000;
            color:white;
        }
        .center-admin{
            margin-top:200px;
        }
        .btn-secondary{
            width:220px;
            margin:10px;
        }
        .green{
            color:#50C7C7;
        }
    </style>
<body>
    <div class="center-admin">
        <h2 class="green">Contacts:</h2><br/>
        <?php

            $con = mysqli_connect('localhost', 'root', 'root2022','syntaxgames');

            if(! $con ) {
            die('Could not connect: ' . mysqli_error());
            }

            $sql = 'SELECT * FROM guests';
            $res = mysqli_query($con, $sql);

            if(! $res ) {
            die('Could not get data: ' . mysqli_error());
            }

            while($row = mysqli_fetch_array($res)) {
            echo $row['id']." / ".$row['nickName']." / ".$row['email']." / ".$row['phone']." / ".$row['message'];
            echo "<br>";
            echo "------------------<br>";
            }

            echo "<br>";
            echo "<br>";

            echo "<h5 class='green'>Fetched data successfully!!!</h5>";
            echo "<br>";

            mysqli_close($con);
        ?>
     <a href="../admin.html"><button type="button" class="btn btn-secondary">Return</button></a>
   </div>
</body>
</html>

