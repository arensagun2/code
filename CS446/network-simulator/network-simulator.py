# CS446 Network Simulation
import random

class Node:
    def __init__(self, node_id):
        self.node_id = node_id
        self.routing_table = {}

    def send_update(self, other_node):
        # Simulate BGP update message exchange
        other_node.receive_update(self.node_id, self.routing_table)

    def receive_update(self, sender_id, routes):
        for dest, next_hop in routes.items():
            # Update routing table based on received routes
            if dest not in self.routing_table or sender_id == self.routing_table[dest]:
                self.routing_table[dest] = sender_id

    def print_routing_table(self):
        print(f"Routing table for Node {self.node_id}:")
        for dest, next_hop in self.routing_table.items():
            print(f"Destination: {dest}, Next Hop: {next_hop}")
        print("Done")

class NetworkSimulator:
    def __init__(self, num_nodes):
        self.nodes = [Node(i) for i in range(num_nodes)]

    def connect_nodes(self):
        for node in self.nodes:
            for other_node in self.nodes:
                if node != other_node:
                    node.send_update(other_node)

    def simulate(self, num_iterations):
        for _ in range(num_iterations):
            self.connect_nodes()

    def print_network_status(self):
        for node in self.nodes:
            node.print_routing_table()

num_nodes = 2
num_iterations = 2
network = NetworkSimulator(num_nodes)
network.simulate(num_iterations)
network.print_network_status()