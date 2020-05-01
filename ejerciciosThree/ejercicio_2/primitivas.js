class primitivas extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material = new THREE.MeshNormalMaterial({flatShading: true});
    
	this.box = this.createBox(gui);

	this.cone = this.createCone();

	this.cylindre = this.createCylindre();

	this.sphere = this.createSphere();

	this.torus = this.createTorus();

	this.icosahedron = this.createIcosahedron();

	this.add (this.box)
	this.add (this.cone)
	this.add (this.cylindre)
	this.add (this.sphere)
	this.add (this.torus)
	this.add (this.icosahedron)

  }

  createBox (gui) {

  	var ejes = new THREE.AxesHelper(3);

  	var box = new THREE.Object3D();
  	this.boxAux = new THREE.Mesh (new THREE.BoxGeometry (1,1,1), this.material);
  	box.position.set(-5, 5, 5);
  	box.add (ejes);
  	box.add (this.boxAux);

  	var that = this;

  	this.guiControls = new function (){
  		dimBoxX : 1,
  		dimBoxY : 1,
  		dimBoxZ : 1,


  	}
    
    // Se crea una sección para los controles de la caja
    var folderBox = gui.addFolder ("Dimensiones de la caja");
    	folderBox.add (this.guiControls, "dimBoxX", 1, 10, 0.1).name("Dimensión x: ").onChange( function (){
    		that.box.
    	})

  	return box;

  }

  createCone () {

  	var ejes = new THREE.AxesHelper(3);

  	var cone = new THREE.Object3D();
  	this.coneAux = new THREE.Mesh (new THREE.ConeGeometry (1,2,8), this.material);
  	cone.position.set(5, 5, 5);
  	cone.add (ejes);
  	cone.add (this.coneAux);
  	return cone;

  }

  createTorus () {

  	var ejes = new THREE.AxesHelper(3);

  	var torus = new THREE.Object3D();
  	this.torusAux = new THREE.Mesh (new THREE.TorusGeometry (1,0.5,16,100), this.material);
  	torus.position.set(5, 5, 0);
	torus.add (ejes);
  	torus.add (this.torusAux);
  	return torus;

  }

  createCylindre () {

  	var ejes = new THREE.AxesHelper(3);

  	var cylinder = new THREE.Object3D();
  	this.cylinderAux = new THREE.Mesh (new THREE.CylinderGeometry (0.5,0.5,2,32), this.material);
  	cylinder.position.set(-5, -5, 5);
  	cylinder.add (ejes);
  	cylinder.add (this.cylinderAux);
  	return cylinder;

  }

  createSphere () {

  	var ejes = new THREE.AxesHelper(3);

  	var sphere = new THREE.Object3D();
  	this.sphereAux = new THREE.Mesh (new THREE.SphereGeometry (1,32,32), this.material);
  	sphere.position.set(5, -5, 5);
  	sphere.add (ejes);
  	sphere.add (this.sphereAux);
  	return sphere;

  }

  createIcosahedron () {

  	var ejes = new THREE.AxesHelper(3);

  	var icosahedron = new THREE.Object3D();
  	this.icosahedronAux = new THREE.Mesh (new THREE.IcosahedronGeometry (1,0), this.material);
  	icosahedron.position.set(5, -5, 0);
  	icosahedron.add (ejes);
  	icosahedron.add (this.icosahedronAux);
  	return icosahedron;

  }

  update () {
  
    this.boxAux.rotation.y += 0.01;
    this.coneAux.rotation.y += 0.01;
    this.cylinderAux.rotation.y += 0.01;
    this.sphereAux.rotation.y += 0.01;
    this.torusAux.rotation.y += 0.01;
    this.icosahedronAux.rotation.y += 0.01;

  }

  createGUI (gui) {

    var folderCone = gui.addFolder ("Dimensiones del cono");

    var folderCylinder = gui.addFolder ("Dimensiones del cilindro");

    var folderSphere = gui.addFolder ("Dimensiones de la esfera");

    var folderTorus = gui.addFolder ("Dimensiones del toro");

    var folderIcosahedron = gui.addFolder ("Dimensiones del icosaedro");
  }

}