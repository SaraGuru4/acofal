<?php

include_once ("../model/usuarioModel.php");

$usuario= new usuarioModel();

$response=array();
//Lista de usuarios
$response['list']=$usuario->setListUsers();
//$response['usuarios']=$usuario->allUsers();

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($usuario);