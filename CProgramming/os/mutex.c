#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <pthread.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <unistd.h>

#define BUFFER_SIZE 5
#define MAX_MESSAGE 64
char buffer[BUFFER_SIZE][MAX_MESSAGE];
int in=0,out=0,count=0;
pthread_mutex_t mutex;
sem_t empty,full;
int repeat=1;

void* Producer(void* a);
void* Consumer(void* b);
void DisplayBuffer(void);
int main(int argc,char* argv[]){
	int duration=30;
	int emp,ful;
	pthread_t p_pid,c_pid;
	if(argc>=2)
		duration=atoi(argv[1]);
	srand(time(NULL));
	pthread_mutex_init(&mutex,NULL);
	sem_init(&empty,0,BUFFER_SIZE);
	sem_init(&full,0,0);
	DisplayBuffer();

	if(pthread_create(&p_pid,NULL,Producer,(void*)NULL)<0){
		perror("thread create error : ");
		exit(0);
	}
	if(pthread_create(&c_pid,NULL,Consumer,(void*)NULL)<0){
		perror("thread create error : ");
		exit(0);
	}
	sleep(duration);
	repeat=0;
	sem_getvalue(&empty,&emp);
	sem_getvalue(&full,&ful);
	if(emp==0)
		sem_post(&full);
	if(ful==0)
		sem_post(&empty);
	pthread_join(p_pid,NULL);
	pthread_join(c_pid,NULL);
	pthread_mutex_destroy(&mutex);
	sem_destroy(&full);
	sem_destroy(&empty);
	printf("Goog-bye!\n");
	return 0;

}

void* Producer(void* a){
	while(repeat){
		sleep(rand()&3+1);
		int no_messages=10;
		char *messages[64]={
		"Nice to see you!",
		"Aal izz well!",
		"I love you! God loves you!",
		"God loves you and has a wonderful plan for your life.",
		"God bless you!",
		"You are genius!",
		"Cheer up!",
		"Everything is gonna be okay.",
		"You are so precious!",
		"Hakuna matata!"
		};
		int num=rand()%no_messages;
		printf("[Producer] Created a message \"%s\"\n",messages[num]);
		sem_wait(&empty);
		pthread_mutex_lock(&mutex);
		printf("---------------------- PRODUCER ------------------------\n");
		printf("producer is entering critical section.\n");
		strcpy(buffer[in],messages[num]);
		printf("[Producer] \"%s\" ==> buffer \n",messages[num]);
		count++;
		in=(in+1)%BUFFER_SIZE;
		DisplayBuffer();
		printf("producer is leaving critical section.\n");
		printf("--------------------------------------------------------\n");

		pthread_mutex_unlock(&mutex);
		sem_post(&full);
	}
}
void* Consumer(void* b){
	while(repeat){
		sem_wait(&full);
		pthread_mutex_lock(&mutex);
		printf("---------------------- CONSUMER -----------------------\n");
		printf("Consumer  is entering critical section.\n");
		printf("[Consumer] buffer ==> %s \n",buffer[out]);
		out=(out+1)%BUFFER_SIZE;
		count--;
		DisplayBuffer();
		printf("Consumer is leaving critical section.\n");
		printf("--------------------------------------------------------\n");
		pthread_mutex_unlock(&mutex);
		sem_post(&empty);
		sleep(rand()%3+2);

	}
}
void DisplayBuffer(){
		printf("Buffer contents:\n");
		printf("\tcount = %d, in = %d, out = %d\n",count, in, out);
		int p = out;
		for(int i = 0; i < count; i++){
				printf("\t%d] %s\n", p, buffer[p]);
				p = (p + 1) % BUFFER_SIZE;
		}
}
