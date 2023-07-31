export function checkRole() {
  const role = localStorage.getItem('role');
  console.log(role);
  if (role !== 'admin') {
    return;
  }
}


