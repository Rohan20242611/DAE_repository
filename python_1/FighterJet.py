"""
Fighter Jet Assignment Program

Assigns a fighter jet based on pilot rank in the airforce.
"""


# Define a dictionary mapping ranks to fighter jets
fighter_jets = {
    "Airman": "F-16 Fighting Falcon",
    "Airman First Class": "F-16 Fighting Falcon",
    "Senior Airman": "F-16 Fighting Falcon",
    "Staff Sergeant": "F/A-18 Hornet",
    "Technical Sergeant": "F/A-18 Hornet",
    "Master Sergeant": "F-22 Raptor",
    "Lieutenant": "F-22 Raptor",
    "Captain": "F-35 Lightning II",
    "Colonel": "F-15 Eagle"
}


def get_pilot_rank():
    """Prompt user for pilot rank"""
    print("Enter your pilot rank:")
    print("1. Airman (E-1 to E-3)")
    print("2. Airman First Class (E-3)")
    print("3. Senior Airman (E-4)")
    print("4. Staff Sergeant (E-5)")
    print("5. Technical Sergeant (E-6)")
    print("6. Master Sergeant (E-7)")
    print("7. Lieutenant (O-3)")
    print("8. Captain (O-6)")
    print("9. Colonel (O-6 and above)")
    rank_num = input("Enter rank number: ")
    
    ranks = ["Airman", "Airman First Class", "Senior Airman", 
             "Staff Sergeant", "Technical Sergeant", 
             "Master Sergeant", "Lieutenant", "Captain", "Colonel"]
    
    return ranks[int(rank_num) - 1]


def assign_fighter_jet(rank):
    """Assign fighter jet based on pilot rank"""
    return fighter_jets.get(rank, "Invalid rank")


def main():
    """Program entry point"""
    rank = get_pilot_rank()
    jet = assign_fighter_jet(rank)
    print(f"You fly the {jet}!")


if __name__ == "__main__":
    main()