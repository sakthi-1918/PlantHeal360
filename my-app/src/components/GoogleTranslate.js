import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ta", // English and Tamil only
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // **Hides the extra "From" dropdown**
      const style = document.createElement("style");
      style.innerHTML =
        ".goog-te-combo { display: block !important; }" + // Show dropdown
        ".goog-te-banner-frame, .goog-te-gadget-simple img, #google_translate_element select:first-child { display: none !important; }"; // Hide extras
      document.head.appendChild(style);
    };
  }, []);

  return (
    <div id="google_translate_element" style={{ margin: "10px 0" }}></div>
  );
};

export default GoogleTranslate;
