#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
int combi(int n,int k);
int recursion(int n,int k);
int main() {
    clock_t start1, start2, end1, end2;
    int n=0,k=0;
    float res1,res2;
    char temp[100];
    //1. 문자 입력, 2.n<k 경우, 3.음수인 경우 4.
    while(1){
        printf("Enter two numbers 0~99 (fir>=sec)\n");
        scanf("%d %d",&n,&k);
        if((0<=n && n<=99)&&(0<=k && k<=99)&&n>=k) //n과 k는 1~99까지 갖되, n>=k 여야 함.
            break;
        while(getchar() != '\n'); // 문자 들어올 경우 버퍼 비우기
    }
    
    //시간 DP와 recursion 시간비교
    start1 = clock();
    printf("C(%d,%d) = %d\n",n,k,combi(n,k));
    end1 = clock();
    res1 = (float)(end1 - start1)/CLOCKS_PER_SEC;
    //rucursion과 비교할 경우
    start2 = clock();
    printf("C(%d,%d) = %d\n",n,k,recursion(n,k));
    end2 = clock();
    res2 = (float)(end2 - start2)/CLOCKS_PER_SEC;
    printf("DP: %f, recursion: %f \n",res1,res2);
    return 0;
}

int combi(int n,int k){
    int i,j;
    int c[100][100]={1};// c[0][0]=1;
    for(i=1;i<=n;i++){
        for(j=0;j<=k;j++){  // c[n][k]는 c[n-1][k-1]+c[n-1][k]이기 때문에, k까지만 저장하면 된다.
            if(j==0 || i==j)
                c[i][j]=1;
            else
                c[i][j]=c[i-1][j-1]+c[i-1][j];
            if(i==j) break; //j>i인 부분은 계산할 필요 없음.
        }
    }
    return c[n][k];
}

int recursion(int n,int k){
    if(n==0 && k>0) return 0;
    else if ((n>=0 && k==0) || n==k) return 1;
    else return recursion(n-1,k-1)+recursion(n-1,k);
}
