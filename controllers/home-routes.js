const router = require("express").Router();
const { Tasks, User } = require("../models");
const withAuth = require("../utils/auth");
const taskRoutes = require("./api/task-routes"); // Import task routes

// Home route
router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('homepage');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});




// router.get('/dashboard', (req, res) => {

//   res.render('dashboard');
// });


router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('signup');
});



// Task dashboard route
// router.get("/dashboard", withAuth, async (req, res) => {
//   try {
//     // Retrieve tasks associated with the logged-in user
//     const dbTaskData = await Tasks.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "title", "description", "starting_time", "ending_time"],
//     });

//     // Serialize data before passing to the template
//     const tasks = dbTaskData.map((task) => task.get({ plain: true }));
// console.log({tasks});
//     // Render the dashboard template with tasks data
//     res.render("dashboard", { tasks, loggedIn: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post('/tasks', withAuth, async (req, res) => {
  console.log("router.post tasks");
    try {
      const newTask = await Tasks.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newTask);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get("/tasks",withAuth, async (req, res) => {
  let dbTaskData = [];
  console.log({userid: req.session.user_id});
  try {
    // Retrieve tasks associated with the logged-in user
     dbTaskData = await Tasks.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "description", "starting_time", "ending_time"],
    });
console.log({dbTaskData});
    // Serialize data before passing to the template
    const tasks = dbTaskData.map((task) => task.get({ plain: true }));
console.log({tasks});
    // Render the dashboard template with tasks data
    res.render("tasks", { tasks, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const taskData = await Tasks.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const task = taskData.get({ plain: true });
console.table(task);
    res.render('task', {
      task,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Tasks }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use task routes under /dashboard
// router.use("/dashboard", taskRoutes);

module.exports = router;
