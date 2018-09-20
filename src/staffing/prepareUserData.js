export const calculateWorkloadForUser = (stateUser, stateProjects, stateUserCustomDays) => {
  const user = Object.assign({}, stateUser, { calculated_weeks: {} });

  // count up all default week days for all 52 weeks per year
  for (let week = 1; week <= 52; week++) {
    user.calculated_weeks[week] = {
      days_left: stateUser.days_per_week,
      is_not_available: stateUser.days_per_week === 0
    };
  }

  // check custom days
  stateUserCustomDays.forEach(custom => {
    if(custom.user_id === stateUser.id) {
      user.calculated_weeks[custom.week].days_left = custom.days;
      user.calculated_weeks[custom.week].is_not_available = custom.days === 0;
    }
  });

  // subtract all staffed projects
  for (let project of stateProjects) {
    if (!project.closed) {
      subtractStaffedWorkingDays(user, project);
    }
  }

  return user;
};

const subtractStaffedWorkingDays = (user, project) => {
  for (let staffing of project.staffings) {
    if (user.id === staffing.user_id) {
      user.calculated_weeks[staffing.week].days_left -= staffing.days;
    }
  }
};

