export const toggleModal = (modal?: HTMLDialogElement) => (e: MouseEvent) => {
  e.preventDefault();
  if (!modal) modal = document.getElementById("modal") as HTMLDialogElement;
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal);
};

const isModalOpen = (modal: HTMLDialogElement) => {
  return modal.hasAttribute("open") && modal.getAttribute("open") != "false"
    ? true
    : false;
};

const openModal = (modal: HTMLDialogElement) => {
  modal.setAttribute("open", "true");
};

// Close modal
const closeModal = (modal: HTMLDialogElement) => {
  modal.removeAttribute("open");
};

export const addEscKey = (modal: HTMLDialogElement) =>
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal != null) {
      closeModal(modal);
    }
  });
