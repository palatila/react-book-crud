<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM product";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        //print_r($path);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $product = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($product);
        break;
    case "POST":
        $book = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO product(category_id, author, title, price, description) VALUES(:category_id, :author, :title, :price, :description)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':category_id', $book->category_id);
        $stmt->bindParam(':author', $book->author);
        $stmt->bindParam(':title', $book->title);
        $stmt->bindParam(':price', $book->price);
        $stmt->bindParam(':description', $book->description);
        

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $book = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE product SET category_id= :category_id, author= :author, title =:title, price =:price, description =:description WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $book->id);
        $stmt->bindParam(':category_id', $book->category_id);
        $stmt->bindParam(':author', $book->author);
        $stmt->bindParam(':title', $book->title);
        $stmt->bindParam(':price', $book->price);
        $stmt->bindParam(':description', $book->description);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM product WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;    

}