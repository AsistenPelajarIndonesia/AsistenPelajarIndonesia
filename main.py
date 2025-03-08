from groq import Groq

client = Groq(api_key="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")
completion = client.chat.completions.create(
    model="llama-3.2-90b-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "what do you think this is"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Euro_coins_and_banknotes_%28cropped%29.jpg/1200px-Euro_coins_and_banknotes_%28cropped%29.jpg"
                    }
                }
            ]
        },
        {
            "role": "assistant",
            "content": "The image depicts a stylized flame, characterized by its bright blue color and wavy, curved shape. The flame is positioned centrally in the image, with its base situated at the bottom and its tip pointing upwards. The flame's shape is dynamic, with curved lines that give it a sense of movement and energy.\n\nThe background of the image is solid black, which helps to accentuate the bright blue color of the flame. The overall effect is one of intensity and power, as if the flame is about to burst into action at any moment. The image could be used to represent a variety of concepts, such as passion, energy, or creativity."
        }
    ],
    temperature=1,
    max_completion_tokens=1024,
    top_p=1,
    stream=False,
    stop=None,
)

print(completion.choices[0].message.content)
