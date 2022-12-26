import logging, json
from logging import Formatter

class PasswordFormatter(Formatter):
    def __init__(self, task_name=None):
        self.task_name = task_name

        super(PasswordFormatter, self).__init__()

    def format(self, record):
        msg = record.getMessage()
        if  'password' in msg:
            msg = msg.replace("password", "sensitive_password")
            logging.getLogger("apps").info(">>>!!! formatting  msg: %s" % (msg))

        data = {'@message': msg }

        if self.task_name:
            data['@task_name'] = self.task_name

        return json.dumps(data)
