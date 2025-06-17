import numpy as np
import pandas as pd

# Parameters
monthly_contribution = 300
annual_price_growth = 0.10  # 10% price growth
annual_dividend_yield = 0.10  # 10% dividend yield
# Total return considering reinvested dividends: (1 + price_growth) * (1 + dividend_yield) - 1
annual_total_return = (1 + annual_price_growth) * (1 + annual_dividend_yield) - 1

# Convert annual total return to monthly rate
monthly_rate = (1 + annual_total_return) ** (1/12) - 1

# Simulate over 36 months
balances = []
balance = 0
for month in range(1, 37):
    balance = balance * (1 + monthly_rate) + monthly_contribution
    balances.append({"Month": month, "Balance (USD)": balance})

df = pd.DataFrame(balances)

# Display the dataframe to the user
import ace_tools_open as tools; tools.display_dataframe_to_user("3-Year Investment Growth", df)

# Also output final balance
final_balance = balance