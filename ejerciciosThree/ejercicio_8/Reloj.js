
class Reloj extends THREE.Object3D {
    constructor(gui) {
        super();
        
        this.createGUI(gui,"Controles del reloj");

        //Puntero
        var clockGeometry = new THREE.SphereGeometry(1.5,  32, 32);
        clockGeometry.translate(15, 1.5, 0);

        var materialClock = new THREE.MeshPhongMaterial({ color: 0xB60000});

        this.clockMesh = new THREE.Mesh(clockGeometry, materialClock);
        this.add(this.clockMesh);

        var radio = 20;
        var horas = 12;
        var pointGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        var material = new THREE.MeshPhongMaterial({ color: 0x3EFF00});
        for (var i = 0; i < horas; ++i) {
            var angulo = (i / horas * 360) * (Math.PI / 180);
            var point = new THREE.Mesh(pointGeometry, material);
            point.position.set(Math.sin(angulo) * radio, 0, Math.cos(angulo) * radio);
            this.add(point);

        this.tiempoAnterior = Date.now();

        }
    }

    createGUI (gui) {
        this.guiControls = {
            velocidad: 1.0
        }

        var folder = gui.addFolder ("Reloj");
        folder.add(this.guiControls, 'velocidad', -12.0, 12.0, 1.0).name("Velocidad(marcas/s)").listen();
    }

    update () {
        var tiempoActual = Date.now();
        var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;
        this.clockMesh.rotation.y -= (this.guiControls.velocidad * 2 * Math.PI / 12) * segundosTranscurridos;
        console.log(segundosTranscurridos);
        this.tiempoAnterior = tiempoActual;
    }
}