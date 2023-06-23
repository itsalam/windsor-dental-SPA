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

function preventScroll(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function clickListener(e: MouseEvent) {
  const clickedElem = e.target as HTMLElement;
  if (clickedElem.id === "modal" && e.target instanceof HTMLDialogElement) {
    closeModal(e.target);
    document.removeEventListener("click", clickListener);
  }
}

const openModal = (modal: HTMLDialogElement) => {
  modal.setAttribute("open", "true");
  console.log("woo");
  document.addEventListener("wheel", preventScroll, { passive: false });
  document.addEventListener("click", clickListener);
};

// Close modal
const closeModal = (modal: HTMLDialogElement) => {
  modal.removeAttribute("open");
  console.log("not woo");
  document.removeEventListener("wheel", preventScroll);
};

export const addEscKey = (modal: HTMLDialogElement) =>
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal != null) {
      closeModal(modal);
    }
  });
