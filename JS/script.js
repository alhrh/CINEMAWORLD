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
 