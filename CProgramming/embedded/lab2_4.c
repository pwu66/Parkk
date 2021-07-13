//lab2_4
#include "mbed.h"

RawSerial pc(PA_2, PA_3,115200);
Serial ph(PA_9,PA_10);
DigitalOut red(D3);
DigitalOut green(D4);

void handler(void *st)
{
    char *str=(char *)st;
    str[strlen(str)-1]=0;
    pc.putc(0x0A);
    if(strcmp(str,"Green on")==0) {
        pc.printf("Gled status: on\r\n");
        ph.printf("Gled status: on\r\n");
        green =1;
    } else if(strcmp(str,"Green off")==0) {
        pc.printf("Gled status: off\r\n");
        ph.printf("Gled status: off\r\n");
        green = 0;
    } else if(strcmp(str,"Red on")==0) {
        pc.printf("Rled status: on\r\n");
        ph.printf("Rled status: on\r\n");
        red =1;
    } else if(strcmp(str,"Red off")==0) {
        pc.printf("Rled status: off\r\n");
        ph.printf("Rled status: off\r\n");
        red =0;
    } else if(strcmp(str,"Gled status")==0) {
        pc.printf("Gled status: %d\r\n",green.read());
        ph.printf("Gled status: %d\r\n",green.read());
    } else if(strcmp(str,"Rled status")==0) {
        pc.printf("Rled status: %d\r\n",red.read());
        ph.printf("Rled status: %d\r\n",red.read());
    } else {
        ph.printf("undefined\r\n");
        pc.printf("undefined\r\n");
    }
}
void rx_pc_handler(void)
{
    char str[100]= {0,};
    int count=0;
    //pc.printf("pc start \r\n");
//    ph.printf("pc start \r\n");
    while(1) {
        str[count]=pc.getc();
        int ch=(int)str[count++];
        pc.putc(ch);
        if(ch == 0x0D) {
            handler((void *)&str);
            break;
        }
    }
}

void rx_phone_handler(void)
{
    char str[100]= {0,};
    int count=0;
//    pc.printf("ph start \r\n");
//    ph.printf("ph start \r\n");
    while(1) {
        str[count]=ph.getc();
        int ch=(int)str[count++];
     //   pc.putc(ch);
//        ph.putc(ch);
        if(ch == 0x0D) {
            ph.getc();
            handler((void *)&str);
            break;
        }
    }
}

        int main() {
            pc.attach(&rx_pc_handler);
            ph.attach(&rx_phone_handler);
            pc.printf("\r\n Hello, Nucleo-F411RE – UART Lab2_1!\r\n");
            pc.printf("Enter characters...\r\n");
            while(1) {}
        }
        
