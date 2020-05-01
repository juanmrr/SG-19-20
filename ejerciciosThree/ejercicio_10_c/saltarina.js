class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.desfase = 0;
    this.radio = 1;
    this.altura = 2;
    this.animado = false;

    // Creación de los elementos
    var materialBola = new THREE.MeshNormalMaterial({flatShading: false});
    var materialCilindro = new THREE.MeshNormalMaterial({flatShading: false, transparent: true, opacity: 0.5});

    this.contenedor = new THREE.Object3D();
    this.contenedor.contenedor = new THREE.Object3D();
    this.contenedor.contenedor.bola = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32),materialBola);
    this.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(this.radio,this.radio,this.altura,32),materialCilindro);

    this.contenedor.contenedor.bola.position.set(this.radio,0,0);

    this.contenedor.add(this.contenedor.contenedor);
    this.contenedor.contenedor.add(this.contenedor.contenedor.bola);
    // Creación de las GUI de los elementos
    this.createGUIBox(gui);

    // Los añadimos a nuestro objeto
    this.add(this.contenedor);
    this.add(this.cilindro);
  }

  createGUIBox(gui){
      var that = this;

      var folder = gui.addFolder('Controles');

      folder.add(this, 'desfase', 0, 5, 0.1)
        .name('Desfase: ')
        .onChange( function(){
          that.cilindro.scale.set(that.desfase + that.radio, that.altura, that.radio);
        });

    }

    animate(){
      var that = this;

      var coords = { x: 1 };
      var angulo = { ang: 0 };

      var rotacion = new TWEEN.Tween (angulo).to({ ang: 2 * Math.PI }, 4000).onUpdate( function () 
        {that.contenedor.contenedor.rotation.y = angulo.ang;}
        ).repeat(Infinity);

      rotacion.start();

      var traslacion = new TWEEN.Tween (coords).to({ x: -1 }, 2000).onUpdate(function ()
        {that.contenedor.position.x = coords.x * that.desfase;}
        ).yoyo(true).repeat(Infinity).easing(TWEEN.Easing.Quadratic.InOut);

      traslacion.start();

      TWEEN.update();

      this.animado = true;
    }

    update(){
      if(this.animado){
        TWEEN.update();
      }else{
        this.animate();
      }
    }
}
