#include "mbed.h"

PwmOut buzzer(PB_3);
float C=261.626;
float D=293.665;
float E=329.628;
float F=349.228;
float G=391.995;
float A=440.000;
float B=493.883;
float Ch=523.251;
float Dh=587.330;
float Eh=659.260;

float freq[]={B,B,A,B,A, B,B,A,B,A, B,B,A,A,B,A,B,F,B,F,B};
 int beat[] ={5,4,2,2,2 ,5,4,2,2,2, 5,4,1,1,2,2,2,2,2,2,8 };

int main() {
    int period_us;
    int beat_ms;
    
    while(1) {
        for(int i=0;i<sizeof(freq)/sizeof(float);i++){
            buzzer=1.0-0.1;
            period_us=1000000/freq[i]; //주기
            beat_ms=125*beat[i];
            buzzer.period_us(period_us);
            wait_ms(beat_ms);
           // buzzer=0.0;
           // wait_ms(1);
            }
    }
}
