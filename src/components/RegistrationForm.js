import React, { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { saveRegistration } from "../firebase";

function RoleChooser({ value, onChange }) {
  return (
    <fieldset className="w-full">
      <legend className="text-slate-300 font-semibold mb-3 block">
        Select Your Role *
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-amber-400 focus-within:border-amber-400 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="Participant"
            checked={value === "Participant"}
            onChange={(e) => onChange(e.target.value)}
            required
            className="h-4 w-4 accent-amber-500"
          />
          <span>Participant</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-amber-400 focus-within:border-amber-400 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="Exhibitor"
            checked={value === "Exhibitor"}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 accent-amber-500"
          />
          <span>Exhibitor</span>
        </label>
      </div>
    </fieldset>
  );
}

function PhotoUpload({ photoUrl, onPick, onRemove }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    onPick(file, inputRef);
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="block text-sm mb-2 text-slate-300">Upload Photo for Badge</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleChange}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-amber-500 file:text-slate-900 hover:file:bg-amber-600 cursor-pointer"
          aria-describedby="photo-hint"
        />
      </label>
      <p id="photo-hint" className="text-xs text-slate-400">
        Accepted types png jpg webp gif up to 5 MB
      </p>

      {photoUrl && (
        <div className="flex items-center gap-4">
          <img
            src={photoUrl}
            alt="Preview"
            className="w-20 h-20 rounded-lg object-cover border border-slate-600"
          />
          <button
            type="button"
            onClick={() => onRemove(inputRef)}
            className="text-sm px-3 py-2 rounded-lg border border-slate-600 hover:bg-slate-700"
          >
            Remove photo
          </button>
        </div>
      )}
    </div>
  );
}

export default function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    industry: "",
    message: "",
    role: "",
    photoUrl: "",
  });

  // load draft from storage
  useEffect(() => {
    const saved = localStorage.getItem("gtif_form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  // save draft to storage
  useEffect(() => {
    const { fullName, email, company, industry, message, role } = formData;
    localStorage.setItem(
      "gtif_form",
      JSON.stringify({ fullName, email, company, industry, message, role })
    );
  }, [formData.fullName, formData.email, formData.company, formData.industry, formData.message, formData.role]);

  const setRole = (val) => setFormData((p) => ({ ...p, role: val }));

  const pickPhoto = (file, inputRef) => {
    if (!file) return;

    const okType = /^image\/(jpeg|png|webp|gif)$/i.test(file.type);
    const okSize = file.size <= 5 * 1024 * 1024;

    if (!okType) {
      setToast("Please upload an image file");
      setTimeout(() => setToast(""), 2200);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (!okSize) {
      setToast("Image is larger than 5 MB");
      setTimeout(() => setToast(""), 2200);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    if (formData.photoUrl) URL.revokeObjectURL(formData.photoUrl);
    setPhotoFile(file);
    setFormData((prev) => ({ ...prev, photoUrl: url }));
  };

  const removePhoto = (inputRef) => {
    if (formData.photoUrl) URL.revokeObjectURL(formData.photoUrl);
    setPhotoFile(null);
    setFormData((p) => ({ ...p, photoUrl: "" }));
    if (inputRef.current) inputRef.current.value = "";
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Enter a valid email";
    if (!formData.industry) return "Please select your industry";
    if (!formData.role) return "Please choose a role";
    return "";
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const err = validate();
    if (err) {
      setToast(err);
      setTimeout(() => setToast(""), 2500);
      return;
    }

    try {
      setSubmitting(true);

      await saveRegistration(
        {
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          industry: formData.industry,
          message: formData.message,
          role: formData.role,
        },
        photoFile
      );

      setToast("Thank you for registering. We will contact you soon.");
      setTimeout(() => setToast(""), 2500);

      if (formData.photoUrl) URL.revokeObjectURL(formData.photoUrl);
      setPhotoFile(null);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        industry: "",
        message: "",
        role: "",
        photoUrl: "",
      });
      localStorage.removeItem("gtif_form");
    } catch (error) {
      console.error("saveRegistration error:", error);
      setToast("Something went wrong. Please try again.");
      setTimeout(() => setToast(""), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-slate-800/80 to-teal-900/80 p-8 md:p-12 rounded-2xl border border-teal-500/30 backdrop-blur-sm"
        noValidate
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <label className="w-full">
              <span className="sr-only">Full Name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Full Name *"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
                required
              />
            </label>
            <label className="w-full">
              <span className="sr-only">Email Address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="Email Address *"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
                required
              />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="w-full">
              <span className="sr-only">Company</span>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                placeholder="Company"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
              />
            </label>
            <label className="w-full">
              <span className="sr-only">Industry</span>
              <select
                name="industry"
                value={formData.industry}
                onChange={(e) => setFormData((p) => ({ ...p, industry: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white"
                required
              >
                <option value="">Select Industry *</option>
                <option>Mining & Resources</option>
                <option>Real Estate</option>
                <option>Agriculture</option>
                <option>Manufacturing</option>
                <option>Tourism</option>
                <option>Banking and Finance</option>
                <option>Telecommunications</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <RoleChooser value={formData.role} onChange={setRole} />

          <PhotoUpload
            photoUrl={formData.photoUrl}
            onPick={pickPhoto}
            onRemove={removePhoto}
          />

          <label className="w-full">
            <span className="sr-only">Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              placeholder="Message or Special Requirements"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 disabled:opacity-60 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold py-4 rounded-lg transition transform hover:scale-105"
          >
            {submitting ? "Submitting…" : "Complete Registration"}
          </button>

          <p className="text-xs text-slate-400 text-center">
            By registering, you agree to be contacted about GTIF 2025 updates.
          </p>
        </div>
      </form>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/95 border border-amber-400/50 text-white px-4 py-3 rounded-lg shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}
