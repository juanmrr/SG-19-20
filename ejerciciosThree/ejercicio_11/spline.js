class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    // Creación de los elementos
    this.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0,0,-5),
      new THREE.Vector3(-4,3,-3),
      new THREE.Vector3(-7,5,0),
      new THREE.Vector3(-4,7,3),
      new THREE.Vector3(0,4,5),
      new THREE.Vector3(4,0,3),
      new THREE.Vector3(7,-2,0),
      new THREE.Vector3(4,-2,-3),
      new THREE.Vector3(0,0,-5)
    ]);
    
    var geometryLine=new THREE.Geometry();
    geometryLine.vertices = this.spline.getPoints(100);
    this.visibleSpline = new THREE.Line(geometryLine,new THREE.LineBasicMaterial({color:0xff0000}));
    this.corredor = new THREE.Object3D();
    this.corredor.cono = new THREE.Mesh(new THREE.ConeGeometry(0.5,2,3), new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg')}));
    this.corredor.cono.rotation.x=Math.PI/2;
    this.corredor.add(this.corredor.cono);

    // Los añadimos a nuestro objeto
    this.add(this.visibleSpline);
    this.add(this.corredor);
  }

    animate(){
      var that = this;

      var param = { t: 0};
      var param2 = { t: 0.5 };

      var movimientoIzq = new TWEEN.Tween (param).to({t:0.5}, 4000).onUpdate( function (){
        var posicion=that.spline.getPointAt(param.t);
        that.corredor.position.copy(posicion);
        var tangente= that.spline.getTangentAt(param.t);
        posicion.add(tangente);
        that.corredor.lookAt(posicion);
      }).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function(){movimientoDer.start()});
      var movimientoDer=new TWEEN.Tween (param2).to({ t: 1 }, 8000).onUpdate(function (){
        var posicion=that.spline.getPointAt(param2.t);
        that.corredor.position.copy(posicion);
        var tangente= that.spline.getTangentAt(param2.t);
        posicion.add(tangente);
        that.corredor.lookAt(posicion);
      }).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function(){movimientoIzq.start()});

      movimientoIzq.start();

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
