import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // এখানে API call বা backend logic দেওয়া যায়
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Thank you for contacting us!",
        timer: 2500,
        showConfirmButton: false,
      });
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#E9EEFF] via-[#DDE6FF] to-[#CCDFFF] flex items-center py-20">
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-start gap-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-slate-800 mb-6">
          Have questions or need support? Fill out the form below and we'll get
          back to you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col gap-6"
        >
          <fieldset>
            <label className="block mb-2 font-semibold text-slate-800">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="input input-bordered w-fullborder border-gray-300 w-full bg-[#DBE5FF] placeholder:text-black text-black
                         focus:outline-none focus:ring-0"
              required
            />
          </fieldset>

          <fieldset>
            <label className="block mb-2 font-semibold text-slate-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="input input-bordered border border-gray-300 w-full bg-[#DBE5FF] placeholder:text-black text-black
                         focus:outline-none focus:ring-0"
              required
            />
          </fieldset>

          <fieldset>
            <label className="block mb-2 font-semibold text-slate-800">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32 bg-[#DBE5FF] text-black   rounded-lg border border-gray-300 placeholder:text-black
                         focus:outline-none focus:ring-0"
              required
            ></textarea>
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full px-6 py-3 rounded-lg font-semibold border-blue-700 text-blue-700 hover:bg-[#CCE1FF] transition-transform border border-blue-700 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
