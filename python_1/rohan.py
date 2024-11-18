
def add (firstnumb,secondnumb):
    sum = firstnumb + secondnumb
    print(sum)

def sub (firstnumb, secondnumb): 
    dif = firstnumb - secondnumb
    print (dif)

userfirstnumb = int(input("What's your first number? "))
usersecondnumb = int(input("What's your second number? "))

question = input("Do you want to add or subtract?")
if input == "add":
    add(userfirstnumb, usersecondnumb)
else:
    sub(userfirstnumb, usersecondnumb)
