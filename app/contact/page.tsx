import ContactForm from "@/components/contact-form"
import {DebugEnv} from "@/components/debug-env"

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-primary">Contact Us</h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
          Have questions or need assistance? Fill out the form below and our team will get back to you as soon as
          possible.
        </p>
        <ContactForm/>
        <DebugEnv />
      </div>
    </div>
  )
}
