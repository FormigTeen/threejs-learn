#define LIMIT 16 * 16
precision mediump float;

struct Center {
	vec2 aVertex;
	bool isActive;
};

uniform float uRaio;
uniform float iPotencia;
uniform Center aCenters[LIMIT];

varying vec2 aVertex;

bool findArea(vec2 aVertex) {

	float xPosition = 0.0;
	float yPosition = 0.0;
	for ( int itemIndex = 0 ; itemIndex < int(iPotencia) * int(iPotencia) ; itemIndex++ ){
		if (aCenters[itemIndex].isActive) {
			xPosition = aVertex.x - aCenters[itemIndex].aVertex.x;
			yPosition = aVertex.y - aCenters[itemIndex].aVertex.y;
			if ((uRaio > abs(xPosition)) && (uRaio > abs(yPosition)))
				return true;
		}
	}
	return false;
}

void main(void) {


	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

	bool result = findArea(aVertex);

	if (result) {
		color = vec4(1.0, 1.0, 1.0, 1.0);
	}

	gl_FragColor = color;
}
