#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>  
#include <sys/ipc.h>  
#include <sys/msg.h>  
#include <sys/stat.h>
#include <unistd.h>
#include <sys/wait.h>
#include <pthread.h>
#include <string.h>
#define BUF_SIZE 512
typedef struct {
		long  data_type;
		char  data_buff[BUF_SIZE];
}data;
void* sender(void*);
void* receiver(void*);
int repeat_receiver = 1;

int main(int argc, char *argv[]){
		int queue_sid,queue_rid;
		pthread_t snd_pid;
		pthread_t rcv_pid;

		//struct msqid_ds msqstat;
		if(argc < 3){
				printf("Usage: ./hw3_example <snd_key> <rcv_key>\n");
				exit(1);
		}
		if((queue_sid=msgget((key_t)atoi(argv[1]),IPC_CREAT | 0666))==-1){
				perror( "msgget() Fail");
				return(-1);
		}
		if((queue_rid=msgget((key_t)atoi(argv[2]),IPC_CREAT | 0666))==-1){
				perror( "msgget() Fail");
				return(-1);
		}

		if (pthread_create(&snd_pid, NULL,sender,(void *)&queue_sid) < 0)
		{
				perror("thread create error : ");
				exit(0);
		}
		if (pthread_create(&rcv_pid, NULL,receiver,(void *)&queue_rid) < 0)
		{
				perror("thread create error : ");
				exit(0);
		}
		pthread_join(snd_pid,NULL);
		pthread_join(rcv_pid,NULL);

		msgctl(queue_sid, IPC_RMID, NULL); 
		msgctl(queue_rid, IPC_RMID, NULL); 
		return 0;
}

void* receiver(void* qid){
		data d;
		d.data_type=1;
		while(repeat_receiver==1){
				strcpy(d.data_buff,"");
				if(-1==msgrcv(*(int*)qid, &d, sizeof(d) - sizeof(long),d.data_type,0)){
						perror( "msgrcv() 실패");
						exit(1);
				}
				if(strlen(d.data_buff)!=0){
						printf("[incomming] %s\n",d.data_buff);
						usleep(1000);
				}
		}
} 

void* sender(void* qid){
		data s;
		s.data_buff[0]=s.data_buff[BUF_SIZE-1] =0;
		s.data_type=1;
		while(1){
				printf("[msg] ");
				fgets(s.data_buff,BUF_SIZE - 1, stdin);
				s.data_buff[strlen(s.data_buff)-1] = 0; 
				if(strcmp(s.data_buff, "quit") == 0 || strcmp(s.data_buff, "exit") == 0){
						repeat_receiver=0;
						break;
				}
				if (-1 == msgsnd(*(int*)qid, &s, sizeof(s) - sizeof(long), s.data_type))
				{
						perror( "msgsnd() 실패");
						exit( 1);
				}
		}
} 


