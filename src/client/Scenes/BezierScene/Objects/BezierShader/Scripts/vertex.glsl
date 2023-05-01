#define LIMIT 4
varying vec2 aVertex;

varying float uPosition;

uniform vec2 controls[LIMIT];

float findPath(vec2 targetVertex)
{
	return (targetVertex.x - controls[0].x) / (controls[LIMIT - 1].x - controls[0].x);
}


int getFactorial(int num) {
	int result = 1;
	for ( int i = 1 ; i <= num ; i++ ) {
		result *= i;
	}
	return result;
}

float getBinomial(int number, int knumber) {
	return float(getFactorial(number)) / float(getFactorial(knumber) * getFactorial(number - knumber));
}

float getBezier(int number, int knumber, float position) {
	return getBinomial(number, knumber) * pow(position, float(knumber)) * pow(1.0 - position, float(number - knumber));
}

float getBezierSimple(int number, int knumber, float position) {
	if ( number == 0 )
		return pow(1.0 - position, 3.0);
	if ( number == 1 )
		return 3.0 * position * pow(1.0 - position, 2.0);
	if ( number == 2 )
		return 3.0 * pow(position, 2.0) * (1.0 - position);
	if ( number == 3 )
		return pow(position, 3.0);

	return 0.0;
}

vec2 getPosition(vec2 aVertex) {
	vec2 result = vec2(0.0, 0.0);
	float bezierResult = 0.0;
	for ( int i = 0 ; i < LIMIT ; i++ ) {
		bezierResult = getBezierSimple(i, LIMIT - 1, uPosition);
		result.x += (bezierResult * controls[i].x);
		result.y += (bezierResult * controls[i].y);
	}
	return result;
}



void main(void) {
	aVertex = position.xy;
	uPosition = findPath(aVertex);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(getPosition(aVertex), 0.0, 1.0);
}
