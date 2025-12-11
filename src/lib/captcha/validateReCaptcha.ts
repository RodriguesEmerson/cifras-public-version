
type CaptchaResponse = {
   success: boolean,
   challenge_ts?: string,   // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
   score?: string;          // the user robot level
   hostname?: string,       // the hostname of the site where the reCAPTCHA was solved
   "error-codes"?: string[] 
}


export async function validateCaptcha(token: string) {
   const url = new URL('https://www.google.com/recaptcha/api/siteverify');
   url.searchParams.append('secret', `${process.env.RECAPTCHA_KEY}`);
   url.searchParams.append('response', token);

   try {
      const res = await fetch(`${url}`, { method: 'POST' });
      const response: CaptchaResponse = await res.json();

      if (response.success && Number(response.score) >= 0.6) {
         return true;
      }
      return false;

   } catch (e) {
      return false;
   }
}