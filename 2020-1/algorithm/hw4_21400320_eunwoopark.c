// my program works for greedy and DP solution only."
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <sys/time.h>
#include <math.h>
#include <unistd.h>
#define number 9 //측정 값 개수

typedef struct {
    int bnf; //benefit
    int wgt; //weight
    double bpw; //benefit per weight
}B;

void init_row(int** p,int height); //첫째 열 0으로 초기화
void DP(int test_num,B element[]);
void GREEDY(int test_num,B element[]);
void merge_sort(B* elm,int left,int right,int num_item);
void merge(B* elm,int left,int mid,int right,int num_item);

int result[3][number]; //함수 3개 측정시간 저장

int count[3]={0}; // 시간 측정 개수를 위한 변수
int main(int argc, const char * argv[]) {
    int test_num[number]={10,100,500,1000,3000,5000,7000,9000,10000};
    
    srand((unsigned int)time(NULL));
    B* element; //benefit,weight
    for(int i =0;i<number;i++){
        element =malloc(sizeof(B)*test_num[i]);
        for(int j=0;j<test_num[i];j++){
            element[j].bnf = rand()%300 +1; //1~300
            element[j].wgt = rand()%100 +1; //1~100
            element[j].bpw =(double)element[j].bnf/(double)element[j].wgt;
        }
        DP(test_num[i],element);
        GREEDY(test_num[i],element);
        
        FILE* fp=fopen("output.txt","w");
        fprintf(fp,"Number of items / Greedy / DP / B&B \n");
        printf("Number of items / Greedy / DP / B&B \n");
        for(int k=0; k<number;k++){
            fprintf(fp,"%d / %d / %d / %d \n",test_num[k],result[1][k],result[0][k],result[2][k]);
            printf("%d / %d / %d / %d \n",test_num[k],result[1][k],result[0][k],result[2][k]);
        }
    }
}
void GREEDY(int test_num,B* element){
    clock_t start, end,check;// 시간측정 변수
    start=clock();
    int flag=0; //time over flag
    int W=test_num*40; //total Weight
    int limit= W; //tempo total Weight
    int benefit=0; //total benefit
    int time; // 시간 측정 값 저장
    merge_sort(element,0,test_num-1,test_num);
   
    check=start+15*60*1000000; //15분 타이머 설정
    
    for(int j=0;j<test_num;j++){
        if(check<clock()){ //15분 경과
            flag=1;
            break;
        }
        //넣는 경우
        if(element[j].wgt<=limit){
            limit-=element[j].wgt;
            benefit+=element[j].bnf;
        }
        //쪼개서 넣는 경우
        else{
            benefit+=limit*(int)(element[j].bpw+0.5);
            limit=0;
        }
    }
    //강제 종료 아닌 경우
    end =clock();
    if(!flag){
        end =clock();
        //강제 종료 아닌 경우
        time= (int)(end-start);
        //천의 자리로 반올림
        time=time+500;
        time=time/1000;
        time=time*1000;
        result[1][count[1]++]=time;
    }else {
        printf("Time over!! \n");
        result[1][count[1]++]=-9999;
    }
    
    free(element);
    
}

void  merge_sort(B* elm,int left,int right,int num_item){
    int mid;
    if(left<right){
        mid = (left +right)/2;
        merge_sort(elm,left,mid,num_item);
        merge_sort(elm,mid+1,right,num_item);
        merge(elm,left,mid,right,num_item);
    }
}
void merge(B* elm,int left,int mid,int right,int num_item){
    int i,j,k,s;
    i= k=left;
    j = mid+1;
    B m[num_item]; //임시 저장
    while(i<=mid && j<=right){
        if(elm[i].bpw<=elm[j].bpw)
            m[k++] =elm[j++];
        else m[k++] =elm[i++];
    }
    if(i>mid){ //right부분 합치기
        for(s=j;s<=right;s++)
            m[k++] =elm[s];
    }
    else{ //left 부분 합치기
        for(s=i;s<=mid;s++)
            m[k++]=elm[s];
    }
    //원래 변수로 옮기기
    for(s=left;s<=right;s++){
        elm[s]=m[s];
    }
}

void DP(int test_num,B element[]){
    clock_t start, end,check;// 시간측정 변수
    start=clock();
    int flag=0; //time over check flag
    int** wi=0; //B[weight,item_number] 2차원 배열
    int W=test_num * 40; //총 Weight
    int width=test_num+1; //0~n
    int height=W+1; //0~W
    int time; //시간 측정 값 저장 변수

    //B[w,i] 2차원 배열 생성
    wi= (int**)malloc(sizeof(int*)*height);
    wi[0]=(int*)malloc(sizeof(int)*width*height);
    for(int j=1;j<height;j++){
        wi[j]=wi[j-1] +width; //width만큼 나눠서 사용하기
    }
    
    //2차원 배열 초기화
    init_row(wi,height);
    
    //2차원 배열 계산
    check=start+15*60*1000000; //15분 타이머
    for(int i=1;i<width;i++){
        if(check<clock()){ //15분 경과
            flag=1;
            break;
        }
        wi[0][i]=0;
        for(int w=1;w<height;w++){
            if(element[i-1].wgt<=w){
                if((element[i-1].bnf+wi[w-element[i-1].wgt][i-1])>wi[w][i-1]) //넣는 게 좋은 경우
                    wi[w][i]=(element[i-1].bnf+wi[w-element[i-1].wgt][i-1]);
                else wi[w][i]=wi[w][i-1]; //안 넣는 게 좋은 경우
            }
            else{ //못 넣는 경우
                wi[w][i]=wi[w][i-1];
            }
        }
    }
    if(!flag){
        end =clock();
        time= (int)(end-start);
        //천의 자리로 반올림
        time=time+500;
        time=time/1000;
        time=time*1000;
        result[0][count[0]++]=time;
    }else {
        printf("Time over!! \n");
        result[0][count[0]++]=-9999;
    }
    //메모리 해제
    free(wi[0]);
    free(wi);
}

void init_row(int** p,int height){
    for(int j=0;j<height;j++){
        p[j][0]=0;
    }
}
