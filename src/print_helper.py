import sys

def print_player(x):
    with open('player_text.txt', 'a') as output_file1:
        original_stdout = sys.stdout
        sys.stdout = output_file1
        print(x)
        sys.stdout = original_stdout

def print_internal(x):
    with open('internal_text.txt', 'a') as output_file2:
        original_stdout = sys.stdout
        sys.stdout = output_file2
        print(x)
        sys.stdout = original_stdout

        