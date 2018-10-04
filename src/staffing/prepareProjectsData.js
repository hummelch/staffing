export const prepareProjectsData = (stateProjects) => {
  const result = {
    staffed: [],
    open: [],
    closed: []
  };

  stateProjects.forEach(stateProject => {
    const project = { ...stateProject };

    if (project.closed) {
      result.closed.push(project);
    } else {
      const staffedDays = project.staffings.reduce((acc, val) => acc + val.days, 0);

      if (staffedDays >= project.estimationDays) {
        result.staffed.push(project)
      } else {
        result.open.push(project)
      }
    }
  });

  return result;
};
