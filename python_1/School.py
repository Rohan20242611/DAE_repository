jm# Get user input for school name and convert to lowercase
school = input("What school are you attending? ").lower()


# Determine school rating based on first letter of school name
if school[0] <= 's':
    print("Terrible school!")
elif school[0] <= 'w':
    print("Best school!")
else:
    print("School not existent!")
    
