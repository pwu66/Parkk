#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#define BUFSIZE 1024
void error_handling (char *message);
void respo_Get (char *msg, int sock);
void respo_Post (char *tmp, int sock);
void send_html (int sock, char *msg);
int main (int argc, char **argv)
{
  int serv_sock;
  int clnt_sock;
  char message[BUFSIZE];
  int str_len, num = 0;
  struct sockaddr_in serv_addr;
  struct sockaddr_in clnt_addr;
  int clnt_addr_size;
  if (argc != 2)
    {
      printf ("Usage : %s <port>\n", argv[0]);
      exit (1);
    }
  //socket 
  serv_sock = socket (PF_INET, SOCK_STREAM, 0);
  if (serv_sock == -1)
    error_handling ("TCP socket error");

  //bind
  memset (&serv_addr, 0, sizeof (serv_addr));
  serv_addr.sin_family = AF_INET;
  serv_addr.sin_addr.s_addr = htonl (INADDR_ANY);
  serv_addr.sin_port = htons (atoi (argv[1]));
  if (bind (serv_sock, (struct sockaddr *) &serv_addr, sizeof (serv_addr)) ==
      -1)
    error_handling ("bind() error");

  //listen
  if (listen (serv_sock, 5) == -1)
    error_handling ("listen() error");
  unsigned char html[1024];
  clnt_addr_size = sizeof (clnt_addr);
  unsigned char *header =
    "HTTP/1.0 200 OK\n" "Content-type: text/html\n" "\n";

  while (1)
    {
      //accept
      clnt_sock =
	accept (serv_sock, (struct sockaddr *) &clnt_addr, &clnt_addr_size);
      if (clnt_sock == -1)
	error_handling ("accept() error");
      str_len = recv (clnt_sock, message, BUFSIZE - 1, 0);
      if (message[0] == 'G' && message[1] == 'E' && message[2] == 'T'
	  && message[3] == ' ')
	{
	  printf ("GET request\n");
	  respo_Get (message, clnt_sock);
	}
      else if (message[0] == 'P' && message[1] == 'O' && message[2] == 'S'
	       && message[3] == 'T' && message[4] == ' ')
	{
	  printf ("POST request\n");
	  respo_Post (message, clnt_sock);
	}
      printf ("end!\n");
      close (clnt_sock);
    }
  close (serv_sock);
  return 0;

}

void error_handling (char *message)
{
  fputs (message, stderr);
  fputc ('\n', stderr);
  exit (1);
}

void respo_Get (char *msg, int sock)
{
  char *p = strtok (msg, " ");	//GET
  p = strtok (NULL, " ");	// url
  if (strcmp (p, "/") == 0 || strcmp (p, "/index.html") == 0)
    {
      send_html (sock, "index.html");
    }
  else if (strcmp (p, "/query.html") == 0)
    {
      send_html (sock, "query.html");
    }
  else
    {
      char *header = "HTTP/1.1 404 Not Found\n" "\n";
      if (send (sock, header, strlen (header), 0) < 1)
	{
	  printf ("header send error! \n");
	}
    }
}

void send_html (int sock, char *msg)
{
  char buf[BUFSIZE];
  unsigned char *header =
    "HTTP/1.0 200 OK\n" "Content-type: text/html\n" "\n";
  if (send (sock, header, strlen (header), 0) < 1)
    {
      printf ("header send error! \n");
    }
  FILE *fp = fopen (msg, "r");
  while (fgets (buf, BUFSIZE, fp) != NULL)
    {
      send (sock, buf, strlen (buf), 0);
    }
}

void respo_Post (char *msg, int clnt_sock)
{
 unsigned char *header = "HTTP/1.0 200 OK\n" "Content-type: text/html\n" "\n";
 char pp1[100] = "<h2>";
 char *pp2 = "</h2>";
 char *tmp;
 char *p = strtok (msg, "\n");
 while (p != NULL){
 	tmp = p;
 	p = strtok (NULL, "\n");
 }
 send (clnt_sock, header, strlen (header), 0);
 strcat (pp1, tmp);
 strcat (pp1, pp2);
 send (clnt_sock, pp1, strlen (pp1), 0);
 
 }
