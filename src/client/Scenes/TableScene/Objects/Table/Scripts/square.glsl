precision mediump float;

uniform float uRaio;
uniform float iPotencia;

varying vec2 aVertex;

void main(void) {


	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

	if ( (uRaio - abs(aVertex.x)) >= 0.0 && (uRaio - abs(aVertex.y)) >= 0.0 )
		color = vec4(1.0, 1.0, 1.0, 1.0);

	gl_FragColor = color;
}
