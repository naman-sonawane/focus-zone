print("main.py is running")

import subprocess
import os
import google.generativeai as genai
import requests
import pygetwindow as gw
import keyboard
from dotenv import load_dotenv
import subprocess

load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

global focused
focused = False
prevWindow = ''
whitelisted = ['Task Switching', 'FocusZone']

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

while True:
    focused = requests.get('http://localhost:2244/status').json()['stat']
    blocked = requests.get('http://localhost:2244/blocked').json()['blocked']

    if focused:
        # Get a list of all windows
        window = gw.getActiveWindow()
        title = window.title

        if window != None:
            # Print the titles of all windows
            if title != prevWindow:
                print(title)
                if title not in whitelisted and 'Visual Studio' not in title and not ('new' in title.lower() and 'tab' in title.lower()):
                    prompt = f'If this window "{title}" matches one of the distracting topics: [{', '.join(blocked)}], respond with "X", else respond with "A". Do not write anything more than a singular letter.'
                    response = model.generate_content(prompt)
                    print(f'{response.text.strip()}')
                    try:
                        if response.text.strip() == 'X':
                            keyboard.press_and_release('ctrl+w')
                    finally:
                        pass

            prevWindow = title