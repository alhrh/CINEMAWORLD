function openModal(id) {
    const modal = document.getElementById("modal-" + id);
    if (modal) {
      modal.style.display = "block";
    }
  }
  
  function closeModal() {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
      modal.style.display = "none";
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
  
        fetch("http://localhost:3000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
          })
          .then(result => {
            alert("تم إرسال الرسالة بنجاح!");
            contactForm.reset();
          })
          .catch(error => {
            console.error("Error:", error);
            alert("حدث خطأ أثناء إرسال الرسالة.");
          });
      });
    }
  });