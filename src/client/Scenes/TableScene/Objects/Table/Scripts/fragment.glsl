precision mediump float;

uniform float uRaio;

varying vec2 vXY;

void main(void) {

	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

	float dist 	= sqrt(vXY.x*vXY.x + vXY.y*vXY.y);

	if (dist < uRaio)
		color.r = 0.0;
	else
		color.b = 1.0;

	gl_FragColor = color;
}
