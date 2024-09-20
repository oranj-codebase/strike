# Price Dynamics

## Single Outcome Markets

In the BetBTC platform, single-outcome markets are a fundamental type of prediction market where users can bet on one of two possible outcomes of an event. This section explains how the prices of shares for these outcomes are dynamically managed to reflect changing market conditions and beliefs.

### Role of the Bonding Curve

**Purpose**: The bonding curve is a mathematical tool used to determine the price of shares based on their current supply. It ensures that:

* &#x20;**Price Adjustments**: As more shares of a particular outcome are purchased, the price for those shares increases gradually, and vice versa for the opposite outcome.
* **Market Stability**: This gradual adjustment helps prevent sharp price swings, maintaining stability and predictability in the market.

### Trading Mechanics

#### **Buying and Selling Shares**:

* **Initial Share Pricing**: At the start of each market, both outcomes ("Yes" and "No") are typically priced to reflect an equal probability of occurring, often starting at $0.50 each (50% implied probability).
* **Action and Reaction**: When a user buys shares of "Yes", the price of "Yes" increases according to the bonding curve formula. Conversely, the price of "No" decreases slightly to reflect a decreased probability of that outcome.

<figure><img src="../.gitbook/assets/Add a subheading (6).png" alt="" width="375"><figcaption><p>Fig1: Single Outcome Market</p></figcaption></figure>

### Example Scenario: Betting on a Sports Game

**Context**: Consider a prediction market for whether Team X will win their next game. The market offers two options: "Yes, Team X wins" and "No, Team X does not win".

* **User Action**: Suppose User A believes strongly that Team X will win. They decide to buy $100 worth of "Yes" shares.
* **Price Adjustment**: Initially, both "Yes" and "No" shares might be priced at $0.50, implying a 50% probability for each outcome. As User A purchases "Yes" shares, the price for "Yes" might rise to $0.60, while "No" drops to $0.40.
* **Updated Implied Probabilities**:
  * "Yes" shares at $0.60 imply a 60% probability of Team X winning.
  * "No" shares at $0.40 imply a 40% probability of Team X not winning.

## Multiple-Outcome Markets

&#x20;In contrast to single-outcome markets, multiple-outcome markets offer several possible results for each event, making the dynamics more complex and the market more vibrant. This section explains how prices are dynamically managed within such markets.

### Role of the Bonding Curve in Multiple Outcomes

* **Mechanism Description**: The bonding curve formula is applied separately to each outcome within the market. As bets are placed on a particular outcome, its price increases, reflecting a higher perceived probability of that outcome occurring, while the prices of other outcomes adjust downward.
* **Balancing the Market**: This method helps maintain a balanced market where the prices and implied probabilities of all outcomes adjust according to market sentiments and trading behaviors.

### Trading Mechanics

#### **Trading Actions**:

* **Initial Pricing**: At the launch of a market, all outcomes might be priced equally or based on initial assessments of their likelihood.
* **Subsequent Trades**: As users begin to trade, their actions directly influence the prices of the outcomes they bet on.

<figure><img src="../.gitbook/assets/multiple outcomes.png" alt="" width="375"><figcaption><p>Fig2: Multiple Outcome Market</p></figcaption></figure>

### **Example Scenario**: Betting on a Championship Winning Team

* **Market Setup**: Consider a prediction market on "Which team will win the championship?" with teams A, B, and C.
*   **Trading and Price Adjustment:**&#x20;

    **User A buys shares of "Team A":**

    * User A believes "Team A" will win and buys $100 worth of "Team A" shares.
    * The bonding curve adjusts the price of "Team A" shares upwards. Suppose the new price of "Team A" shares is $0.40.
    * The prices of "Team B" and "Team C" shares decrease slightly to maintain the balance. Suppose the new prices are $0.30 for "Team B" and $0.30 for "Team C."

    **User B buys shares of "Team B":**

    * User B believes "Team B" will win and buys $50 worth of "Team B" shares.
    * The  bonding curve adjusts the price of "Team B" shares upwards. Suppose the new price of "Team B" shares is $0.35.
    * The prices of "Team A" and "Team C" shares adjust accordingly. Suppose the new prices are $0.38 for "Team A" and $0.27 for "Team C."

### **Implied Odds:**

The new prices represent the market's updated belief in the probabilities of the outcomes.

* "Team A" shares at $0.38 imply a 38% probability that Team A will win.
* "Team B" shares at $0.35 imply a 35% probability that Team B will win.
* "Team C" shares at $0.27 imply a 27% probability that Team C will win.

####

