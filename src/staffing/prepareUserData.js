export const calculateWorkloadForUser = (user, projects, userCustomDays) => {
  const updatedUser = {
    ...user,
    calculated_weeks: {}
  };

  // count up all default week days for all 52 weeks per year
  for (let week = 1; week <= 52; week++) {
    updatedUser.calculated_weeks[week] = {
      days_left: user.days_per_week,
      is_not_available: user.days_per_week === 0
    };
  }

  // check custom days
  userCustomDays.forEach(custom => {
    if(custom.user_id === user.id) {
      updatedUser.calculated_weeks[custom.week].days_left = custom.days;
      updatedUser.calculated_weeks[custom.week].is_not_available = custom.days === 0;
    }
  });

  // subtract all staffed projects
  for (const project of projects) {
    if (!project.closed) {
      subtractStaffedWorkingDays(updatedUser, project);
    }
  }

  return updatedUser;
};

const subtractStaffedWorkingDays = (user, project) => {
  for (let staffing of project.staffings) {
    if (user.id === staffing.user_id) {
      user.calculated_weeks[staffing.week].days_left -= staffing.days;
    }
  }
};

