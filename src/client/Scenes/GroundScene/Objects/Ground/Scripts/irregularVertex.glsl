uniform float uAmp;

varying vec3 aVertex;

varying float z;

void main(void) {

	float randomNumber = fract(sin(dot(position.xyz, vec3(12.9898, 78.233, 45.5432))) * 43758.5453) * 100.0;

	z = uAmp * sin(randomNumber*0.2) * cos(randomNumber*0.5);


	aVertex = vec3(1.0, 1.0, 0.0);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);

}
