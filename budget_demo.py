def get_user_categories():
    categories = {}
    while True:
        category_name = input("Enter category name (or type 'done' to finish): ")
        if category_name.lower() == 'done':
            break
        while True:  # Loop to ensure valid input for allocation type
            allocation_type = input("Is this category percentage-based or fixed amount? (Enter 'percentage' or 'fixed'): ").strip().lower()
        
            if allocation_type == 'percentage':
                percentage = float(input(f"Enter the percentage for {category_name} (e.g., 10 for 10%): "))
                categories[category_name] = {'type': 'percentage', 'value': percentage}
                break
            elif allocation_type == 'fixed':
                amount = float(input(f"Enter the fixed amount for {category_name} (e.g., 500 for $500): "))
                categories[category_name] = {'type': 'fixed', 'value': amount}
                break
            else:
                print("Invalid input. Please enter 'percentage' or 'fixed'.")
            
    return categories

def budget_allocation(income, period, user_categories):
    # Calculate total income based on the chosen period
    if period == 'monthly':
        total_income = income * 2  # Biweekly to monthly
        monthly_income = income * 2  # Biweekly to monthly
    elif period == 'annual':
        total_income = income * 26  # Biweekly to annual
        annual_income = income * 26  # Biweekly to annual
    else:
        print("Invalid period. Please choose 'monthly' or 'annual'.")
        return
    
    allocations = {}
    total_percentage = 0
    fixed_total = 0
    
    for category, details in user_categories.items():
        if details['type'] == 'percentage':
            allocations[category] = (details['value'] / 100) * total_income
            total_percentage += details['value']
        elif details['type'] == 'fixed':
            allocations[category] = details['value']
            fixed_total += details['value']
    
    # Check if the total percentage exceeds 100%
    if total_percentage > 100:
        print("Error: Total percentage exceeds 100%. Please adjust your percentages.")
        return
    
    # Calculate remaining balance
    allocated_total = sum(allocations.values())
    remaining_balance = total_income - allocated_total
    
    # Add remaining balance to allocations
    allocations['Remaining Balance'] = remaining_balance
    
    # Display the budget summary
    print("\nBudget Summary:")
    print(f"Paycheck: ${biweekly_income:.2f}")
    if period == 'monthly':
        print(f"Monthly Income: ${monthly_income:.2f}")
    elif period == 'annual':
        print(f"Annual Income: ${annual_income:.2f}")
    for category, amount in allocations.items():
        print(f"{category}: ${amount:.2f}")
        
    return allocations

# Example usage
biweekly_income = float(input("Enter your biweekly income: "))
budgeting_period = input("Do you want to budget monthly or annually? (Enter 'monthly' or 'annual'): ").strip().lower()
user_categories = get_user_categories()
budget_allocation(biweekly_income, budgeting_period, user_categories)
