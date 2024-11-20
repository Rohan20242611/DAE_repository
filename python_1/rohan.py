# Function to display the calculator menu options to the user
def displayMenu():
   print("Welcome to our calculator")
   print("1: addition")  # Option 1: Addition
   print("2: subtraction")  # Option 2: Subtraction
   print("3: multiplication")  # Option 3: Multiplication
   print("4: division")  


def addNumbers(firstNumber, secondNumber):
   sum = firstNumber + secondNumber  # Perform addition
   # Convert numbers to strings to avoid TypeError in concatenation
   print("The sum of " + str(firstNumber) + " and " + str(secondNumber) + " is " + str(sum))


# Function to perform subtraction of two numbers and print the result
def subtractNumbers(firstNumber, secondNumber):
   difference = firstNumber - secondNumber  # Perform subtraction
   print("The difference of " + str(firstNumber) + " and " + str(secondNumber) + " is " + str(difference))


# Function to perform multiplication of two numbers and print the result
def multiplyNumbers(firstNumber, secondNumber):
   product = firstNumber * secondNumber  # Perform multiplication
   print("The product of " + str(firstNumber) + " and " + str(secondNumber) + " is " + str(product))


# Function to perform division of two numbers and print the result
def divideNumbers(firstNumber, secondNumber):
   # Check if secondNumber is not zero to avoid division by zero error
   if secondNumber != 0:  # != means "not equal to"
       quotient = firstNumber / secondNumber  # Perform division
       print("The quotient of " + str(firstNumber) + " and " + str(secondNumber) + " is " + str(quotient))
   else:
       print("Error: Cannot divide by zero.")  # Handle division by zero case




# Main program logic
def main():
   #                   0            1             2               3
   allFeatures = ["Addition", "Subtraction", "Division", "Multiplication", "Modulus"] # Indexes start from zero
   # Display the menu to the user, showing available operations
   #displayMenu()
  
   print("Here are the features in the application: ")


   #Start the loop
   for currentFeature in allFeatures:
       print(currentFeature)




   userOption = int(input("Please select an option (1-4): "))
  
   # Get user input for the numbers to perform the operation on
   userFirstNumber = int(input("What's your first number: "))  # Convert input to integer
   userSecondNumber = int(input("What's your second number: "))  # Convert input to integer
  
   # Execute the selected operation based on user's choice
   if userOption == 1:
       addNumbers(userFirstNumber, userSecondNumber)  # Call addNumbers if option is 1
   elif userOption == 2:
       subtractNumbers(userFirstNumber, userSecondNumber)  # Call subtractNumbers if option is 2
   elif userOption == 3:
       multiplyNumbers(userFirstNumber, userSecondNumber)  # Call multiplyNumbers if option is 3
   elif userOption == 4:
       divideNumbers(userFirstNumber, userSecondNumber)  # Call divideNumbers if option is 4
   else:
       print("Invalid option selected. Please choose a number between 1 and 4.")


# Call the main function to start the program
main()

