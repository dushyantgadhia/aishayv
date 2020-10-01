Feature: reviews

    Scenario: User navigates to reviews
        Given I am a User loading reviews
        When I navigate to the reviews
        Then reviews will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors