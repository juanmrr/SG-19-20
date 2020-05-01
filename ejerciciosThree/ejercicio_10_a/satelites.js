class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.tiempoAnterior=Date.now();
    this.velocidad = 1;


    // Creación de los elementos
    var materialTierra = new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('../imgs/tierra.jpg')});
    var materialSatelite = new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('../imgs/cara.jpg')});
    this.tierra = new THREE.Mesh(new THREE.SphereGeometry(),materialTierra);
    this.sateliteInterno = new THREE.Mesh(new THREE.SphereGeometry(),materialSatelite);
    this.sateliteIntermedio = new THREE.Mesh(new THREE.SphereGeometry(),materialSatelite);
    this.sateliteExterno = new THREE.Mesh(new THREE.SphereGeometry(),materialSatelite);

    this.sateliteInterno.position.set(5,0,0);
    this.sateliteInterno.rotation.y=Math.PI;
    this.sateliteIntermedio.position.set(10,0,0);
    this.sateliteIntermedio.rotation.y=-Math.PI/2;
    this.sateliteExterno.position.set(15,0,0);
    this.sateliteExterno.rotation.y=Math.PI;


    // Creación de las GUI de los elementosS
    //this.createGUIBox(gui);

    // Los añadimos a nuestro objeto
    this.add(this.tierra);
    this.add(this.sateliteInterno);
    this.add(this.sateliteIntermedio);
    this.add(this.sateliteExterno);
  }

    update(){
      var tiempoActual = Date.now();
      var segundosTranscurridos = (tiempoActual-this.tiempoAnterior)/1000;

      this.rotation.y+=(this.velocidad * 2 * Math.PI/12)*segundosTranscurridos;
      this.sateliteIntermedio.rotation.y-=(this.velocidad * 2 * Math.PI/12)*segundosTranscurridos;
      this.sateliteExterno.rotation.y-=2*(this.velocidad * 2 * Math.PI/12 )*segundosTranscurridos;
      this.tiempoAnterior= tiempoActual;
    }
}
