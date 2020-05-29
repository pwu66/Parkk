#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#define MAX_CMD 2048
#define MAX_ARG 256
void ParseCommand(char *command, int *argc, char *argv[]);

int main()
{
		char command[MAX_CMD];
		command[0] = command[MAX_CMD-1] = 0; // for safety
		int argc = 0;
		char *argv[MAX_ARG] = { NULL };
		while(1){
				printf("$ ");
				fgets(command, MAX_CMD - 1, stdin);
				command[strlen(command)-1] = 0; // trim \r
				if(strcmp(command, "quit") == 0 || strcmp(command, "exit") == 0)
						break;
				ParseCommand(command, &argc, argv);
				pid_t child_pid = fork();
				if(child_pid <0){
						fprintf(stderr, "fork failed\n");
						exit(-1);
				} else if(child_pid ==0){
						execvp(argv[0],argv);
						exit(0);
				}else{
						wait(NULL);
				}
		}
		printf("Bye!\n");
		return 0;
}
void ParseCommand(char *command, int *argc, char *argv[]){
		char *ptr = strtok(command, " ");
		for(int i=0;i<*argc;i++)
				argv[i]=NULL;
		*argc=0;
		while (ptr != NULL)              
		{
				argv[(*argc)++]=ptr;
				ptr = strtok(NULL, " ");      // 다음 문자열을 잘라서 포인터를 반환
		}

}
