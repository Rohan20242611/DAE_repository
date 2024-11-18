

def main():
    print("Welcome to the Would You Rather Quiz!")
    print("Answer the following questions by typing 'A' or 'B'.")
    print("Type 'exit' to end the quiz at any time.\n")

    questions = [
        {
            "question": "Would you rather have the ability to fly (A) or be invisible (B)?",
            "options": ["A", "B"]
        },
        {
            "question": "Would you rather live in the ocean (A) or in space (B)?",
            "options": ["A", "B"]
        },
        {
            "question": "Would you rather have super strength (A) or super speed (B)?",
            "options": ["A", "B"]
        },
        {
            "question": "Would you rather always have to tell the truth (A) or always lie (B)?",
            "options": ["A", "B"]
        },
        {
            "question": "Would you rather be able to read minds (A) or see the future (B)?",
            "options": ["A", "B"]
        }
    ]

    for idx, item in enumerate(questions, start=1):
        print(f"Question {idx}: {item['question']}")
        guess = input("Your answer (A/B): ").strip().upper()

        if guess == 'EXIT':
            print("Thanks for playing!")
            break
        elif guess in item["options"]:
            print("Great choice!\n")
        else:
            print("Invalid option. Please choose A or B.\n")

    print("Quiz over!")

if __name__ == "__main__":
    main()
