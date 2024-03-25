from socket import *

serverPort = 5005
serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind(('169.254.150.123', serverPort))
print('The server is ON')

run = True

while run:
    message, clientAddress = serverSocket.recvfrom(5000)
    
    print("New messaged received:", message.decode())
    
    modifiedMessage = "Your message '" + message.decode() + "' is received"
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)