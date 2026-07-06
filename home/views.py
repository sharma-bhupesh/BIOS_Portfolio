from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import json
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
import logging

@ensure_csrf_cookie
def home(request):
    return render(request, 'home/index.html')

logger = logging.getLogger(__name__)

@require_POST
def contact(request):
    if request.content_type != "application/json":
        return JsonResponse({"success": False, "message": "Invalid Content Type."}, status=400)
    try:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
        
        sender = data.get("from", "").strip()

        if "\n" in sender or "\r" in sender:
            return JsonResponse({"success": False, "message": "Invalid Email."}, status=400)
        
        subject = data.get("subject", "").strip()

        if "\n" in subject or "\r" in subject:
            return JsonResponse({"success": False, "message": "Invalid Subject."}, status=400)
        
        message = data.get("message", "").strip()

        missing = []
        if not sender:
            missing.append("Email")

        if not subject:
            missing.append("Subject")

        if not message:
            missing.append("Message")

        if missing:
            return JsonResponse({"success": False, "message": f"Missing fields: {','.join(missing)}"}, status=400)

        body = f"""
Portfolio Contact Form

Visitor Email:
{sender}

--------------------------------

{message}
"""
        try:
            validate_email(sender)
        except ValidationError:
            return JsonResponse({"success": False, "message": "Invalid Email Address. Please enter Valid email"})
        
        if len(subject) > 100:
            return JsonResponse({"success": False, "message": "Subject is too long."}, status=400)
        if len(message) > 3000:
            return JsonResponse({"success": False, "message": "Message is too long."}, status=400)
        
        print("EMAIL_HOST_USER:", settings.EMAIL_HOST_USER)
        print("EMAIL_HOST_PASSWORD PRESENT:", bool(settings.EMAIL_HOST_PASSWORD))
        send_mail(subject=subject, message=body, from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[settings.EMAIL_HOST_USER], fail_silently= False)
        return JsonResponse({"success": True})
    
    except Exception:
        logger.exception("Contact form failed.")
        return JsonResponse({"success": False, "message": "Unable to process your request at this time."}, status=500)