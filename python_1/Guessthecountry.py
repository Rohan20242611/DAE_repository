

def main():\
    print("Welcome to the Guess the Flag Game!")\
    print("You will be given the names of countries and you need to guess their flags.")\
    print("Type 'exit' to end the game at any time.\\n")\
\
    # Dictionary of countries and their flags (represented as emoji)\
    flags = \{\
        "USA": "\uc0\u55356 \u56826 \u55356 \u56824 ",\
        "Canada": "\uc0\u55356 \u56808 \u55356 \u56806 ",\
        "Japan": "\uc0\u55356 \u56815 \u55356 \u56821 ",\
        "Germany": "\uc0\u55356 \u56809 \u55356 \u56810 ",\
        "France": "\uc0\u55356 \u56811 \u55356 \u56823 ",\
        "Brazil": "\uc0\u55356 \u56807 \u55356 \u56823 ",\
        "India": "\uc0\u55356 \u56814 \u55356 \u56819 ",\
        "Australia": "\uc0\u55356 \u56806 \u55356 \u56826 ",\
        "Italy": "\uc0\u55356 \u56814 \u55356 \u56825 ",\
        "South Africa": "\uc0\u55356 \u56831 \u55356 \u56806 ",\
    \}\
\
    # Game loop\
    for country, flag in flags.items():\
        print(f"Guess the flag: \{flag\}")\
        guess = input("Your guess: ")\
\
        if guess.lower() == 'exit':\
            print("Thanks for playing!")\
            break\
        elif guess.lower() == country.lower():\
            print("Correct!\\n")\
        else:\
            print(f"Wrong! The correct answer was: \{country\}\\n")\
\
    print("Game over!")\
\
if __name__ == "__main__":\
    main()\
}