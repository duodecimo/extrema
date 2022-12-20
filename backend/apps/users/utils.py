import threading
import os

from django.core.mail import EmailMessage


class EmailThread(threading.Thread):
    def _init_(self, email):
        self.email = email
        threading.Thread._init_(self)

    def run(self):
        self.email.send()
# Exception has occurred: SMTPAuthenticationError
# (535, b'5.7.8 Username and Password not accepted. Learn more at\n5.7.8  https://support.google.com/mail/?p=BadCredentials v128sm1766884qkc.127 - gsmtp')
#   File "/extra2/mixSixIt/repos/pratudo-backend/authentication/utils.py", line 13, in run
#     self.email.send()

class Util:
    @staticmethod
    def send_email(data):
        # EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
        # EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
        # print('DELETE AFTER TEST! sendig email trough host user: ',
        #       EMAIL_HOST_USER, " password: ", EMAIL_HOST_PASSWORD)
        email = EmailMessage(subject=data['email_subject'],
                             body=data['email_body'],
                             to=[data['to_email']])
        EmailThread(email).start()