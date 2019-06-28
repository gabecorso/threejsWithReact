import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
class App extends Component {


    buildLathe() {
        var points = [];
        for ( var i = 0; i < 10; i ++ ) {
          points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
        }
        var geometry = new THREE.LatheGeometry( points );
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
        var lathe = new THREE.Mesh( geometry, material );

        return lathe;
    }

    buildMesh() {
        var geometry = new THREE.RingGeometry( 1, 5, 32 );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, wireframe: true } );
        var mesh = new THREE.Mesh( geometry, material );

        return mesh;
    }

    buildCube() {

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
      var cube = new THREE.Mesh( geometry, material );

      return cube;

    }

    animateCube() {

    }

    buildCurveObject() {

      var curve = new THREE.QuadraticBezierCurve(
          new THREE.Vector2( -10, 0 ),
          new THREE.Vector2( 20, 15 ),
          new THREE.Vector2( 10, 0 )
        );
        var points = curve.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var material = new THREE.LineBasicMaterial( { color : 0xff0000, wireframe: true } );
        //Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, material );
        return curveObject;

    }

    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this.mount.appendChild( renderer.domElement );
        
        var cube = this.buildCube();
        scene.add( cube );

        camera.position.z = 10;
        
        var curveObject = this.buildCurveObject();
        scene.add( curveObject );

        var mesh = this.buildMesh();
        scene.add( mesh );

        var lathe = this.buildLathe();
        scene.add( lathe );

        var animate = function () {
          requestAnimationFrame( animate );
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.01;
          curveObject.rotation.x -= 0.005;
          curveObject.rotation.y -= 0.005;
          lathe.rotation.x -= 0.005;
          lathe.rotation.y -= 0.005;
          renderer.render( scene, camera );
        };
    animate();
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default App;
