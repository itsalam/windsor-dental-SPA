export const toggleModal = (modal?: HTMLDialogElement) => (e) => {
  e.preventDefault();
  if (!modal) modal = document.getElementById("modal") as HTMLDialogElement;
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal);
};

const isModalOpen = (modal) => {
  return modal.hasAttribute("open") && modal.getAttribute("open") != "false"
    ? true
    : false;
};

const openModal = (modal) => {
  modal.setAttribute("open", true);
};

// Close modal
const closeModal = (modal) => {
  modal.removeAttribute("open");
};

export const addEscKey = (modal) =>
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal != null) {
      closeModal(modal);
    }
  });
