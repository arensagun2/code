import random

class AutonomousSystem:
    def __init__(self, as_number):
        self.as_number = as_number
        self.routing_table = {}

    def receive_update(self, source_as, prefix, next_hop):
        if prefix not in self.routing_table or source_as == self.routing_table[prefix][0]:
            self.routing_table[prefix] = (source_as, next_hop)

    def advertise_routes(self):
        return [(prefix, next_hop) for prefix, (_, next_hop) in self.routing_table.items()]

class BGPSimulator:
    def __init__(self, num_nodes):
        self.nodes = [AutonomousSystem(as_number) for as_number in range(1, num_nodes + 1)]
        self.connect_nodes()

    def connect_nodes(self):
        for node in self.nodes:
            for other_node in self.nodes:
                if node != other_node:
                    prefix = f"{other_node.as_number}"
                    next_hop = f"Link to AS{other_node.as_number}"
                    node.receive_update(other_node.as_number, prefix, next_hop)

    def simulate(self, iterations=1):
        for _ in range(iterations):
            for node in self.nodes:
                routes_to_advertise = node.advertise_routes()
                for other_node in self.nodes:
                    if node != other_node:
                        for prefix, next_hop in routes_to_advertise:
                            other_node.receive_update(node.as_number, prefix, next_hop)

    def display_routing_tables(self):
        for node in self.nodes:
            print(f"AS{node.as_number} Routing Table:")
            for prefix, (_, next_hop) in node.routing_table.items():
                print(f"  Dest: {prefix} --> Next Hop: {next_hop}")

num_nodes = 5
bgp_simulator = BGPSimulator(num_nodes)
bgp_simulator.simulate(iterations=100)
bgp_simulator.display_routing_tables()
