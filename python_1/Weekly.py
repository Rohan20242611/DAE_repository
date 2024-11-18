def display_schedule(schedule):
    print("\nYour Weekly Schedule:")
    for day, tasks in schedule.items():
        print(f"{day}: {', '.join(tasks) if tasks else 'No tasks scheduled'}")
    print()

def main():
    # Initialize an empty schedule
    schedule = {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
        "Sunday": []
    }

    while True:
        print("Weekly Schedule Picker")
        print("1. Add Task")
        print("2. View Schedule")
        print("3. Exit")
        
        choice = input("Enter your choice (1-3): ")

        if choice == '1':
            day = input("Enter the day of the week (e.g., Monday): ").strip().capitalize()
            if day in schedule:
                task = input("Enter the task: ")
                schedule[day].append(task)
                print(f"Task '{task}' added to {day}.")
            else:
                print("Invalid day. Please enter a valid day of the week.")

        elif choice == '2':
            display_schedule(schedule)

        elif choice == '3':
            print("Goodbye!")
            break

        else:
            print("Invalid choice. Please enter a number between 1 and 3.")

if __name__ == "__main__":
    main()
