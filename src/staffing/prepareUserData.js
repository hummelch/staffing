export const calculateWorkloadForUser = (stateUser, stateProjects) => {
  const user = Object.assign({}, stateUser, { calculated_weeks: {} });

  // count up all default week days for all 52 weeks per year
  for (let week = 1; week <= 52; week++) {

    let isNotAvailable = stateUser.days_per_week === 0;
    const weekHasSpecialValue = stateUser.diff_days.hasOwnProperty(week);
    const daysLeft = weekHasSpecialValue ? stateUser.diff_days[week] : stateUser.days_per_week;

    if (weekHasSpecialValue && stateUser.diff_days[week] === 0) {
      isNotAvailable = true;
    }

    user.calculated_weeks[week] = {
      days_left: daysLeft,
      is_not_available: isNotAvailable
    };
  }

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
  };
};

