#include <sys/types.h>
#include <string.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#define BUFFER_SIZE 512
int ReadTextLine(int fd, char str[], int max_len);
char buffer[BUFFER_SIZE];
int buffer_size = 0;
int buffer_pos = 0;
int main(){
		char cpuinfo[102]="/proc/cpuinfo";
		char meminfo[102]="/proc/meminfo";
		char loadinfo[102]="/proc/loadavg";
		int fd_cpuinfo;
		int fd_meminfo;
		int fd_loadinfo;
		char str[BUFFER_SIZE];
		char info[6][20];
		int check=0;
		fd_cpuinfo= open(cpuinfo,O_RDONLY);
		fd_meminfo= open(meminfo,O_RDONLY);
		fd_loadinfo= open(loadinfo,O_RDONLY);
		if(fd_cpuinfo==-1){
				perror("open error");
				exit(1);
		}
		if(fd_meminfo==-1){
				perror("open error");
				exit(1);
		}
		if(fd_loadinfo==-1){
				perror("open error");
				exit(1);
		}
		while(ReadTextLine(fd_cpuinfo,str,BUFFER_SIZE)!=EOF){
			if(strstr(str,"cpu cores")!=0){	
				sscanf(str,"%*s %*s %*s %s",info[0]);
				printf("#of processor cores = %s\n",info[0]);
				}
			if(strstr(str,"model name")!=0){	
				sscanf(str,"%*s %*s %*s %s %s %s %s %s",info[1],info[2],info[3],info[4],info[5]);
				}
		}
				printf("model name : %s %s %s %s %s \n",info[1],info[2],info[3],info[4],info[5]);
		while(ReadTextLine(fd_meminfo,str,BUFFER_SIZE)!=EOF){
			if(strstr(str,"MemTotal")!=0){
				sscanf(str,"%*s %s",info[0]);
				printf("Memory total : %s KB\n",info[0]);
			}
		}
		while(ReadTextLine(fd_loadinfo,str,BUFFER_SIZE)!=EOF){
				sscanf(str,"%s %s %s",info[0],info[1],info[2]);
				printf("loadavg1: %s loadavg5: %s loadavg15: %s \n",info[0],info[1],info[2]);
		}
}

int ReadTextLine(int fd, char str[], int max_len)
{
		int i = 0;
		int j = 0;
		int ret = 0;
		// if current position is 0, reset buffer size and pos
		if(lseek(fd, 0, SEEK_CUR) == 0)
				buffer_pos = buffer_size = 0;

		while(j < max_len - 1){
				if(buffer_pos == buffer_size){
						buffer[0] = 0;
						buffer_size = read(fd, buffer, BUFFER_SIZE);
						buffer_pos = 0;
				}
				if(buffer_size == 0){
						if(j == 0)
								ret = EOF;
						break;
				}
				while(j < max_len - 2 && buffer_pos < buffer_size){
						str[j++] = buffer[buffer_pos++];
						if(str[j - 1] == '\0' || str[j - 1] == 10){
								j--; // to remove CR
								max_len = j; // to terminate outer loop
								break; // break inner loop
						}
				}
		}

		str[j] = 0;
		return ret;
		//성공하면 0 리턴, 끝에 도달하면 EOF 리턴
}
