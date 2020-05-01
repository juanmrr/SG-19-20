class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.tiempoAnterior=Date.now();
    this.velocidad = 1;
    this.radio = 10;
    this.altura = 15;
    this.posYBola = this.altura/2;
    this.baja = true;


    // Creación de los elementos
    var materialBola = new THREE.MeshNormalMaterial({flatShading: false});
    var materialCilindro = new THREE.MeshNormalMaterial({flatShading: false, transparent: true, opacity: 0.5});
    this.contenedor = new THREE.Object3D();
    this.contenedor.bola = new THREE.Mesh(new THREE.SphereGeometry(),materialBola);
    this.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(this.radio,this.radio,this.altura,20),materialCilindro);


    this.contenedor.bola.position.set(this.radio,this.posYBola,0);
    this.contenedor.add(this.contenedor.bola);
    // Creación de las GUI de los elementos
    this.createGUIBox(gui);

    // Los añadimos a nuestro objeto
    this.add(this.contenedor);
    this.add(this.cilindro);
  }

  createGUIBox(gui){
      var that = this;

      var folder = gui.addFolder('Controles');

      folder.add(this, 'radio', 0,+50,1)
        .name('Radio: ')
        .onChange( function(){
          that.cilindro.geometry=new THREE.CylinderGeometry(that.radio,that.radio,that.altura,20);
          that.contenedor.bola.position.set(that.radio,that.posYBola,0);
        });
    }

    update(){
      var tiempoActual = Date.now();
      var segundosTranscurridos = (tiempoActual-this.tiempoAnterior)/1000;

      this.contenedor.rotation.y+=(this.velocidad * 2 * Math.PI / 4)*segundosTranscurridos;
      if(this.baja){
        this.posYBola-=(this.velocidad * 2 * Math.PI / 0.2)*segundosTranscurridos;
        if (this.posYBola<=-this.altura/2) {
          this.baja=false;
        }
      }else {
        this.posYBola+=(this.velocidad * 2 * Math.PI / 0.2)*segundosTranscurridos;
        if (this.posYBola>=this.altura/2) {
          this.baja=true;
        }
      }
      this.contenedor.bola.position.set(this.radio,this.posYBola,0);
      this.tiempoAnterior= tiempoActual;
    }
}
