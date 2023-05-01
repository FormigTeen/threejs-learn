
#define RAIO 0.5
precision mediump float;
varying float uPosition;



varying vec2 aVertex;


int toStep() {
	return int(floor(uPosition / (1.0 / 8.0)));
}

float getMaxOnStep(int number)
{
	return (1.0 / 8.0) * float(number);
}

vec3 getColor() {
	if ( toStep() == 1 ) {
		return vec3(1.0, 0.0, 0.0);
	}
	return vec3(1.0, 1.0, 0.0);
	return vec3(1.0, 1.0, 0.0);
}

void main(void) {

	vec4 color = vec4(getColor(), 1.0);
	gl_FragColor = color;

}
