/* This assignment was conducted on repl.it */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
typedef struct Info{
    char key[20];
    int val;
}info;

void HIK(info p[],int i , int val); //increase key
void Insert(info p[]); // Insert new element into queue
void swap(info p[],int a, int b);
void PrintAll(info p[]); // Print out all elements in queue
void IncreaseVal(info p[]); //Increase key of element in queue
void DeleteBiggest(info p[]); //Delete element with largest key from queue
void MaxHeapify(info p[],int i);
void ShowBiggest(info p[]); //Retrieve element with largest key from queue
int size=0;

int main(int argc, const char * argv[]) {
    info p[30];
    char menu[20];
    while(1){
        printf("******** menu ********\n");
        printf("I : Insert new element into queue\n");
        printf("D : Delete element with largest key from queue\n");
        printf("R : Retrieve element with largest key from queue\n");
        printf("K : Increase key of element in queue\n");
        printf("P : Print out all elements in queue \n");
        printf("Q : Quit\n\n");
        
        printf("Choose menu: \n");
        scanf("%s",menu);
        if(strlen(menu)==1){
            if(menu[0]>='a' && menu[0]<='z') //소문자인 경우
                menu[0]=menu[0]-'a'+'A'; // 대문자로 변환
            if(menu[0] == 'Q'){
                break;
            }else{
                switch (menu[0]) {
                    case 'I':
                        Insert(p);
                        break;
                    case 'P':
                        PrintAll(p);
                        break;
                    case 'K':
                        IncreaseVal(p);
                        break;
                    case 'D':
                        DeleteBiggest(p);
                        break;
                    case 'R':
                        ShowBiggest(p);
                        break;
                    default:
                        printf("Enter a proper character.(default)\n");
                }
            }
        }
        else{
            printf("Enter a proper character.\n");
        }
    }
    return 0;
}
void Insert(info p[]){
    char name[20];
    int num;
    int checkName=1; //존재유무 판단 변수
    int checkValue=1;
    char temp[20];
    while(1){
        printf("Enter name of element: ");
        scanf("%s",name);
        for(int i=1;i<=size;i++){
            if(strcasecmp(p[i].key,name)==0){ //대소문자 구분없이 비교
                printf("It already exists.\n");
                checkName = 0;
                break;
            }
            checkName=1;
        }
        if(checkName == 1)
            break;
    }
    while(1){
        printf("Enter key value of element: ");
        scanf("%s",temp);
        if(strlen(temp) <= 2 && temp[0]>=49 &&temp[0]<=57){ // Key는 1~10이여야 하며, 일의 자리는 1~9만 가능하다. 이를 아스키코드 상의 범위로 표현하면 49~57이다.
            checkValue =1;
            if(strlen(temp)==2){
                if(temp[1]!=48){// 십의 자리는 0이 아니면 다시 입력.
                    checkValue =0;
                    printf("Enter 1~10 integer \n ");
                }
            }
            if(checkValue ==1){
                num = atoi(temp);
                break;
            }
        }
        else{
            printf("Enter 1~10 integer \n ");
        }
    }
    
    if(strlen(name)<= 20 ){
        size++;
        strcpy(p[size].key, name);
        p[size].val=-99999;
        HIK(p,size,num);
        printf("New element[%s, %d] is inserted.\n",name,num);
    }
    else{
        printf("Please enter no more than 20 characters and more than 0 key value\n");
    }
}
void HIK(info p[],int i,int val){ //increase key
    int parent = i/2;
    if(val <p[i].val){
        printf("Please enter a greater value than before. \n");
    }
    else{
        p[i].val = val;
        while(i>1 && p[parent].val < p[i].val){
            swap(p,parent,i);
            i=parent;
        }
    }
}
void swap(info p[],int a, int b){
    char tempkey[20];
    int tempval;
    tempval = p[a].val;
    p[a].val = p[b].val;
    p[b].val = tempval;
    strcpy(tempkey,p[a].key);
    strcpy(p[a].key,p[b].key);
    strcpy(p[b].key,tempkey);
}

void PrintAll(info p[]){
    int i;
    if(size == 0 ){
        printf("Empty\n");
    }
    for(i=1;i<=size;i++){
        printf("[%s,%d] ",p[i].key,p[i].val);
    }
    printf("\n");
}

void IncreaseVal(info p[]){
    int index,val;
    printf("Enter index of element:");
    scanf("%d",&index);
    printf("Enter new key value:");
    scanf("%d",&val);
    HIK(p,index,val);
}
void DeleteBiggest(info p[]){
    char maxkey[20];
    int maxval;
    if(size < 1){
        printf("Empty\n");
    }
    else{
        strcpy(maxkey,p[1].key);
        maxval= p[1].val;
        strcpy(p[1].key,p[size].key);
        p[1].val = p[size].val;
        size--;
        MaxHeapify(p,1);
    }
    
    printf("[%s,%d] is deleted.\n",maxkey,maxval);
}
void MaxHeapify(info p[],int i){
    int l = 2*i;
    int r =l+1;
    int largest;
    if(l <= size && p[l].val >p[i].val)
        largest=l;
    else largest=i;
    if(r <=size && p[r].val > p[largest].val)
        largest = r;
    if(largest !=i){
        swap(p, i,largest);
        MaxHeapify(p, largest);
    }
}
void ShowBiggest(info p[]){
    printf("[%s,%d]\n",p[1].key,p[1].val);
}
