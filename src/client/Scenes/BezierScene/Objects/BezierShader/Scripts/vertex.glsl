#define LIMIT 4
varying vec2 aVertex;

varying float time;

uniform vec2 controls[LIMIT];

float findPath(vec2 targetVertex)
{
	if (controls[LIMIT - 1].x - controls[0].x == 0.0) {
		return 0.0;
	}
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

vec2 getPosition(vec2 aVertex) {
	vec2 result = vec2(0.0, 0.0);
	if ( findPath(aVertex) > 0.0 )
		return aVertex;
	for ( int i = 0 ; i < LIMIT ; i++ ) {
		result = vec2(
			result.x + getBezier(i, LIMIT - 1, findPath(aVertex)) * controls[i].x,
			result.y + getBezier(i, LIMIT - 1, findPath(aVertex)) * controls[i].y
		);
	}
	return result;
}



void main(void) {
	aVertex = position.xy;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(getPosition(aVertex), 0.0, 1.0);
}
