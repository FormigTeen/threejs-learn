precision mediump float;

uniform float uRaio;
uniform float iPotencia;

varying vec2 aVertex;

bool findArea(vec2 aVertex, vec2 aCenter) {
	float xPosition = 0.0;
	float yPosition = 0.0;
	vec2 centers[64];
	int lastLoop = 0;
	int lastItemIndex = -1;

	for ( int aPhaseX = 0 ; aPhaseX < int(iPotencia) / 2 ; aPhaseX++ ) {
		for ( int aPhaseY = 0 ; aPhaseY < int(iPotencia) / 2 ; aPhaseY++ ) {
			float offSet = uRaio / (iPotencia + 1.0);
			if ( (aPhaseX + aPhaseY) % 4 == 0)
				centers[(aPhaseX + aPhaseY) + lastLoop] = vec2(aCenter.x + offSet * (float(aPhaseX) + 1.0), aCenter.y + offSet + (float(aPhaseY) + 1.0));
			if ( aPhaseX + aPhaseY % 4 == 1)
				centers[(aPhaseX + aPhaseY) + lastLoop] = vec2(aCenter.x + offSet * (float(aPhaseX) + 1.0), aCenter.y - offSet + (float(aPhaseY) + 1.0));
			//centers[(aPhaseX + aPhaseY) + lastLoop] = vec2();
			//centers[(aPhaseX + aPhaseY) + lastLoop] = vec2();
			lastLoop += 1;
			lastItemIndex += 1;
		}
	}

	if ( int(iPotencia) % 2 == 1 || int(iPotencia) == 0 ) {
		centers[++lastItemIndex] = aCenter;
	}

	for ( int itemIndex = 0 ; itemIndex <= lastItemIndex ; itemIndex++ ){
		xPosition = aVertex.x - centers[itemIndex].x;
		yPosition = aVertex.y - centers[itemIndex].y;
		float dist = (sqrt( xPosition*xPosition + yPosition*yPosition));
		if (dist < uRaio / iPotencia) {
			return true;
		}
	}
	return false;
}

void main(void) {

	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

	bool result = findArea(aVertex, vec2(0.0, 0.0));

	if (result) {
		color = vec4(1.0, 1.0, 1.0, 1.0);
	}

	gl_FragColor = color;
}
