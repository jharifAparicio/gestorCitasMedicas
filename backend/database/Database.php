<?php
class Database
{
    private $host = "localhost";
    private $user = "root";
    private $password = "";
    private $database = "Citas_medicas";
    private $con;
    public function __construct()
    {
        $this->con = new mysqli($this->host, $this->user, $this->password, $this->database);
        if ($this->con->connect_error) {
            die("Error: " . $this->con->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->con;
    }

    public function closeConnection()
    {
        $this->con->close();
    }
}
