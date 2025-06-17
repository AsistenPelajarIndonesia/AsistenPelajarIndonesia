from dataclasses import dataclass

@dataclass
class Prompt:
    system: str
    user: str


def get_toefl_integrated_writing_content_prompt() -> Prompt:
    system_prompt = """You are an expert TOEFL content generator. Create a complete TOEFL iBT Integrated Writing task set. 
The reading passage should be academic, 230-300 words, presenting a clear stance or explanation on a topic. 
The lecture should be a 1.5-2 minute audio script (provide the transcript) that challenges or casts doubt on specific points in the reading passage. 
The lecture must directly address and counter at least 2-3 distinct points from the reading. 
Provide a title for the reading passage. 
The writing prompt is always: "Summarize the points made in the lecture, and explain how they relate to specific points in the reading." 
Output the content as a JSON object with keys: "readingPassageTitle", "readingPassageText", "lectureTranscript", "writingPrompt". Make the topic complex and challenging, suitable for advanced ESL learners. For example, a debate on socio-economic theories, environmental policies, or historical interpretations. Ensure the arguments and counter-arguments are nuanced and require careful synthesis."""
    user_prompt = "Generate a new TOEFL Integrated Writing task set with a challenging academic topic."
    return Prompt(system_prompt=system_prompt, user_prompt=user_prompt)
