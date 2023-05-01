
#define RAIO 0.5
precision mediump float;
varying float uPosition;



varying vec2 aVertex;

float getSteepSize() {
	return 1.0 / 8.0;
}


float getSteep(int steep) {
	return getSteepSize() * float(steep);
}

float getReference(int steep) {
	return uPosition / getSteep(steep);
}

vec3 getColor() {
	if ( uPosition <= getSteep(1)) {
		return vec3(1.0, 0.0, 0.0) * (1.0 - getReference(1)) + vec3(1.0, 0.5, 0.0) * getReference(1);
	}
	if ( uPosition <= getSteep(2)) {
		if ( getReference(2) > 1.0 )
			return vec3(1.0, 0.5, 0.0) * (1.0 - getReference(2)) + vec3(1.0, 1.0, 0.0) * getReference(2);
	}
	return vec3(0.0, 0.0, 1.0);
}

void main(void) {

	vec4 color = vec4(getColor(), 1.0);
	gl_FragColor = color;

}
