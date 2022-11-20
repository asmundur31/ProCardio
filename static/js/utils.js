/**
 * This modules has utils functions that are used all over the system.
 */

export function showToast(title, message, status) {
  var toastElement = document.getElementById('liveToast');
  var toastTitle = document.getElementById('toast_title');
  var toastMessage = document.getElementById('toast_message');
  var toastStatus = document.getElementById('toast_status');
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  if(status == 'success') {
    toastStatus.classList.add('fa-circle-check', 'text-success');
    toastStatus.classList.remove('fa-circle-xmark', 'text-danger');
    toastTitle.classList.add('text-success');
    toastTitle.classList.remove('text-danger');
  } else {
    toastStatus.classList.remove('fa-circle-check', 'text-success');
    toastStatus.classList.add('fa-circle-xmark', 'text-danger');
    toastTitle.classList.add('text-danger');
    toastTitle.classList.remove('text-success');
  }
  var toast = new bootstrap.Toast(toastElement);
  toast.show();
}
