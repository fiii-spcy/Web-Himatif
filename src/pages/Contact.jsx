import { Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import MagneticButton from "../components/MagneticButton";
import SectionHeader from "../components/SectionHeader";
import emailjs from "@emailjs/browser";

const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/apakatabullshit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/himatif-amikbandung",
    color: "hover:bg-blue-600",
  },
  {
    name: "Youtube",
    icon: Youtube,
    url: "https://www.youtube.com/@himatifstmikamikbandung5156",
    color: "hover:bg-red-600",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:himatif.solver@gmail.com",
    email: "himatif.solver@gmail.com",
    color: "hover:bg-brand-darkRed",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "himatif@amikbandung.ac.id",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (social) => {
    if (social.name === "Email") {
      // Copy email to clipboard
      navigator.clipboard.writeText(social.email);
      // Open mailto link
      window.open(social.url, "_blank");
    } else {
      window.open(social.url, "_blank");
    }
  };

  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Let's collaborate with HIMATIF"
          subtitle="Reach us for partnerships, events, and strategic collaboration."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-7"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-brand-darkRed"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-brand-darkRed"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-brand-darkRed resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <div className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                <p className="text-green-200 text-sm">
                  Message sent successfully!
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                <p className="text-red-200 text-sm">
                  Failed to send message. Please try again.
                </p>
              </div>
            )}

            <MagneticButton
              type="submit"
              className="mt-5 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </MagneticButton>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-7">
              <h3 className="mb-4 text-2xl font-bold">Social Media</h3>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.button
                      key={social.name}
                      onClick={() => handleSocialClick(social)}
                      className={`rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 ${social.color} hover:scale-105 hover:shadow-lg hover:shadow-brand-darkRed/25 group`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon
                        className="mb-2 mx-auto group-hover:scale-110 transition-transform"
                        size={20}
                      />
                      <p className="text-sm">{social.name}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <div className="glass h-64 rounded-2xl border-dashed border-white/20 p-7">
              <p className="text-sm text-brand-gray">
                Embedded map placeholder
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
