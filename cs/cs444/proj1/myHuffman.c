#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <unistd.h>

// Define a structure to represent a node in the Huffman tree
typedef struct Node {
    char data;
    int freq;
    struct Node *left;
    struct Node *right;
} Node;

// Function to create a new node
Node* newNode(char data, int freq) {
    Node* temp = (Node*)malloc(sizeof(Node));
    temp->data = data;
    temp->freq = freq;
    temp->left = temp->right = NULL;
    return temp;
}

// Define a structure to represent a priority queue for Huffman nodes
typedef struct PriorityQueue {
    int size;
    int capacity;
    Node **array;
} PriorityQueue;

// Function to create a priority queue
PriorityQueue* createPriorityQueue(int capacity) {
    PriorityQueue* queue = (PriorityQueue*)malloc(sizeof(PriorityQueue));
    queue->size = 0;
    queue->capacity = capacity;
    queue->array = (Node**)malloc(capacity * sizeof(Node*));
    return queue;
}

// Function to swap two nodes in the priority queue
void swapNodes(Node** a, Node** b) {
    Node* temp = *a;
    *a = *b;
    *b = temp;
}

// Function to maintain the min-heap property of the priority queue
void minHeapify(PriorityQueue* queue, int index) {
    int smallest = index;
    int left = 2 * index + 1;
    int right = 2 * index + 2;

    if (left < queue->size && queue->array[left]->freq < queue->array[smallest]->freq)
        smallest = left;

    if (right < queue->size && queue->array[right]->freq < queue->array[smallest]->freq)
        smallest = right;

    if (smallest != index) {
        swapNodes(&queue->array[index], &queue->array[smallest]);
        minHeapify(queue, smallest);
    }
}

// Function to insert a node into the priority queue
void insert(PriorityQueue* queue, Node* node) {
    ++queue->size;
    int i = queue->size - 1;
    while (i > 0 && node->freq < queue->array[(i - 1) / 2]->freq) {
        queue->array[i] = queue->array[(i - 1) / 2];
        i = (i - 1) / 2;
    }
    queue->array[i] = node;
}

// Function to extract the node with the minimum frequency from the priority queue
Node* extractMin(PriorityQueue* queue) {
    Node* minNode = queue->array[0];
    queue->array[0] = queue->array[queue->size - 1];
    --queue->size;
    minHeapify(queue, 0);
    return minNode;
}

// Function to build the Huffman tree
Node* buildHuffmanTree(char data[], int freq[], int size) {
    PriorityQueue* queue = createPriorityQueue(size);

    for (int i = 0; i < size; ++i) {
        insert(queue, newNode(data[i], freq[i]));
    }

    while (queue->size > 1) {
        Node* left = extractMin(queue);
        Node* right = extractMin(queue);

        Node* mergeNode = newNode('$', left->freq + right->freq);
        mergeNode->left = left;
        mergeNode->right = right;

        insert(queue, mergeNode);
    }

    Node* root = extractMin(queue);
    free(queue);
    return root;
}

// Function to print Huffman codes from the tree
void printHuffmanCodes(Node* root, int arr[], int top) {
    if (root->left) {
        arr[top] = 0;
        printHuffmanCodes(root->left, arr, top + 1);
    }

    if (root->right) {
        arr[top] = 1;
        printHuffmanCodes(root->right, arr, top + 1);
    }

    if (!(root->left) && !(root->right)) {
        printf("%c: ", root->data);
        for (int i = 0; i < top; ++i) {
            printf("%d", arr[i]);
        }
        printf("\n");
    }
}

// Function to encode a file using Huffman codes
void encodeFile(FILE* inputFile, FILE* outputFile, Node* root) {
    int buffer = 0;
    int bitCount = 0;
    char ch;

    while ((ch = fgetc(inputFile)) != EOF) {
        int arr[256];
        int top = 0;
        Node* current = root;

        while (1) {
            if (ch == '0') {
                current = current->left;
            } else if (ch == '1') {
                current = current->right;
            }

            if (current->left == NULL && current->right == NULL) {
                arr[top++] = current->data;
                break;
            }

            ch = fgetc(inputFile);
        }

        for (int i = 0; i < top; ++i) {
            for (int j = 7; j >= 0; --j) {
                int bit = (arr[i] >> j) & 1;
                buffer = (buffer << 1) | bit;
                ++bitCount;
                if (bitCount == 8) {
                    fputc(buffer, outputFile);
                    buffer = 0;
                    bitCount = 0;
                }
            }
        }
    }

    // Write any remaining bits in the buffer
    while (bitCount < 8) {
        buffer = (buffer << 1);
        ++bitCount;
    }
    fputc(buffer, outputFile);
}

int main(int argc, char* argv[]) {
    char* inputFile = "completeShakespeare.txt";
    char* outputFile = "huffman.out";
    int opt;

    // Parse command-line options
    while ((opt = getopt(argc, argv, "i:o:")) != -1) {
        switch (opt) {
            case 'i':
                inputFile = optarg;
                break;
            case 'o':
                outputFile = optarg;
                break;
            default:
                fprintf(stderr, "Usage: %s -i <inputfile> -o <outputfile>\n", argv[0]);
                exit(EXIT_FAILURE);
        }
    }

    // Read the input file
    FILE* input = fopen(inputFile, "r");
    if (!input) {
        perror("Error opening input file");
        exit(EXIT_FAILURE);
    }

    // Count character frequencies
    int freq[256] = {0};
    char ch;
    while ((ch = fgetc(input)) != EOF) {
        freq[ch]++;
    }
    fclose(input);

    // Create Huffman tree
    char data[256];
    int size = 0;
    for (int i = 0; i < 256; ++i) {
        if (freq[i] > 0) {
            data[size++] = (char)i;
        }
    }
    Node* root = buildHuffmanTree(data, freq, size);

    // Print Huffman codes (optional)
    int arr[256];
    int top = 0;
    // Uncomment the following line to print Huffman codes
    // printHuffmanCodes(root, arr, top);

    // Reopen the input file and open an output file
    input = fopen(inputFile, "r");
    FILE* output = fopen(outputFile, "wb");
    if (!input || !output) {
        perror("Error opening files");
        exit(EXIT_FAILURE);
    }

    // Encode the input file and write to the output file
    encodeFile(input, output, root);

    // Close the files
    fclose(input);
    fclose(output);

    // Free dynamically allocated memory
    // Note: You might want to implement a function to free the Huffman tree nodes
    free(root);

    return 0;
}
