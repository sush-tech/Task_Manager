const action = document.querySelector('.del-task');

const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/tasks/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/tasks');
      } else {
        alert('Failed to delete task');
      }
    }
  };

action.addEventListener("click", delButtonHandler);
