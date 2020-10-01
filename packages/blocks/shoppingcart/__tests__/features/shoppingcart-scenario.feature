Feature: shoppingcart

    Scenario: User navigates to shoppingcart
        Given I am a User loading shoppingcart
        When I navigate to the shoppingcart
        Then shoppingcart will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors