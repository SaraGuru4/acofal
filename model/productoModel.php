<?php
require_once  'connect_data.php';
require_once  'productoClass.php';

class productoModel extends productoClass{
    
    private $link;
    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }
    public function CloseConnect()
    {
        mysqli_close ($this->link);
        
    }
    public function objVars(){
        
        return get_object_vars($this);
    }
    public function getProductoById() {
        
            $this->OpenConnect();
            $idProducto= $this->getIdProducto();
            
            $sql = "CALL spGetProductoById($idProducto)";
            $result= $this->link->query($sql);
            

            if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
            {
                $new= new productoModel();
                $this->idProducto=$row['idProducto'];
                $this->nombreProducto=$row['nombreProducto'];
                $this->descripcion=$row['descripcion'];
                $this->foto=$row['foto'];
                $this->tipo=$row['tipo'];
            }
            mysqli_free_result($result);
            $this->CloseConnect();
        
    }
}