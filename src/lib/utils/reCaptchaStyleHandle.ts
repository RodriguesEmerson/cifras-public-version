export function hiddeReCaptchaBox() {
   try{
      const grecaptchaBadge:HTMLDivElement| null  = document.querySelector(".grecaptcha-badge");
      if(!grecaptchaBadge) return;
      grecaptchaBadge.style.right = '-270px'

   }catch(e){}
}
export function showReCaptchaBox() {
   try{
      const grecaptchaBadge:HTMLDivElement| null  = document.querySelector(".grecaptcha-badge");
      if(!grecaptchaBadge) return;
      grecaptchaBadge.style.right = '-186px'

   }catch(e){}
}