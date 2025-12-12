<?php
header("Content-Type: application/json; charset=UTF-8");

// Show friendly message if someone opens booking.php directly
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Please submit the form properly."
    ]);
    exit;
}

// Sanitize input
function clean($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

$name    = clean('name');
$email   = clean('email');
$date    = clean('date');
$time    = clean('time');
$people  = clean('people');
$message = clean('message');

// Validate
if (empty($name) || empty($email) || empty($date) || empty($time) || empty($people)) {
    echo json_encode(["success" => false, "message" => "All required fields must be filled"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email address"]);
    exit;
}

// DATABASE CONNECTION
$host = "localhost"; 
$user = "";       // default XAMPP username
$pass = "";           // default XAMPP password empty
$db   = "cafe_db";

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}

// Prepare & insert data
$stmt = $conn->prepare("
    INSERT INTO bookings (created_at, name, email, date, time, people, message)
    VALUES (NOW(), ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param("ssssss", $name, $email, $date, $time, $people, $message);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Booking saved successfully. We will confirm shortly."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error saving booking: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
