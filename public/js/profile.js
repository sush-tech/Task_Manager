const newFormHandler = async (event) => {
  console.log("new form handler");
  event.preventDefault();

  const title = document.querySelector('#task-name').value.trim();
  const description = document.querySelector('#task-desc').value.trim();
  const starting_time = document.querySelector('#starting_time').value.trim();
  const ending_time = document.querySelector('#ending_time').value.trim();
console.log({title, description,starting_time,ending_time});
  if (title && description && starting_time && ending_time) {
    const response = await fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ title, description, starting_time, ending_time }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/tasks');
    } else {
      alert('Failed to create task');
    }
  }
};

document
  .querySelector('.new-Task-form')
  .addEventListener('submit', newFormHandler); //To Do - fix this event listener

