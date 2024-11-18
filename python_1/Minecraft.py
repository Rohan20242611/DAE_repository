import random

class MinecraftSimulator:
    def __init__(self):
        self.resources = {
            'dirt': 0,
            'stone': 0,
            'coal': 0,
            'iron': 0,
            'wood': 0
        }
        self.tools = {
            'pickaxe': 0,  # Count of pickaxes
            'axe': 0       # Count of axes
        }
        self.crafting_recipes = {
            'pickaxe': {'stone': 3},
            'axe': {'wood': 3},
            'furnace': {'stone': 8}
        }
        self.mobs = ['bobson', 'bob', 'steve']

    def display_resources(self):
        print("\nYour Resources:")
        for resource, amount in self.resources.items():
            print(f"{resource.capitalize()}: {amount}")
        for tool, amount in self.tools.items():
            print(f"{tool.capitalize()}: {amount}")

    def mine_block(self, block_type):
        if block_type in self.resources:
            print(f"You mined a {block_type} block!")
            self.resources[block_type] += 1
        else:
            print("Invalid block type.")

    def craft_item(self, item):
        if item in self.crafting_recipes:
            can_craft = True
            for resource, amount in self.crafting_recipes[item].items():
                if self.resources[resource] < amount:
                    can_craft = False
                    break
            
            if can_craft:
                for resource, amount in self.crafting_recipes[item].items():
                    self.resources[resource] -= amount
                self.tools[item] += 1
                print(f"You crafted a {item}!")
            else:
                print(f"Not enough resources to craft a {item}.")
        else:
            print("Invalid item to craft.")

    def fight_mob(self):
        mob = random.choice(self.mobs)
        print(f"A wild {mob} appeared!")
        action = input("Do you want to fight or run? (fight/run): ").strip().lower()
        
        if action == 'fight':
            if random.random() < 0.5:  # 50% chance to win
                print(f"You defeated the {mob}!")
            else:
                print(f"The {mob} defeated you! Game over.")
                return False  # End game if defeated
        elif action == 'run':
            print(f"You ran away from the {mob}.")
        else:
            print("Invalid action. You lost your chance to act!")
        
        return True  # Continue the game if not defeated

    def play(self):
        print("Welcome to the Minecraft Simulator!")
        while True:
            self.display_resources()
            action = input("\nWhat would you like to do? (mine/craft/fight/quit): ").strip().lower()
            if action == 'mine':
                block_type = input("Which block would you like to mine? (dirt/stone/coal/iron/wood): ").strip().lower()
                self.mine_block(block_type)
            elif action == 'craft':
                item = input("What would you like to craft? (pickaxe/axe/furnace): ").strip().lower()
                self.craft_item(item)
            elif action == 'fight':
                if not self.fight_mob():
                    break  # End game if defeated
            elif action == 'quit':
                print("Thanks for playing!")
                break
            else:
                print("Invalid action. Please choose 'mine', 'craft', 'fight', or 'quit'.")

if __name__ == "__main__":
    game = MinecraftSimulator()
    game.play()
