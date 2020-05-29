#include "mbed.h"

#define ADT7420_TEMP_REG (0x00) //Temperature Register
#define ADT7420_CONF_REG (0x03) //Temperature Register
#define EVAL_ADT7420_ADDR (0x48) //Temperature Register

I2C i2c(I2C_SDA,I2C_SCL);
Serial pc(USBTX,USBRX);

int main() {
    
    int status;
    float temp;
    char data_write[2];
    char data_read[2];
    
    pc.printf("I2C Test program: READ ADT7420 temp. sensor\r\n");
    
    data_write[0]=ADT7420_CONF_REG;
    data_write[1]=0xC0;
    status = i2c.write((EVAL_ADT7420_ADDR <<1),data_write,2,0);
    if(status!=0){
        pc.printf("I2C configuration error!\r\n");
        while(1){}
    }
    while(1){
        data_write[0]= ADT7420_TEMP_REG;
        i2c.write((EVAL_ADT7420_ADDR <<1),data_write,1,0);
        i2c.read(((EVAL_ADT7420_ADDR <<1)|0x01),data_read,2,0);
        int tempval =((int)data_read[0]<<8)|data_read[1];
        if((tempval &0x1000)>0){
            temp=(tempval-8192)/16.0;
        }else{
            temp=tempval/16.0;
        }
        
        pc.printf("temperature = %.4f\r\n",temp);
        wait_ms(1000);
        
    }
}
