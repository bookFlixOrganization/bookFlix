from email.mime.text import MIMEText


from ssl import create_default_context

from smtplib import SMTP

from typing import List

from pydantic import BaseModel

from src.config.project_config import settings


class MailBody(BaseModel):
    to: List[str]
    subject: str
    body: str


async def email_prepare_data_send(user_name: str, result):
    to = [f"email{i}@mail.ru" for i in range(len(result))]

    if len(to) != 0:
        data = {
            "to": to,
            "subject": "New article on bookFlix!",
            "body": f"You can read a new article written by the {user_name}",
        }
    await email_send(data)


async def email_send(data: dict):
    msg = MailBody(**data)
    message = MIMEText(msg.body, "html")
    message["From"] = settings.MAIL_USERNAME
    message["To"] = ",".join(msg.to)
    message["Subject"] = msg.subject

    ctx = create_default_context()

    try:
        with SMTP(settings.MAIL_HOST, settings.MAIL_PORT) as server:
            server.ehlo()
            server.starttls(context=ctx)
            server.ehlo()
            server.login(settings.MAIL_USERNAME, settings.MAIL_PASS)
            server.send_message(message)
            server.quit()
    except Exception as ex:
        print(ex)
