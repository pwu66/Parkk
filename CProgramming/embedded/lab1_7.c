//lab1_7
#include "mbed.h"
volatile int interval;
void led2_init(void);
void button_init(void);
void led2_toggle(void);
void button_Handler(void);
RawSerial pc(USBTX, USBRX);
int main() {
    
    led2_init();
    button_init();
    NVIC_SetVector(EXTI15_10_IRQn,(uint32_t)button_Handler);
    interval =500;
    while(1){
          led2_toggle();
          wait_ms(interval);
    }
}

void led2_init(void){
    GPIOA->MODER &= ~(0b11<<10); //PA_5
    GPIOA->MODER |=(0b01<<10);
    GPIOA->ODR |=(1<<5);
    __HAL_RCC_GPIOA_CLK_ENABLE();
    
    }
    
void button_init(void){
    GPIOC->MODER &= ~(0b11<<26); //PC_13 : moder 00: input
    __HAL_RCC_GPIOC_CLK_ENABLE();
    //--- interrupt
    __HAL_RCC_SYSCFG_CLK_ENABLE();
    NVIC_EnableIRQ(EXTI15_10_IRQn);
    SYSCFG->EXTICR[3] |= (0b0010<<4);
    EXTI->IMR |= (0b1<<13);
    EXTI->FTSR |= 1<<13;
 
}

void button_Handler(void){
    interval = interval<<1;
    if(interval >2000)
        interval = 500;
    EXTI->PR |= (1<<13);
}
    
void led2_toggle(void){
      if((GPIOA->ODR &(1<<5))==0)
        GPIOA->ODR |=(1<<5);
      else
        GPIOA->ODR &= ~(0b1<<5);
}
