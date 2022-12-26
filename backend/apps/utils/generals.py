from django.template.loader import get_template
from django.http import HttpResponse
from io import BytesIO
from xhtml2pdf import pisa


def render_to_pdf(template, context, show=False):
    print('Em render_to_pdf - show: ', show)
    template = get_template(template)
    html = template.render(context)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    if not pdf.err:
        if show:
            return HttpResponse(result.getvalue(), content_type='application/pdf')
        else:
            return result.getvalue()
    return None
