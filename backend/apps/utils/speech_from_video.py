import speech_recognition as sr
import moviepy.editor as mp
import sys

args = sys.argv[1:]

clip = mp.VideoFileClip(args[0])

clip.audio.write_audiofile(r"converted.wav")

r = sr.Recognizer()

audio = sr.AudioFile("converted.wav")

with audio as source:
    audio_file = r.record(source)
result = r.recognize_google(audio_file, language="pt-BR")
print("resultado: ", result)

# exporting the result
with open('recognized.txt', mode='w') as file:
    file.write("Fala reconhecida:")
    file.write("\n")
    file.write(result)
    print("tudo pronto!")

# howto
# pip install SpeechRecognition moviepy

# usage: python speech_from_video.py <video file>