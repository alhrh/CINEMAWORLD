const form = document.getElementById("bookingForm");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    movie: form.movie.value,
    tickets: form.tickets.value,
    date: form.date.value,
    email: form.email.value
  };

  try {
    const res = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    responseMessage.textContent = result.message;
    responseMessage.style.color = "green";
    form.reset();
  } catch (err) {
    console.error("Error:", err);
    responseMessage.textContent = "Booking failed!";
    responseMessage.style.color = "red";
  }
});