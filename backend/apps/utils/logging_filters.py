import re
from logging import Filter
from django.conf import settings

class PasswordFilter(Filter):

    def filter(self, record):
        msg = record.getMessage()
        # O formatter padrão retorna a mensagem, mesmo que seja json originalmente, como string.
        # Isso pode fazer com que a mensagem seja uma string com conteúdo, por exemplo, "b'{'a': 'b'}"

        to_obfuscate = ["password"]

        if settings.SENSITIVE_WORDS:
            to_obfuscate = settings.SENSITIVE_WORDS

        for word in to_obfuscate:
            if word in msg:
                # print(f'>>> msg before: {msg}.')
                p = re.compile(r"\"" + word + "\"\s*:\s*?\".*?\"")
                msg = p.sub('"' + word + '": "[obfuscated]"', msg)
                # print(f'>>> msg obfuscating {word}: {msg}')
        # print(f'>>> msg: {msg}')
        record.msg = msg
        return True