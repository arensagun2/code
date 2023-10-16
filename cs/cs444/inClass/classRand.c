#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main (void) {
	srand(time(NULL));
	int result = rand() % 100000;
	printf("%d\n", result);
}
