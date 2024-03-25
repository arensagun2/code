from socket import *

# My IP: 172.21.89.183 (in school)
# King's IP: 172.21.110.202 (in school)

serverNames = [
    '169.254.148.80', 
    '169.254.123.194'
]
serverPort = 5005
clientSocket = socket(AF_INET, SOCK_DGRAM)

message = input('Input: ')

for server in serverNames:
    try:
        clientSocket.sendto(message.encode(), (server, serverPort))
    except:
        print("Error connecting to", server)
        break
    modifiedMessage, serverAddress = clientSocket.recvfrom(5000)
    print(server, "sent you", modifiedMessage.decode())

clientSocket.close()