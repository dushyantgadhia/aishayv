Feature: paymentadmin

    Scenario: User navigates to paymentadmin
        Given I am a User loading paymentadmin
        When I navigate to the paymentadmin
        Then paymentadmin will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors