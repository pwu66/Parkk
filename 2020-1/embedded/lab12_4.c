#include "mbed.h"

#define SERVER_IP "192.168.0.26"
#define SERVER_PORT 50000

RawSerial pc(USBTX, USBRX, 115200);
WiFiInterface *wifi;

TCPSocket socket;
Thread sock_thread;

char rx_buf_pc[100];
int index = 0;
volatile int flag ;

void rx_cb(void) // ISR for receiving data from the PC keyboard
{
    char ch;
    ch = pc.getc();
    pc.putc(ch);
    rx_buf_pc[index++] = ch;
    if (ch == 0x0D) { //LF
        pc.putc(0x0A); //CR
        rx_buf_pc[--index] = '\0'; //end of string
        index = 0;
        flag = 1;
    }
}

// rx_thread: a thread to receive data from the TCP server
void rx_thread() {
    char* buf = (char*)malloc(1024);
    while (true) {
        nsapi_size_or_error_t size = socket.recv(buf, 1024);
        if (size <= 0) {
            if (size == NSAPI_ERROR_WOULD_BLOCK) continue;
            // (-3001) no data for the case of Non-blocking mode
            pc.printf("Error while receiving data from TCP socket (%d)\r\n", size);
            return;
        }
        buf[size] = '\0'; // turn into valid C string
        pc.printf("\r\nRX data: (%d) %s \r\n", size, buf);
    }
}

int main()
{
    SocketAddress sockAddr;
    SocketAddress serverAddr(SERVER_IP, SERVER_PORT);
    
    pc.printf("\r\n WiFi TCP Client example\r\n");
    pc.attach(&rx_cb);
    
    wifi = WiFiInterface::get_default_instance();
    if (!wifi) {
        pc.printf("ERROR: No WiFiInterface found.\n");
        while(1);
    }
    
    pc.printf("Connecting to %s...\r\n", MBED_CONF_APP_WIFI_SSID);
    int ret = wifi->connect(MBED_CONF_APP_WIFI_SSID,
    MBED_CONF_APP_WIFI_PASSWORD, NSAPI_SECURITY_WPA_WPA2);
    if (ret != 0) {
        pc.printf("Connection error!!\r\n");
        while(1);
    }
    
    pc.printf("Success!!\r\n");
    pc.printf("RSSI: %d\r\n", wifi->get_rssi());
    
    wifi->get_ip_address(&sockAddr);
    pc.printf("IP: %s, ", sockAddr.get_ip_address());
   // pc.printf("IP: %s, ", wifi->get_ip_address());
    
    
    wifi->get_netmask(&sockAddr);
    pc.printf("Netmask: %s, ", sockAddr.get_ip_address());
    //pc.printf("Netmask: %s, ", wifi->get_netmask());
    
    wifi->get_gateway(&sockAddr);
   pc.printf("Gateway: %s\r\n", sockAddr.get_ip_address());
//    pc.printf("Gateway: %s\r\n",  wifi->get_gateway());
  
    // Open a TCP socket on the network interface, and create a TCP connection to a Server
    socket.open(wifi);
    int response = socket.connect(serverAddr);
    if(0 != response){
        pc.printf("Error connecting: %d\r\n", response);
        socket.close();
        wifi->disconnect();
        while(1);
    }
    
    sock_thread.start(&rx_thread);
    
    while (true) {
        flag = 0;
        pc.printf("Enter characters to send to a server: ");
        while (flag != 1){}
        if (!strcmp(rx_buf_pc, "q") || !strcmp(rx_buf_pc, "Q")) {
            break;
        }
        else {
            int len = strlen(rx_buf_pc);
            pc.printf("Sent: %s (%d)\r\n", rx_buf_pc, len);
            rx_buf_pc[len++] = 0x0D;
            rx_buf_pc[len++] = 0x0A;
            socket.send((const char *)rx_buf_pc, len); // for printing of SocketTest
            Thread::wait(500); // 0.5sec
        }
    }
    socket.close();
    wifi->disconnect();
    sock_thread.join();
    pc.printf("RX sock_thread joined!!\r\n");
    pc.printf("\nDone\r\n");
    Thread::wait(osWaitForever);
}
