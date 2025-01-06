import requests

# Define the API endpoint and API key
url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
api_key = "AIzaSyBaHEgCo8WhAnnaZB3EtM60iLLkpBcL5U0"

# Define the request headers
headers = {
    "Content-Type": "application/json"
}

print("Welcome to the Q&A bot! Type your questions below (or type 'exit' to quit):")

# Continuous conversation loop
while True:
    # Prompt the user for a question
    user_input = input("\nYour question: ")
    
    # Exit condition
    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    # Define the JSON payload with user input
    data = {
        "contents": [{
            "parts": [{"text": user_input}]
        }]
    }

    # Send the POST request
    response = requests.post(f"{url}?key={api_key}", headers=headers, json=data)

    # Check response status
    if response.status_code == 200:
        # Extract the text response
        response_data = response.json()
        if "candidates" in response_data and len(response_data["candidates"]) > 0:
            answer = response_data["candidates"][0]["content"]["parts"][0]["text"]
            print(f"Answer: {answer}")
        else:
            print("No answer available.")
    else:
        print(f"Error: {response.status_code}, {response.text}")
