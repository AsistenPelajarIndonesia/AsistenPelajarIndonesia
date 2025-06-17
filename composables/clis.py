import os
import pprint
import os
from cerebras.cloud.sdk import Cerebras
from groq import Groq
import time
import google.generativeai as genai

client = Cerebras(
    api_key="csk-wxt9cy4m54dxm6nvyxc8kj3hv2e43tjytehrjdyddy44ry6v"
)

gclient = Groq(
    api_key="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"
)

# Set your API key
genai.configure(api_key="AIzaSyCqk7xz4HwwZIjOnV1Pcx-PkPHIGr9WKCA")

def basic_getter(system: str, user: str) -> str:
    
    model = genai.GenerativeModel(model_name="models/gemini-2.5-flash-preview-05-20", system_instruction=system)

    response = model.generate_content(user)

    return response.text
    # provisioner = client.chat.completions.create(
    #     messages=[
    #         {
    #             "role": "system",
    #             "content": system
    #         },
    #         {
    #             "role": "user",
    #             "content": user
    #         
    #         }
    #     ],
    #     model="llama-4-scout-17b-16e-instruct",
    #     stream=False,
    #     max_completion_tokens=8192,
    #     temperature=0.7,
    #     top_p=1
    # )
    # return provisioner.choices[0].message.content

def load_files_from_folder(folder_path):
    file_dict = {}
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as file:
                file_dict[file_name] = file.read()
    return file_dict

def load_and_categorize_files(folder_path):
    user_files = {}
    system_files = {}
    indicator_files = {}
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8', errors="replace") as file:
                content = file.read()
                if 'system' in file_name.lower():
                    system_files[file_name] = content
                elif 'user' in file_name.lower():
                    user_files[file_name] = content
                elif 'indicator' in  file_name.lower():
                    indicator_files[file_name] = content

    return user_files, system_files, indicator_files


def indicator_report(data: str, indicator_value: str) -> str:
    return basic_getter("""
                You are a text quality assessment engine. When given an input, follow these steps precisely:

                1. Parse the users instruction payload, which will include:
                • “text”: the text to evaluate (string)

                2. Analyze the “text” according to the specified “parameter.” Generate a numerical or categorical grade (for example, a score out of 100, a letter grade, or a descriptor such as “Excellent,” “Good,” “Fair,” “Poor”), based on how well the text meets the requested criterion.

                3. Produce exactly one JSON object (no extra prose, no stray punctuation) with the following fields:
                • “parameter”: "{{parameter}}"  
                • “grade”: your evaluation of the text's quality under that parameter (string or number)  
                • “feedback”: a brief explanation (1-2 sentences) justifying the grade you assigned (string)

                Example JSON output format (do not deviate):
                {
                "parameter1": "34",
                "parameter2": "22",
                "parameter3": "98", // etc
                "overall_grade": "95",
                "feedback": "The sentence is grammatically correct with proper subject-verb agreement and punctuation."
                }
                Grade it from 1/100
                Always respond with a well-formed JSON object containing those four keys. Do not include any additional keys, comments, or formatting. If any required field is missing in the user's input, return a JSON object with “grade”: null and “feedback” explaining which field was missing.
                """.replace("{{parameter}}", indicator_value),
            f"Review: {data} (Respond In JSON)")


folder_path = '/Users/aqila/Environment/ProfessorWorkplace/Primary/SNBT'
output_path = '/Users/aqila/Environment/ProfessorWorkplace/Output/SNBT'
user_dict, system_dict, indicator_dict = load_and_categorize_files(folder_path)


print("hello there")
print(user_dict)
print(system_dict)
print(indicator_dict)

for user_key, user_val in user_dict.items():
    data = basic_getter(system_dict[user_key.replace('user', 'system')], user_val)
    print(f"User File: {user_key}")
    print(f"System File: {system_dict[user_key.replace('user', 'system')]}")
    print("-" * 50)
    with open(f"{output_path}G-{user_key.replace('user', 'output')}", "w") as f:
        f.write(data)
    print(indicator_report(data, indicator_dict[user_key.replace('user', "indicator")]))
    print("-" * 50)
    print()
    time.sleep(60)
