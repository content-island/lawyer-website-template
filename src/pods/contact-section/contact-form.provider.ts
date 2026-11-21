import type { ContactFormData } from './contact-form.schema';

/**
 * Sends the validated (and trimmed) form to your email provider.
 * Left unimplemented on purpose: plug in your provider here (see the "Contact form" section of the README).
 *
 * Return `true` once the provider confirms the submission: the success message is shown and the form is cleared.
 * While it returns `false`, the form shows the "set up your email provider" message.
 * If it throws, the form shows the error message and keeps what the visitor typed.
 */
export const sendContactForm = async (_data: ContactFormData): Promise<boolean> => {
  console.log(`
🚧 Contact form not implemented yet!

This feature is intentionally left unimplemented so you can plug in
your favorite email provider 💌✨

👉 Want a quick example?
Check out this post to learn how to integrate Resend step by step 📬⚡
https://contentisland.net/en/blog/astro-contact-form-server-actions-resend/

Happy coding! 😄
`);
  return false;
};
