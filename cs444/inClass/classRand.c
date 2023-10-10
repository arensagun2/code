#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main (void) {
	srand(time(NULL));
	int result = rand();
	printf("random value on [0, %d]: %d\n", RAND_MAX, result);
}
