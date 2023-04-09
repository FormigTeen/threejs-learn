varying vec2 aVertex;

void main(void) {
	aVertex = position.xy;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
