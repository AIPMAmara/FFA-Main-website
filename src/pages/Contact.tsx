import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="eyebrow text-gold-ink">
        Get in Touch
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Let&rsquo;s talk.</h1>
      <p className="mt-6 text-purple-top/80">
        Whether you&rsquo;re exploring a partnership, inviting us to speak, or have a question about
        the community, send us a message and our team will get back to you.
      </p>
      <ContactForm />
    </div>
  )
}
