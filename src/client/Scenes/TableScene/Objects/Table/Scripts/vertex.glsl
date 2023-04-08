varying vec2 vXY;

void main(void) {
	vXY = position.xy;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
