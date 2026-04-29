import {
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
} from "lucide-react";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { socialMedias } from "@/constants/myInfo";

const fallbackProfile = {
  email: "mdmehedihasanmehad@gmail.com",
  address: "Dhaka, Bangladesh",
  number: "+880 1XXXXXXXXX",
};

const ContactPage = async () => {
  const myInfo = await getMyInfo();

  if (!myInfo) return null;

  const email = myInfo.email;
  const location = myInfo.address;
  const phone = myInfo.number;

  const contactItems = [
    {
      title: "Email",
      value: email,
      detail: "I usually reply within 24 hours",
      icon: MailIcon,
      href: `mailto:${email}`,
    },
    {
      title: "Location",
      value: location,
      detail: "Available for remote work worldwide",
      icon: MapPinIcon,
    },
    {
      title: "Phone",
      value: phone,
      detail: "Mon - Fri, 10 AM - 8 PM (GMT+6)",
      icon: PhoneIcon,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      title: "Website",
      value: "www.facebook.com",
      detail: "Check out my work and projects",
      icon: GlobeIcon,
      href: "https://www.facebook.com",
    },
  ];

  return (
    <main id="contact" className="overflow-hidden">
      <section className="relative py-14 sm:py-20">
        <div className="pointer-events-none absolute right-0 top-12 hidden h-72 w-72 rounded-full bg-primary/20 blur-3xl lg:block" />

        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex rounded-lg border border-primary/30 bg-primary/20 px-4 py-2 text-sm font-bold text-foreground shadow-[0_0_18px_rgba(139,92,246,0.25)]">
                Get In Touch
              </span>

              <h1 className="mt-8 max-w-2xl text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Let&apos;s Build Something Amazing{" "}
                <span className="text-primary">Together</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                I&apos;m always open to discussing new opportunities,
                interesting projects, or just having a friendly chat about tech.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                {socialMedias.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.platformName}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platformName}
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background/70 text-foreground transition hover:border-primary hover:text-primary hover:shadow-[0_0_18px_rgba(139,92,246,0.22)]"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* IMAGE */}
            {/* <div className="relative hidden min-h-64 lg:col-span-5 lg:block">
              <div className="absolute left-8 top-36 h-20 w-40 rounded-[50%] border-t border-dashed border-muted-foreground/50" />
              <div className="absolute left-36 top-24 h-20 w-20 rounded-full border border-dashed border-muted-foreground/50" />
              <div className="absolute right-6 top-6 rotate-12 text-primary drop-shadow-[0_0_35px_rgba(139,92,246,0.55)]">
                <SendIcon className="h-36 w-36 fill-primary/70 stroke-primary" />
              </div>
            </div> */}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <section className="rounded-xl border border-border bg-card/40 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8 lg:col-span-7">
              <h2 className="text-2xl font-bold text-primary">
                Send Me a Message
              </h2>
              <div className="mt-4 h-px w-8 bg-primary" />
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Have a project in mind or want to say hello? Fill out the form
                below and I&apos;ll get back to you as soon as possible.
              </p>

              <form className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-md border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-md border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="h-12 w-full rounded-md border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    placeholder="Write your message here..."
                    className="w-full resize-y rounded-md border border-border bg-background/60 px-4 py-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.25)] transition hover:bg-primary/90"
                >
                  <SendIcon className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </section>

            <aside className="space-y-6 lg:col-span-5">
              <section className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur sm:p-8">
                <h2 className="text-2xl font-bold text-primary">
                  Contact Information
                </h2>
                <div className="mt-4 h-px w-8 bg-primary" />
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  Feel free to reach out to me through any of the following
                  channels.
                </p>

                <div className="mt-8 space-y-7">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <>
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-bold text-foreground">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm text-muted-foreground">
                            {item.value}
                          </span>
                          <span className="mt-1 block text-sm text-muted-foreground">
                            {item.detail}
                          </span>
                        </span>
                      </>
                    );

                    return item.href ? (
                      <a
                        key={item.title}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-start gap-4"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.title} className="flex items-start gap-4">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur sm:p-8">
                <h2 className="text-2xl font-bold text-primary">
                  Availability
                </h2>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                  Available for new opportunities
                </div>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                  I&apos;m currently open to freelance projects, full-time
                  roles, and exciting collaborations.
                </p>
              </section>
            </aside>
          </div>

          {/* <section className="mt-6 rounded-xl border border-border bg-card/40 p-6 backdrop-blur sm:p-8">
            <h2 className="text-2xl font-bold text-primary">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 h-px w-8 bg-primary" />

            <div className="mt-7 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq}
                  className="group rounded-lg border border-border bg-background/45 px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground">
                    {faq}
                    <span className="text-primary transition group-open:rotate-180">
                      v
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    I keep communication clear and practical, and I usually
                    respond with next steps within one business day.
                  </p>
                </details>
              ))}
            </div>
          </section> */}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
