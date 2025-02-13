import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ta", // English and Tamil only
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // **Hides the extra "From" dropdown and other elements**
        const style = document.createElement("style");
        style.innerHTML = `
          .goog-te-gadget select { display: block !important; }
          .goog-te-banner-frame, 
          .goog-te-gadget-simple img, 
          #google_translate_element select:first-child { display: none !important; }
        `;
        document.head.appendChild(style);
      }
    };

    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="google_translate_element" style={{ margin: "10px 0" }}></div>;
};

export default GoogleTranslate;
