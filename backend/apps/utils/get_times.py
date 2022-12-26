from datetime import date, datetime, timedelta

def sys_time(now=datetime.now()):
    #now_utc = datetime.utcnow().replace(tzinfo=pytz.utc)
    # now = datetime.strptime(now, '%d/%b/%Y')
    week_beginning = now - timedelta(days=now.weekday())
    week_beginning = week_beginning.replace(hour=0, minute=0, second=0, microsecond=0)
    week_end = week_beginning + timedelta(days=6)
    week_end = week_end.replace(hour=23, minute=59, second=59, microsecond=0)
    month_beginning = now
    month_beginning = month_beginning.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    month = month_beginning.month
    if month == 12:
        month_end = month_beginning.replace(month=month, day=31, hour=23, minute=59, second=59, microsecond=0)
    else:
        month_end = month_beginning.replace(month=month+1, hour=23, minute=59, second=59, microsecond=0)
        month_end = month_end + timedelta(days=-1)
    date_time = {}
    #date_time['now'] = now.strftime("%d/%m/%Y, %H:%M:%S")
    date_time['now_date'] = now.strftime("%d/%m/%Y")
    date_time['now_hour'] = now.strftime("%H:%M:%S")
    date_time['week_beginning'] = week_beginning
    date_time['week_beginning_date'] = week_beginning.strftime("%d/%m/%Y")
    date_time['week_beginning_hour'] = week_beginning.strftime("%H:%M:%S")
    date_time['weekend'] = week_end
    date_time['weekend_date'] = week_end.strftime("%d/%m/%Y")
    date_time['weekend_hour'] = week_end.strftime("%H:%M:%S")
    date_time['month_beginning'] = month_beginning
    date_time['month_beginning_date'] = month_beginning.strftime("%d/%m/%Y")
    date_time['month_beginning_hour'] = month_beginning.strftime("%H:%M:%S")
    date_time['month_end'] = month_end
    date_time['month_end_date'] = month_end.strftime("%d/%m/%Y")
    date_time['month_end_hour'] = month_end.strftime("%H:%M:%S")

    return date_time

def datetime_from_date_and_time(data, horario):
    result = datetime.now()
    result = result.replace(year = data.year, month = data.month, \
             day=data.day, hour=horario.hour, minute=horario.minute, second=horario.second)
    return result

