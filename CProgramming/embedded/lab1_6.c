//lab1_6
#include "mbed.h"
 void led2_init(void);
 void button_init(void);
 uint32_t button_input(void);
 void led2_toggle(void);
 Serial pc(USBTX, USBRX);
 int main() {
     int interval =500;
     uint32_t val,val2;
     led2_init();
     button_init();
     while(1){
           val = button_input();
           if(val==0){
               interval = interval<<1;
               if(interval >2000)
                 interval = 500;
           }
           
           led2_toggle();
           
           ThisThread::sleep_for(interval);
     }
 }

 void led2_init(void){
     GPIOA->MODER &= ~(0b11<<10); //PA_5
     GPIOA->MODER |=(0b01<<10);
     GPIOA->PUPDR &= ~(0b11<<10);
     GPIOA->PUPDR |= (0b10<<10);
     GPIOA->OTYPER &=~(0b1<<5);
     GPIOA->ODR |=(1<<5);
     __HAL_RCC_GPIOA_CLK_ENABLE();
     
     }
     
 void button_init(void){
     GPIOC->MODER &= ~(0b11<<26); //PC_13 : moder 00: input
     GPIOC->PUPDR &= ~(0b11<<26);
     GPIOC->PUPDR |=(0b01<<26); //pull up
     __HAL_RCC_GPIOC_CLK_ENABLE();
 }
 uint32_t button_input(void){
      if((GPIOC->IDR & (0b1<<13)))
         return 1; //안누름
      else
         return 0; //누름
    
 }
 void led2_toggle(void){
       if((GPIOA->ODR &(1<<5))==0)
         GPIOA->ODR |=(1<<5);
       else
          GPIOA->ODR &= ~(0x1<<5);
 }
