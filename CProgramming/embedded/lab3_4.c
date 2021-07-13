#include "mbed.h"

Ticker led2Ticker;
DigitalOut led2(LED2);
InterruptIn button(USER_BUTTON);
Timer t;

Serial pc(USBTX,USBRX);
float mid=0,end;
float s,s2=0;
int flag=0;
void buttonPressed_cb (void){
    wait_ms(5); //debouncing
    if(flag) {
            t.start();
            pc.printf("new start!\r\n");
            flag=0;
        }
    else
        if(!button){
            end=t.read_ms();
            //if(flag){
            pc.printf("lab : %f ,total: %f \r\n",(end-mid)/1000,end/1000);
            mid = end;
           // }
            while(!button); //버튼 길게 눌렀을 경우
            if(t.read_ms()-end>1000){
                t.stop();
                t.reset();
                mid=0;
                flag=1; //새로운 시작을 알려주는 flag
            }
        }
}

int main() {
    t.start();
    pc.printf("timer start!! \r\n");
    button.fall(&buttonPressed_cb);
   // led2Ticker.attach(&blinking_cb,interval);
    while(1);
}
